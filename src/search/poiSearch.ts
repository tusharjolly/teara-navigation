import type { MapNode } from "../App";

export type PoiEntry = {
  id: string;
  label: string;
  type?: string;
  building?: string;
  nodeId: string;
  keywords?: string[];
  x?: number;
  y?: number;
};

export type PoiIndex = {
  list: PoiEntry[];
};

export async function loadPois(): Promise<PoiIndex> {
  const resp = await fetch("/data/poi.json");
  if (!resp.ok) throw new Error("Failed to load poi.json");
  const list: PoiEntry[] = await resp.json();
  return { list };
}

export function searchPois(index: PoiIndex, keyword: string, limit = 8): MapNode[] {
  const q = keyword.trim().toLowerCase();
  if (!q) return [];
  const results: MapNode[] = [];
  for (const poi of index.list) {
    const haystack = [
      poi.label,
      poi.building,
      ...(poi.keywords ?? []),
    ]
      .filter(Boolean)
      .map((s) => s!.toLowerCase());

    const match = haystack.some((h) => h.includes(q));
    if (!match) continue;

    results.push({
      id: poi.nodeId,
      name: poi.label,
      building_id: poi.building,
      x: poi.x,
      y: poi.y,
    } as MapNode);

    if (results.length >= limit) break;
  }
  return results;
}
