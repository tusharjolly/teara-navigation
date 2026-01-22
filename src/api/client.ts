import type { RoutePreference } from "../App";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ApiBuilding {
  building_id: string;
  building_name: string;
  floor_count?: number;
  floor_ids?: string[];
  tags?: string[];
}

export interface ApiFloor {
  floor_id: string;
  floor_name: string;
  level_index?: number;
  node_count?: number;
}

export interface ApiNode {
  id: string;
  name: string;
  building_id?: string;
  building_name?: string;
  floor_id?: string;
  floor_name?: string;
  func_type?: string;
  space_type?: string;
  map_id?: string;
  is_display?: boolean;
  x?: number;
  y?: number;
}

export interface ApiSearchResult {
  type: "building" | "node";
  id: string;
  name: string;
  building_id?: string;
  floor_id?: string;
  func_type?: string;
  tags?: string[];
  relevance?: number;
}

export interface PathfindingRequest {
  campus_id: string;
  from_node_id: string;
  to_node_id: string;
  mode?: number; // 0 = default, 1 = avoid stairs, 2 = accessible, 3 = indoor
}

export interface PathfindingNode {
  id: string;
  name?: string;
  map_id?: string;
  building_id?: string;
  floor_id?: string;
  x?: number;
  y?: number;
  space_type?: string;
  func_type?: string;
  is_display?: boolean;
}

export interface PathfindingEdge {
  from_node_id: string;
  to_node_id: string;
  space_type?: string;
  is_stair?: boolean;
  is_elevator?: boolean;
  is_escalator?: boolean;
  is_bridge?: boolean;
  is_scene_change?: boolean;
}

export interface PathfindingResponse {
  nodes: PathfindingNode[];
  edges: PathfindingEdge[];
}

export type MapLevelType = "campus" | "floor";

export interface MapSvgResponse {
  svg_data: string;
  file_size: number;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ?? "";
const DEFAULT_CAMPUS_ID = (import.meta.env.VITE_DEFAULT_CAMPUS_ID as string | undefined) ?? "";

function ensureConfigured() {
  if (!API_BASE_URL) {
    const error = new Error("Missing VITE_API_BASE_URL. Add it to your .env.");
    console.error('❌ Configuration error:', error);
    throw error;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const body = (await res.json()) as ApiResponse<T>;
  // Allow both legacy (0) and HTTP-style (200) success codes.
  const successCodes = new Set([0, 200]);
  if (typeof body.code === "number" && !successCodes.has(body.code)) {
    throw new Error(body.message || "API returned error");
  }
  return body.data;
}

// Helper function to add timeout to fetch requests
function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 6000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, {
    ...options,
    signal: controller.signal,
  })
    .finally(() => {
      clearTimeout(timeoutId);
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    });
}

async function apiGet<T>(path: string, timeout: number = 10000): Promise<T> {
  ensureConfigured();
  const fullUrl = `${API_BASE_URL}${path}`;
  
  try {
    const res = await fetchWithTimeout(fullUrl, {
      headers: {
        Accept: "application/json",
      },
    }, timeout);
    
    return handleResponse<T>(res);
  } catch (error) {
    if (error instanceof Error && error.message === 'Request timeout') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

// Fetch raw (non-JSON) when needed
async function apiGetText(path: string): Promise<string> {
  ensureConfigured();
  const fullUrl = `${API_BASE_URL}${path}`;
  
  try {
    const res = await fetchWithTimeout(fullUrl, {
      headers: {
        Accept: "text/plain, text/html, application/xml, image/svg+xml, */*",
      },
    }, 15000); // 15 second timeout for SVG files
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
    return res.text();
  } catch (error) {
    if (error instanceof Error && error.message === 'Request timeout') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

async function apiPost<T, P = unknown>(path: string, payload: P): Promise<T> {
  ensureConfigured();
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }, 10000); // 10 second timeout
    return handleResponse<T>(res);
  } catch (error) {
    if (error instanceof Error && error.message === 'Request timeout') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
}

export function getDefaultCampusId() {
  return DEFAULT_CAMPUS_ID;
}

export async function fetchBuildings(campusId: string) {
  return apiGet<{ buildings: ApiBuilding[] }>(`/query/buildings?campus_id=${encodeURIComponent(campusId)}`);
}

export async function fetchFloors(campusId: string, buildingId: string) {
  return apiGet<{ floors: ApiFloor[] }>(
    `/query/floors?campus_id=${encodeURIComponent(campusId)}&building_id=${encodeURIComponent(buildingId)}`
  );
}

export async function searchNodes(campusId: string, keyword: string) {
  return apiGet<{ results: ApiSearchResult[]; next_page_token?: string; total_count?: number }>(
    `/query/search?campus_id=${encodeURIComponent(campusId)}&keyword=${encodeURIComponent(keyword)}&types=node&page_size=20`
  );
}

export async function searchBuildingsAndNodes(campusId: string, keyword: string) {
  // Search for both buildings and nodes - omit types parameter to search all types
  // or explicitly pass both: types=building&types=node
  const params = new URLSearchParams({
    campus_id: campusId,
    keyword: keyword,
    page_size: '20',
  });
  // Add types as repeated parameters (Go-Zero expects this format for arrays)
  params.append('types', 'building');
  params.append('types', 'node');
  
  const url = `/query/search?${params.toString()}`;
  
  // Verify API_BASE_URL is set
  if (!API_BASE_URL) {
    const error = new Error('API_BASE_URL is not configured. Check your .env file.');
    throw error;
  }
  
  try {
    // Use longer timeout for search (15 seconds) to account for Cloudflare Worker proxy latency
    const result = await apiGet<{ results: ApiSearchResult[]; next_page_token?: string; total_count?: number }>(url, 15000);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function fetchNodesForBuilding(campusId: string, buildingId: string) {
  return apiGet<{ nodes: ApiNode[] }>(
    `/query/nodes?campus_id=${encodeURIComponent(campusId)}&building_id=${encodeURIComponent(buildingId)}&only_display=true&page_size=1`
  );
}

export async function fetchPathfinding(
  campusId: string,
  fromNodeId: string,
  toNodeId: string,
  preference: RoutePreference
) {
  // Mode mapping: accessible > avoid stairs > indoor > default
  // Mode 0 = default, 1 = avoid stairs, 2 = accessible, 3 = indoor
  const mode = preference.preferAccessible
    ? 2
    : preference.avoidStairs
    ? 1
    : preference.indoorNavigation
    ? 3
    : 0;
  const payload: PathfindingRequest = {
    campus_id: campusId,
    from_node_id: fromNodeId,
    to_node_id: toNodeId,
    mode,
  };
  return apiPost<PathfindingResponse, PathfindingRequest>("/navigation/pathfinding", payload);
}

export async function fetchMapSvg(campusId: string, levelType: MapLevelType, levelId: string) {
  const svg_data = await apiGetText(
    `/query/map/svg?campus_id=${encodeURIComponent(campusId)}&level_type=${encodeURIComponent(levelType)}&level_id=${encodeURIComponent(levelId)}`
  );
  return { svg_data, file_size: svg_data.length };
}
