import React, { useEffect, useMemo, useRef, useState } from "react";
import * as echarts from "echarts";
import type { PathfindingResponse } from "../api/client";
import { fetchMapSvg, type MapLevelType } from "../api/client";
import type { Theme } from "../App";

interface SvgRouteMapProps {
  campusId: string;
  levelType: MapLevelType;
  levelId: string;
  path: PathfindingResponse | null;
  theme: Theme;
  userSvg?: { x: number; y: number; accuracy?: number };
  onManualStart?: (pt: { x: number; y: number }) => void;
  destSvg?: { x: number; y: number };
  fullPath?: PathfindingResponse | null; // Optional full path to show in lighter color
  currentPosition?: { x: number; y: number } | null; // Current position marker
}

export function SvgRouteMap({
  campusId,
  levelType,
  levelId,
  path,
  theme,
  userSvg,
  onManualStart,
  destSvg,
  fullPath,
  currentPosition,
}: SvgRouteMapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);
  const [svgText, setSvgText] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const prevRouteCoordsRef = useRef<string>('');
  const prevFullPathCoordsRef = useRef<string>('');

  // Load SVG
  useEffect(() => {
    if (!campusId || !levelId) return;
    let cancelled = false;
    setMapLoading(true);
    setMapError(null);
    
    console.log('SvgRouteMap: Fetching map SVG', {
      campusId,
      levelType,
      levelId,
      isIndoor: levelType === 'floor',
      isSpecificFloor: levelId === 'floor-5cb14d04-ea6a-4cb5-9395-c052e44e7d7d',
      isSpecificBuilding: campusId.includes('building-ce56c56a-9c7b-4579-b688-08783f10aff1')
    });
    
    fetchMapSvg(campusId, levelType, levelId)
      .then((res) => {
        if (!cancelled) {
          console.log('SvgRouteMap: Map SVG loaded successfully', {
            levelType,
            levelId,
            fileSize: res.file_size
          });
          setSvgText(res.svg_data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('SvgRouteMap: Failed to load map SVG', {
            campusId,
            levelType,
            levelId,
            error: err instanceof Error ? err.message : String(err)
          });
          setMapError(err instanceof Error ? err.message : "Failed to load map");
        }
      })
      .finally(() => {
        if (!cancelled) setMapLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [campusId, levelId, levelType]);

  // Extract coordinates from path response - this is the key part for drawing the path
  const routeCoords = useMemo(() => {
    if (!path?.nodes?.length) {
      return [];
    }
    
    // Extract x, y coordinates from each node in the path response
    const coords = path.nodes
      .filter((n) => {
        return n.x != null && n.y != null && 
               typeof n.x === 'number' && typeof n.y === 'number' &&
               !isNaN(n.x) && !isNaN(n.y) &&
               isFinite(n.x) && isFinite(n.y);
      })
      .map((n) => [n.x as number, n.y as number] as [number, number]);
    
    return coords;
  }, [path?.nodes]);

  // Full path coordinates (for showing complete route in lighter color)
  const fullPathCoords = useMemo(() => {
    if (!fullPath?.nodes?.length) return [];
    return fullPath.nodes
      .filter((n) => n.x != null && n.y != null && 
                    typeof n.x === 'number' && typeof n.y === 'number' &&
                    !isNaN(n.x) && !isNaN(n.y) &&
                    isFinite(n.x) && isFinite(n.y))
      .map((n) => [n.x as number, n.y as number] as [number, number]);
  }, [fullPath?.nodes]);

  const routeBBox = useMemo(() => {
    if (!routeCoords.length) return null;
    const validCoords = routeCoords.filter((c) => 
      Array.isArray(c) && c.length >= 2 && 
      typeof c[0] === 'number' && typeof c[1] === 'number' &&
      !isNaN(c[0]) && !isNaN(c[1])
    );
    if (!validCoords.length) return null;
    const xs = validCoords.map((c) => c[0]);
    const ys = validCoords.map((c) => c[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return { minX, maxX, minY, maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }, [routeCoords]);

  const routePathD = useMemo(() => {
    if (!routeCoords.length) return "";
    return routeCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c[0]} ${c[1]}`).join(" ");
  }, [routeCoords]);

  // Initialize ECharts when SVG or route changes
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (!svgText) {
      return;
    }
    
    // Check if coordinates actually changed to avoid unnecessary re-renders
    const routeCoordsStr = JSON.stringify(routeCoords);
    const fullPathCoordsStr = JSON.stringify(fullPathCoords);
    
    if (routeCoordsStr === prevRouteCoordsRef.current && 
        fullPathCoordsStr === prevFullPathCoordsRef.current &&
        chartRef.current) {
      // Coordinates haven't changed, skip re-initialization
      return;
    }
    
    // Update refs
    prevRouteCoordsRef.current = routeCoordsStr;
    prevFullPathCoordsRef.current = fullPathCoordsStr;
    
    console.log('SvgRouteMap: Initializing ECharts map', { levelType, levelId, routeCoordsLength: routeCoords.length });
    
    try {
      const mapName = `map-${levelType}-${levelId}`;
      echarts.registerMap(mapName, { svg: svgText });
      const chart = echarts.init(ref.current);
      chartRef.current = chart;
      console.log('SvgRouteMap: ECharts initialized successfully');

    // Safely extract start and end coordinates
    const start: [number, number] | null = (() => {
      if (routeCoords.length === 0) return null;
      const first = routeCoords[0];
      if (!Array.isArray(first) || first.length < 2) return null;
      const x = first[0];
      const y = first[1];
      if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
        return null;
      }
      return [x, y];
    })();
    
    const end: [number, number] | null = (() => {
      if (routeCoords.length === 0) return null;
      const last = routeCoords[routeCoords.length - 1];
      if (!Array.isArray(last) || last.length < 2) return null;
      const x = last[0];
      const y = last[1];
      if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
        return null;
      }
      return [x, y];
    })();

    // Final validation - ensure we have valid coordinates before creating option
    if (routeCoords.length === 0) {
      console.warn('SvgRouteMap: No valid route coordinates, skipping path rendering');
      // Still render the map without path
    }
    
    const option: echarts.EChartsOption = {
      backgroundColor: "transparent",
      geo: {
        map: mapName,
        roam: true,
        zoom: 1,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        layoutSize: "100%",
        layoutCenter: ["50%", "50%"],
        ...(routeBBox && ref.current && routeCoords.length > 0
          ? (() => {
              try {
                const { width, height } = ref.current!.getBoundingClientRect();
                const pad = 60;
                const w = Math.max(routeBBox.maxX - routeBBox.minX, 1);
                const h = Math.max(routeBBox.maxY - routeBBox.minY, 1);
                const zoom = Math.min((width - pad) / w, (height - pad) / h);
                return {
                  center: [routeBBox.cx, routeBBox.cy],
                  zoom: Math.max(zoom, 0.5),
                };
              } catch (e) {
                console.error('SvgRouteMap: Error calculating zoom/center', e);
                return {};
              }
            })()
          : {}),
      },
      series: [
        // Full path in lighter color (if provided and different from current path)
        ...(fullPath && fullPathCoords.length > 0 && fullPathCoords.length !== routeCoords.length
          ? (() => {
              // Validate full path coordinates
              const validFullPathCoords = fullPathCoords.filter((c): c is [number, number] => {
                if (!Array.isArray(c) || c.length < 2) return false;
                const x = c[0];
                const y = c[1];
                return typeof x === 'number' && typeof y === 'number' && 
                       !isNaN(x) && !isNaN(y) && 
                       isFinite(x) && isFinite(y);
              });
              
              if (validFullPathCoords.length < 2) return [];
              
              // Format coordinates properly
              const formattedFullPathCoords: [number, number][] = validFullPathCoords.map(c => {
                if (Array.isArray(c) && c.length >= 2) {
                  return [Number(c[0]), Number(c[1])];
                }
                return null;
              }).filter((c): c is [number, number] => c !== null);
              
              if (formattedFullPathCoords.length < 2) return [];
              
              return [
                {
                  type: "lines",
                  coordinateSystem: "geo",
                  polyline: true,
                  data: [{ coords: formattedFullPathCoords }],
                  lineStyle: {
                    color: theme === "dark" ? "#9CA3AF" : "#D1D5DB", // Gray for full path
                    width: 4,
                    type: "solid",
                    opacity: 0.4,
                  },
                  effect: {
                    show: false, // No animation for full path
                  },
                  zlevel: 1,
                } as echarts.SeriesOption,
              ];
            })()
          : []),
        // Current progress path (highlighted) - Draw the path using coordinates from response
        ...(routeCoords.length > 0
          ? (() => {
              // Double-check and clean coordinates before passing to ECharts
              const validRouteCoords = routeCoords.filter((c): c is [number, number] => {
                if (!Array.isArray(c) || c.length < 2) return false;
                const x = c[0];
                const y = c[1];
                return typeof x === 'number' && typeof y === 'number' && 
                       !isNaN(x) && !isNaN(y) && 
                       isFinite(x) && isFinite(y);
              });
              
              if (validRouteCoords.length < 2) {
                console.warn('SvgRouteMap: Need at least 2 valid coordinates for path, got', validRouteCoords.length);
                return [];
              }
              
              // Ensure coordinates are in the exact format ECharts expects: array of [x, y] pairs
              const formattedCoords: [number, number][] = validRouteCoords.map(c => {
                if (Array.isArray(c) && c.length >= 2) {
                  return [Number(c[0]), Number(c[1])];
                }
                return null;
              }).filter((c): c is [number, number] => c !== null);
              
              if (formattedCoords.length < 2) {
                console.warn('SvgRouteMap: Not enough formatted coordinates');
                return [];
              }
              
              console.log('SvgRouteMap: Creating lines series with', formattedCoords.length, 'coordinates');
              
              return [
                {
                  type: "lines",
                  coordinateSystem: "geo",
                  polyline: true, // This draws a polyline connecting all coordinates
                  data: [{ 
                    coords: formattedCoords // Use the formatted coordinates
                  }],
                  lineStyle: {
                    color: "#4285F4", // Google Maps blue
                    width: 8, // Thicker line for visibility
                    type: "solid",
                    opacity: 0.95,
                  },
                  effect: {
                    show: routeCoords.length > 1, // Only show effect if we have multiple points
                    symbol: "arrow", // Animated arrow along the path
                    color: "#4285F4",
                    symbolSize: 10,
                    period: 2, // Faster animation
                    trailLength: 0.2,
                  },
                  smooth: false, // Use straight lines between points for accuracy
                  zlevel: 2,
                } as echarts.SeriesOption,
              ];
            })()
          : []),
        // Start and end markers (only if we have valid route coordinates)
        ...(routeCoords.length > 0 && start && end
          ? [
              {
                type: "scatter",
                coordinateSystem: "geo",
                symbolSize: 20, // Larger markers like Google Maps
                itemStyle: { 
                  color: "#34A853", // Google Maps green for start
                  borderColor: "#fff",
                  borderWidth: 2,
                },
                data: [{ name: "Start", value: start }],
                zlevel: 3,
              } as echarts.SeriesOption,
              {
                type: "scatter",
                coordinateSystem: "geo",
                symbolSize: 20, // Larger markers like Google Maps
                itemStyle: { 
                  color: "#EA4335", // Google Maps red for end
                  borderColor: "#fff",
                  borderWidth: 2,
                },
                data: [{ name: "End", value: end }],
                zlevel: 3,
              } as echarts.SeriesOption,
            ]
          : []),
        // Current position marker (if provided)
        ...(currentPosition && 
            typeof currentPosition.x === 'number' && typeof currentPosition.y === 'number' &&
            !isNaN(currentPosition.x) && !isNaN(currentPosition.y)
          ? [
              {
                type: "scatter",
                coordinateSystem: "geo",
                symbol: "circle",
                symbolSize: 24,
                itemStyle: { 
                  color: "#4285F4", // Blue for current position
                  borderColor: "#fff",
                  borderWidth: 3,
                },
                data: [{ name: "Current", value: [currentPosition.x, currentPosition.y] }],
                zlevel: 4,
              } as echarts.SeriesOption,
            ]
          : []),
        ...(userSvg
          ? [
              {
                type: "scatter",
                coordinateSystem: "geo",
                symbol: "circle",
                symbolSize: 12,
                itemStyle: { color: "#2563eb", opacity: 0.95 },
                data: [{ name: "You", value: [userSvg.x, userSvg.y] }],
                zlevel: 10,
              } as echarts.SeriesOption,
              ...(userSvg.accuracy
                ? [{
                    type: "scatter",
                    coordinateSystem: "geo",
                    symbol: "circle",
                    symbolSize: Math.max(userSvg.accuracy / 2, 10),
                    itemStyle: { color: "#2563eb", opacity: 0.15 },
                    data: [{ name: "Accuracy", value: [userSvg.x, userSvg.y] }],
                    zlevel: 5,
                  } as echarts.SeriesOption]
                : []),
            ]
          : []),
        ...(destSvg
          ? [
              {
                type: "scatter",
                coordinateSystem: "geo",
                symbol: "pin",
                symbolSize: 24,
                itemStyle: { color: "#ef4444" },
                data: [{ name: "Destination", value: [destSvg.x, destSvg.y] }],
                zlevel: 9,
              } as echarts.SeriesOption,
            ]
          : []),
      ],
    };

    // Validate option before setting
    try {
      // Double-check series data is valid
      const series = (option as any).series || [];
      const validSeries: any[] = [];
      
      for (const s of series) {
        if (s.type === 'lines' && s.data) {
          // Filter out invalid line series
          const validData = s.data.filter((item: any) => {
            if (!item.coords || !Array.isArray(item.coords)) {
              console.warn('SvgRouteMap: Invalid coords in lines data', item);
              return false;
            }
            // Ensure all coordinates are valid and we have at least 2 points
            const validCoords = item.coords.filter((c: any) => 
              Array.isArray(c) && c.length >= 2 && 
              typeof c[0] === 'number' && typeof c[1] === 'number' &&
              !isNaN(c[0]) && !isNaN(c[1]) && isFinite(c[0]) && isFinite(c[1])
            );
            
            if (validCoords.length < 2) {
              console.warn('SvgRouteMap: Not enough valid coordinates for line (need at least 2, got', validCoords.length, ')');
              return false;
            }
            
            item.coords = validCoords;
            return true;
          });
          
          if (validData.length > 0) {
            validSeries.push({ ...s, data: validData });
          } else {
            console.warn('SvgRouteMap: Skipping lines series with no valid data');
          }
        } else {
          // Keep non-lines series as-is
          validSeries.push(s);
        }
      }
      
      // Replace series with validated ones
      (option as any).series = validSeries;
      
      chart.setOption(option, true); // true = notMerge, replace all options
      console.log('SvgRouteMap: Chart option set with path', { 
        routeCoordsCount: routeCoords.length,
        routeCoordsSample: routeCoords.slice(0, 3), // Show first 3 coordinates
        fullPathCoordsCount: fullPathCoords.length,
        hasStart: !!start,
        startCoord: start,
        hasEnd: !!end,
        endCoord: end,
        hasCurrentPosition: !!currentPosition,
        mapName: mapName,
        seriesCount: series.length
      });
      
      // Verify the path is rendered (only in dev mode)
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          if (chartRef.current) {
            const currentOption = chartRef.current.getOption();
            console.log('SvgRouteMap: Current chart option', {
              seriesCount: (currentOption as any).series?.length || 0,
              hasLinesSeries: (currentOption as any).series?.some((s: any) => s.type === 'lines') || false
            });
          }
        }, 200);
      }
    } catch (optionError) {
      console.error('SvgRouteMap: Error setting chart option', optionError);
      // Try setting a minimal option without path
      try {
        chart.setOption({
          backgroundColor: "transparent",
          geo: {
            map: mapName,
            roam: true,
            zoom: 1,
          },
          series: [],
        }, true);
        console.log('SvgRouteMap: Set minimal chart option (map only, no path)');
      } catch (fallbackError) {
        console.error('SvgRouteMap: Error setting fallback option', fallbackError);
        throw fallbackError;
      }
    }

    // Manual start via map click (only set up once, not on every render)
    // Store the handler in a ref to avoid recreating it
    if (onManualStart) {
      const handleClick = (params: any) => {
        if (!chartRef.current) return;
        try {
          const geoCoord = chartRef.current.convertFromPixel({ seriesIndex: 0 }, [
            params.event?.offsetX ?? 0,
            params.event?.offsetY ?? 0,
          ]);
          if (Array.isArray(geoCoord) && geoCoord.length >= 2) {
            onManualStart({ x: geoCoord[0], y: geoCoord[1] });
          }
        } catch (e) {
          console.error('SvgRouteMap: Error handling map click', e);
        }
      };
      
      chart.off("click");
      chart.on("click", handleClick);
    }

    const handleResize = () => {
      if (chartRef.current) {
        try {
          chartRef.current.resize();
        } catch (e) {
          console.error('SvgRouteMap: Error resizing chart', e);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    
    // Force resize after a short delay to ensure container is sized (only once)
    const resizeTimeout = setTimeout(() => {
      if (chartRef.current && ref.current) {
        try {
          chartRef.current.resize();
        } catch (e) {
          console.error('SvgRouteMap: Error in delayed resize', e);
        }
      }
    }, 100);
    
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        try {
          chartRef.current.dispose();
        } catch (e) {
          console.error('SvgRouteMap: Error disposing chart', e);
        }
        chartRef.current = null;
      }
    };
    } catch (error) {
      console.error('SvgRouteMap: Error initializing ECharts', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize map';
      // Only set error if it's different to avoid infinite loops
      setMapError(prev => prev !== errorMessage ? errorMessage : prev);
    }
    // Dependencies: only essential values that should trigger re-initialization
    // routeCoords and fullPathCoords are checked inside the effect for actual changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svgText, levelId, levelType, theme, routeCoords.length, fullPathCoords.length]);

  // Show loading state but still render the container so path can be displayed
  if (mapLoading && !svgText) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400 mb-2">Loading map...</div>
          {routeCoords.length > 0 && (
            <div className="text-sm text-blue-500 mt-2">
              Path ready ({routeCoords.length} points)
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">
            Campus: {campusId}, Level: {levelType}/{levelId}
          </div>
        </div>
      </div>
    );
  }
  
  if (mapError && !svgText) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="text-center">
          <div className="text-red-500 text-sm mb-2">{mapError}</div>
          {routeCoords.length > 0 && (
            <div className="text-xs text-gray-500 mt-2">
              Path data available but map failed to load
            </div>
          )}
          <div className="text-xs text-gray-400 mt-2">
            Campus: {campusId}, Level: {levelType}/{levelId}
          </div>
        </div>
      </div>
    );
  }

  // Always render the container - ECharts will handle the map and path
  // Make sure it has explicit dimensions
  return (
    <div 
      ref={ref} 
      className="w-full h-full" 
      style={{ minHeight: '100%', minWidth: '100%' }}
    />
  );
}
