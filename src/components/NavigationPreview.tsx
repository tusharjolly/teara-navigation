import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, Navigation, Clock, Loader2, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Language, Theme, RoutePreference, MapNode } from "../App";
import type { PathfindingResponse, PathfindingNode } from "../api/client";
import { SvgRouteMap } from "./SvgRouteMap";
import { splitRouteIntoSegments } from "../path/routeSegments";

interface NavigationPreviewProps {
  language: Language;
  theme: Theme;
  campusId: string;
  startPoint: MapNode | null;
  destination: MapNode | null;
  routePreference: RoutePreference;
  path: PathfindingResponse | null;
  isLoading: boolean;
  error: string | null;
  onBack: () => void;
  onStart: () => void;
}

export default function NavigationPreview({
  language,
  theme,
  campusId,
  startPoint,
  destination,
  routePreference,
  path,
  isLoading,
  error,
  onBack,
  onStart,
}: NavigationPreviewProps) {
  // Split route into segments based on map changes
  const routeSegments = useMemo(() => splitRouteIntoSegments(path, campusId), [path, campusId]);
  
  // Determine initial segment - prefer showing the segment with the destination if it's indoor
  const initialSegmentIndex = useMemo(() => {
    if (routeSegments.length === 0) return 0;
    // Find segment containing destination
    if (destination && path?.nodes) {
      const destNode = path.nodes[path.nodes.length - 1];
      const destSegmentIndex = routeSegments.findIndex(seg => 
        seg.nodes.some(n => n.id === destNode.id)
      );
      if (destSegmentIndex >= 0) return destSegmentIndex;
    }
    // Default to last segment (usually contains destination)
    return routeSegments.length - 1;
  }, [routeSegments, destination, path]);
  
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(initialSegmentIndex);
  const currentSegment = routeSegments[currentSegmentIndex] || routeSegments[0];
  
  // Update segment index when segments change
  useEffect(() => {
    if (routeSegments.length > 0 && initialSegmentIndex >= 0) {
      setCurrentSegmentIndex(initialSegmentIndex);
    }
  }, [initialSegmentIndex, routeSegments.length]);
  
  // Calculate actual distance from coordinates
  const calculateDistance = (nodes: PathfindingNode[] | undefined) => {
    if (!nodes || nodes.length < 2) return 0;
    let totalDistance = 0;
    for (let i = 0; i < nodes.length - 1; i++) {
      const node1 = nodes[i];
      const node2 = nodes[i + 1];
      if (node1.x != null && node1.y != null && node2.x != null && node2.y != null) {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        totalDistance += Math.sqrt(dx * dx + dy * dy);
      }
    }
    return totalDistance;
  };

  const formatDistance = (meters: number): string => {
    if (!Number.isFinite(meters) || meters <= 0) return "—";
    return meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${Math.round(meters)} m`;
  };

  const totalDistance = useMemo(() => calculateDistance(path?.nodes), [path]);
  const distance = formatDistance(totalDistance);
  const walkingSpeed = 1.4; // meters per second (average walking speed)
  const durationMinutes = Math.ceil(totalDistance / walkingSpeed / 60);
  const duration = durationMinutes > 0 ? `${durationMinutes} min` : "—";
  
  const nodeCount = path?.nodes?.length ?? 0;
  const canStart = !!path && nodeCount > 1 && !isLoading;

  // Filter nodes to only show important waypoints (not every junction)
  const importantNodes = useMemo(() => {
    if (!path?.nodes) return [];
    return path.nodes.filter((node, idx) => {
      // Always include first and last
      if (idx === 0 || idx === path.nodes.length - 1) return true;
      // Include nodes with meaningful names (not just "Junction X")
      if (node.name && !node.name.toLowerCase().startsWith('junction')) return true;
      // Include nodes with special func_types
      if (node.func_type && ['entrance', 'building_entrance', 'door', 'gate'].includes(node.func_type)) return true;
      // Include scene changes
      const edge = path.edges?.find(e => e.from_node_id === path.nodes[idx - 1]?.id && e.to_node_id === node.id);
      if (edge?.is_scene_change) return true;
      return false;
    });
  }, [path]);

  const turnByTurn = useMemo(
    () =>
      importantNodes.map((node, idx) => {
        const isStart = idx === 0;
        const isEnd = idx === importantNodes.length - 1;
        const isSceneChange = path?.edges?.some(
          e => e.to_node_id === node.id && e.is_scene_change
        );
        
        let label = '';
        if (isStart) {
          label = language === "en" ? `Start at ${node.name ?? node.id}` : `从 ${node.name ?? node.id} 出发`;
        } else if (isSceneChange) {
          label = language === "en" 
            ? `Enter ${node.name ?? node.id}` 
            : `进入 ${node.name ?? node.id}`;
        } else if (isEnd) {
          label = language === "en" 
            ? `Arrive at ${node.name ?? node.id}` 
            : `到达 ${node.name ?? node.id}`;
        } else {
          label = language === "en" 
            ? `Continue to ${node.name ?? node.id}` 
            : `继续前往 ${node.name ?? node.id}`;
        }

        return {
          id: node.id ?? `step-${idx}`,
          label,
          meta: [node.func_type, node.space_type].filter(Boolean).join(" · "),
        };
      }),
    [language, importantNodes, path]
  );

  // Create path for current segment only
  const segmentPath = useMemo((): PathfindingResponse | null => {
    if (!currentSegment || !path) return path;
    return {
      nodes: currentSegment.nodes,
      edges: currentSegment.edges,
    };
  }, [currentSegment, path]);

  return (
    <div className="relative w-full h-screen bg-white dark:bg-gray-900">
      {/* Status Bar */}
      <div className="bg-[#353535] dark:bg-gray-950 h-[44px]" />

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative z-10">
          <ArrowLeft className="size-6 text-black dark:text-white" />
        </button>
        <h1 className="text-black dark:text-white">{language === "en" ? "Route Preview" : "路线预览"}</h1>
        <div className="w-10" />
      </div>

      {/* Map with Route (ECharts over SVG) */}
      <div className="relative h-[calc(100%-44px)] w-full">
        {currentSegment ? (
          <>
            <SvgRouteMap 
              campusId={campusId} 
              levelType={currentSegment.levelType} 
              levelId={currentSegment.levelId} 
              path={segmentPath} 
              theme={theme} 
            />
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute top-20 left-4 z-30 bg-black/70 text-white text-xs p-2 rounded">
                <div>Segment: {currentSegmentIndex + 1}/{routeSegments.length}</div>
                <div>Type: {currentSegment.levelType}</div>
                <div>ID: {currentSegment.levelId}</div>
                <div>Nodes: {currentSegment.nodes.length}</div>
              </div>
            )}
          </>
        ) : (
          <SvgRouteMap campusId={campusId} levelType="campus" levelId={campusId} path={path} theme={theme} />
        )}
        
        {/* Segment switcher (if multiple segments) */}
        {routeSegments.length > 1 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur rounded-full px-3 py-2 shadow-lg">
            <button
              onClick={() => setCurrentSegmentIndex(Math.max(0, currentSegmentIndex - 1))}
              disabled={currentSegmentIndex === 0}
              className="p-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <ChevronLeft className="size-4 text-black dark:text-white" />
            </button>
            <span className="text-xs text-black dark:text-white font-medium px-2">
              {currentSegmentIndex + 1} / {routeSegments.length} ({currentSegment?.levelType === 'floor' ? 'Indoor' : 'Outdoor'})
            </span>
            <button
              onClick={() => setCurrentSegmentIndex(Math.min(routeSegments.length - 1, currentSegmentIndex + 1))}
              disabled={currentSegmentIndex === routeSegments.length - 1}
              className="p-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <ChevronRight className="size-4 text-black dark:text-white" />
            </button>
          </div>
        )}

        {/* Route Info Card */}
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl p-6 space-y-6">
          {/* Drag Handle */}
          <div className="flex justify-center">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-semibold text-black dark:text-white">
                {duration} <span className="text-lg text-gray-500 dark:text-gray-400">({distance})</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {language === "en" ? "Preview walking directions" : "步行路线预览"}
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-xl px-3 py-2 text-xs leading-snug flex gap-2 items-start">
              <span>⚠️</span>
              <span>
                {language === "en"
                  ? "Use caution—directions may not always reflect real-world conditions."
                  : "请注意：导航指引可能与实际情况有差异。"}
              </span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="text-black dark:text-white font-semibold">
                {startPoint ? startPoint.name : language === "en" ? "My Location" : "我的位置"}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                {destination ? destination.name : language === "en" ? "Destination" : "目的地"}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {language === "en" ? "ETA" : "预计时间"}
              </p>
              <p className="text-sm font-semibold text-black dark:text-white">{duration}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {language === "en" ? "Distance" : "距离"}
              </p>
              <p className="text-sm font-semibold text-black dark:text-white">{distance}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {language === "en" ? "Waypoints" : "途经点"}
              </p>
              <p className="text-sm font-semibold text-black dark:text-white">{importantNodes.length || "—"}</p>
            </div>
          </div>

          {/* Important waypoints list (simplified) */}
          {importantNodes.length > 0 && (
            <div className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden max-h-[200px] overflow-y-auto">
              {importantNodes.map((node, index) => {
                const isSceneChange = path?.edges?.some(
                  e => e.to_node_id === node.id && e.is_scene_change
                );
                return (
                  <div key={node.id} className="flex items-start gap-3 bg-white dark:bg-gray-800 px-4 py-3">
                    <div className={`w-7 h-7 mt-[2px] rounded-full flex items-center justify-center text-sm font-semibold ${
                      index === 0 
                        ? 'bg-blue-500 text-white' 
                        : index === importantNodes.length - 1
                        ? 'bg-red-500 text-white'
                        : isSceneChange
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
                    }`}>
                      {index === 0 ? 'S' : index === importantNodes.length - 1 ? 'E' : index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black dark:text-white font-medium">{node.name ?? node.id}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {node.func_type || node.space_type || 'waypoint'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Turn-by-turn list */}
          {turnByTurn.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="text-sm font-semibold text-black dark:text-white">
                {language === "en" ? "Turn-by-turn" : "逐步路线"}
              </h3>
              <div className="space-y-2">
                {turnByTurn.map((step, idx) => (
                  <div
                    key={step.id}
                    className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/60 rounded-xl px-3 py-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center justify-center text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-black dark:text-white font-medium">{step.label}</p>
                      {step.meta && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {step.meta}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 mt-2">
              <Loader2 className="size-4 animate-spin" />
              <span>{language === "en" ? "Loading route..." : "正在加载路线..."}</span>
            </div>
          )}

          {!isLoading && !path && !error && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {language === "en"
                ? "Choose nodes and confirm to preview the route."
                : "选择起点和终点后确认以查看路线。"}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/30 rounded-xl px-3 py-2">
              <AlertTriangle className="size-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {(routePreference.avoidStairs ||
            routePreference.indoorNavigation ||
            routePreference.preferAccessible ||
            routePreference.preferWellLit) && (
            <div className="mb-4 flex gap-2 flex-wrap">
              {routePreference.avoidStairs && (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-[#ff5a5a] dark:text-red-400 rounded-full text-sm">
                  {language === "en" ? "No Stairs" : "无楼梯"}
                </span>
              )}
              {routePreference.preferAccessible && (
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">
                  {language === "en" ? "Accessible" : "无障碍"}
                </span>
              )}
              {routePreference.preferWellLit && (
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                  {language === "en" ? "Well lit" : "光线充足"}
                </span>
              )}
              {routePreference.indoorNavigation && (
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-[#ff5a5a] dark:text-red-400 rounded-full text-sm">
                  {language === "en" ? "Indoor Route" : "室内路线"}
                </span>
              )}
            </div>
          )}

          <button
            onClick={onStart}
            disabled={!canStart}
            className={`w-full flex items-center justify-center gap-2 text-white py-4 rounded-full transition-colors shadow-lg ${
              canStart ? "bg-[#ff5a5a] hover:bg-[#ff4040]" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? <Loader2 className="size-5 animate-spin" /> : <Navigation className="size-5" />}
            <span className="font-['Inter:Semi_Bold',sans-serif]">
              {language === "en" ? "Start Navigation" : "开始导航"}
            </span>
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-full pointer-events-none">
        <div className="absolute bg-black dark:bg-white bottom-[8px] h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[134px]" />
      </div>
    </div>
  );
}
