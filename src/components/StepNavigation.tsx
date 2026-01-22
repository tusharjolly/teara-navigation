import React, { useMemo, useState } from 'react';
import { ArrowUp, ChevronUp, Navigation2, X, ArrowRight, ArrowLeft, ArrowDown } from 'lucide-react';
import { Language, Theme, RoutePreference, MapNode } from '../App';
import type { PathfindingResponse, PathfindingNode } from '../api/client';
import { SvgRouteMap } from './SvgRouteMap';
import { splitRouteIntoSegments } from '../path/routeSegments';
import { getDefaultCampusId } from '../api/client';

// ============================================================================
// TYPES
// ============================================================================

interface Step {
  id: number;
  instruction: string;
  instructionCN: string;
  instructionMI: string;
  distance: string;
  direction: 'north' | 'south' | 'east' | 'west' | 'straight' | 'left' | 'right';
  nodeIndex: number;
}

interface StepNavigationProps {
  language: Language;
  theme: Theme;
  startPoint: MapNode | null;
  destination: MapNode | null;
  routePreference: RoutePreference;
  currentStep: number;
  onStepChange: (step: number) => void;
  onBack: () => void;
  path: PathfindingResponse | null;
  campusId?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function StepNavigation({
  language,
  theme,
  startPoint,
  destination,
  routePreference,
  currentStep,
  onStepChange,
  onBack,
  path,
  campusId,
}: StepNavigationProps) {
  const [isPanelExpanded, setIsPanelExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Safely get campus ID
  let effectiveCampusId = '';
  try {
    effectiveCampusId = campusId || getDefaultCampusId() || '';
  } catch (e) {
    console.error('Error getting campus ID:', e);
    setError('Failed to get campus ID');
    effectiveCampusId = '';
  }

  // Check if we have valid path data
  const hasValidPath = path && path.nodes && Array.isArray(path.nodes) && path.nodes.length >= 2;

  // Calculate distance between two nodes
  const calculateDistance = (node1: PathfindingNode, node2: PathfindingNode): number => {
    if (!node1.x || !node1.y || !node2.x || !node2.y) return 0;
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Calculate direction between two points
  const calculateDirection = (node1: PathfindingNode, node2: PathfindingNode): Step['direction'] => {
    if (!node1.x || !node1.y || !node2.x || !node2.y) return 'straight';
    const dx = node2.x - node1.x;
    const dy = node2.y - node1.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    if (angle >= -45 && angle < 45) return 'east';
    if (angle >= 45 && angle < 135) return 'north';
    if (angle >= 135 || angle < -135) return 'west';
    return 'south';
  };

  // Generate simple step-by-step instructions
  const steps: Step[] = useMemo(() => {
    try {
      if (!hasValidPath || !path || !path.nodes) return [];

      const stepList: Step[] = [];
      let totalDistance = 0;

    // First step - Start
    const firstNode = path.nodes[0];
    stepList.push({
      id: 1,
      instruction: `Start at ${firstNode.name || firstNode.id}`,
      instructionCN: `从 ${firstNode.name || firstNode.id} 出发`,
      instructionMI: `Tīmata i ${firstNode.name || firstNode.id}`,
      distance: '0 m',
        direction: 'straight',
      nodeIndex: 0,
    });

    // Generate steps for each segment
    for (let i = 1; i < path.nodes.length; i++) {
      const prevNode = path.nodes[i - 1];
      const currentNode = path.nodes[i];
      const segmentDistance = calculateDistance(prevNode, currentNode);
      totalDistance += segmentDistance;

      // Determine direction
      let direction: Step['direction'] = 'straight';
      if (i > 1) {
        const prevDirection = calculateDirection(path.nodes[i - 2], prevNode);
        const currDirection = calculateDirection(prevNode, currentNode);
        
        // Simple turn detection
        if (prevDirection !== currDirection) {
          if (
            (prevDirection === 'north' && currDirection === 'east') ||
            (prevDirection === 'east' && currDirection === 'south') ||
            (prevDirection === 'south' && currDirection === 'west') ||
            (prevDirection === 'west' && currDirection === 'north')
          ) {
            direction = 'right';
          } else if (
            (prevDirection === 'north' && currDirection === 'west') ||
            (prevDirection === 'west' && currDirection === 'south') ||
            (prevDirection === 'south' && currDirection === 'east') ||
            (prevDirection === 'east' && currDirection === 'north')
          ) {
            direction = 'left';
          }
        } else {
          direction = 'straight';
        }
      } else {
        direction = calculateDirection(prevNode, currentNode);
      }

      // Check if this is the last node
      const isLast = i === path.nodes.length - 1;
      const distanceStr = totalDistance >= 1000 
        ? `${(totalDistance / 1000).toFixed(1)} km`
        : `${Math.round(totalDistance)} m`;

      let instruction = '';
      let instructionCN = '';
      let instructionMI = '';

      if (isLast) {
        instruction = `Arrive at ${currentNode.name || currentNode.id}`;
        instructionCN = `到达 ${currentNode.name || currentNode.id}`;
        instructionMI = `Tae ki ${currentNode.name || currentNode.id}`;
      } else if (direction === 'left') {
        instruction = `Turn left toward ${currentNode.name || currentNode.id}`;
        instructionCN = `左转前往 ${currentNode.name || currentNode.id}`;
        instructionMI = `Huri mauī ki ${currentNode.name || currentNode.id}`;
      } else if (direction === 'right') {
        instruction = `Turn right toward ${currentNode.name || currentNode.id}`;
        instructionCN = `右转前往 ${currentNode.name || currentNode.id}`;
        instructionMI = `Huri matau ki ${currentNode.name || currentNode.id}`;
      } else {
        instruction = `Continue straight to ${currentNode.name || currentNode.id}`;
        instructionCN = `直行前往 ${currentNode.name || currentNode.id}`;
        instructionMI = `Haere tonu ki ${currentNode.name || currentNode.id}`;
      }

      stepList.push({
        id: i + 1,
        instruction,
        instructionCN,
        instructionMI,
        distance: distanceStr,
        direction,
        nodeIndex: i,
      });
    }

      return stepList;
    } catch (e) {
      console.error('Error generating steps:', e);
      setError(e instanceof Error ? e.message : 'Failed to generate steps');
      return [];
    }
  }, [path, hasValidPath]);

  const safeStep = Math.min(Math.max(currentStep, 0), Math.max(steps.length - 1, 0));
  const currentStepData = steps.length > 0 && steps[safeStep] ? steps[safeStep] : null;

  // Get route segments for map display
  const routeSegments = useMemo(() => {
    if (!path || !effectiveCampusId) return [];
    try {
      return splitRouteIntoSegments(path, effectiveCampusId);
    } catch (e) {
      console.error('Error splitting route segments:', e);
      return [];
    }
  }, [path, effectiveCampusId]);

  // Determine which segment the current step is in
  // This switches to indoor map when is_scene_change is true
  const currentSegment = useMemo(() => {
    if (!routeSegments.length) {
      return null;
    }

    // If no current step data, use first segment
    if (!currentStepData || !path) {
      return routeSegments[0] || null;
    }

    const currentNodeIndex = currentStepData.nodeIndex;
    const currentNode = path.nodes[currentNodeIndex];
    
    if (!currentNode) {
      return routeSegments[0] || null;
    }

    // Check if we've crossed a scene change edge
    // Look backwards from current node to find if we've passed a scene change
    if (path.edges && currentNodeIndex > 0) {
      for (let i = currentNodeIndex - 1; i >= 0; i--) {
        const node = path.nodes[i];
        if (!node) continue;
        
        // Find edges from this node to the next node
        const nextNode = path.nodes[i + 1];
        if (!nextNode) continue;
        
        const edge = path.edges.find(
          e => e.from_node_id === node.id && e.to_node_id === nextNode.id
        );
        
        // If we find a scene change edge that we've already crossed
        if (edge?.is_scene_change) {
          // Find the segment that contains the destination node (after scene change)
          for (const segment of routeSegments) {
            const nodeIds = new Set(segment.nodes.map(n => n.id));
            if (nodeIds.has(nextNode.id) || nodeIds.has(currentNode.id)) {
              console.log('StepNavigation: Scene change detected - switching to', {
                levelType: segment.levelType,
                levelId: segment.levelId,
                isIndoor: segment.levelType === 'floor',
                currentNodeId: currentNode.id,
                sceneChangeFrom: node.id,
                sceneChangeTo: nextNode.id,
                nextNodeFloorId: nextNode.floor_id,
                nextNodeBuildingId: nextNode.building_id
              });
              
              // Log specific IDs if they match the known building/floor
              if (nextNode.floor_id === 'floor-5cb14d04-ea6a-4cb5-9395-c052e44e7d7d') {
                console.log('StepNavigation: ✅ Detected specific floor ID:', nextNode.floor_id);
              }
              if (nextNode.building_id === 'building-ce56c56a-9c7b-4579-b688-08783f10aff1') {
                console.log('StepNavigation: ✅ Detected specific building ID:', nextNode.building_id);
              }
              return segment;
            }
          }
        }
      }
    }

    // Find the segment that contains the current node
    for (const segment of routeSegments) {
      const nodeIds = new Set(segment.nodes.map(n => n.id));
      if (nodeIds.has(currentNode.id)) {
        console.log('StepNavigation: Current segment found', {
          levelType: segment.levelType,
          levelId: segment.levelId,
          nodeId: currentNode.id,
          isIndoor: segment.levelType === 'floor'
        });
        return segment;
      }
    }

    // Default to first segment
    return routeSegments[0] || null;
  }, [routeSegments, currentStepData, path]);

  // Create path showing progress up to current step
  // Only include nodes from current segment (starting from scene change destination)
  const progressPath = useMemo((): PathfindingResponse | null => {
    if (!path || !path.nodes || !currentSegment) {
      return path;
    }
    
    try {
      // Get node IDs that belong to the current segment
      const currentSegmentNodeIds = new Set(currentSegment.nodes.map(n => n.id));
      
      // If we have current step data, filter to show progress up to current step
      if (steps.length > 0 && currentStepData) {
        const maxIndex = Math.min(currentStepData.nodeIndex + 1, path.nodes.length);
        // Only include nodes that belong to current segment AND are up to current step
        const filteredNodes = path.nodes
          .slice(0, maxIndex)
          .filter(node => currentSegmentNodeIds.has(node.id));
        
        // Only include edges between nodes in current segment
        const filteredEdges = path.edges?.filter(edge => {
          const fromInSegment = currentSegmentNodeIds.has(edge.from_node_id);
          const toInSegment = currentSegmentNodeIds.has(edge.to_node_id);
          const toIdx = path.nodes.findIndex(n => n.id === edge.to_node_id);
          return fromInSegment && toInSegment && toIdx >= 0 && toIdx < maxIndex;
        }) || [];
        
        return {
          nodes: filteredNodes,
          edges: filteredEdges,
        };
      } else {
        // No current step, just return current segment nodes
        return {
          nodes: currentSegment.nodes,
          edges: currentSegment.edges,
        };
      }
    } catch (e) {
      console.error('Error creating progress path:', e);
      return path;
    }
  }, [path, steps, currentStepData, currentSegment]);

  // Get instruction text
  const getInstruction = (step: Step | undefined) => {
    if (!step) return language === 'en' ? 'No instruction' : language === 'zh' ? '无指示' : 'Kore he tohutohu';
    if (language === 'zh') return step.instructionCN;
    if (language === 'mi') return step.instructionMI;
    return step.instruction;
  };

  // Get direction icon
  const getDirectionIcon = (step: Step | undefined) => {
    if (!step) return <ArrowUp className="size-8 text-white" strokeWidth={3} />;
    
    switch (step.direction) {
      case 'left':
        return <ArrowLeft className="size-8 text-white" strokeWidth={3} />;
      case 'right':
        return <ArrowRight className="size-8 text-white" strokeWidth={3} />;
      case 'south':
        return <ArrowDown className="size-8 text-white" strokeWidth={3} />;
      default:
    return <ArrowUp className="size-8 text-white" strokeWidth={3} />;
    }
  };

  const progress = steps.length > 0 ? ((safeStep + 1) / steps.length) * 100 : 0;

  const handleNext = () => {
    if (safeStep < steps.length - 1) {
      onStepChange(safeStep + 1);
    }
  };

  // Show error if no valid path or if there's an error
  if (error || !hasValidPath) {
    return (
      <div className="relative w-full h-screen bg-white dark:bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-red-500 dark:text-red-400 mb-2 text-lg font-semibold">
              {language === 'en' ? 'Navigation Error' : language === 'zh' ? '导航错误' : 'He hapa whakatere'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {error || (language === 'en' 
                ? 'No route available. Please set a route first.' 
                : language === 'zh' 
                ? '没有可用路线。请先设置路线。' 
                : 'Kore he ara e wātea ana. Tīmatahia he ara i te tuatahi.')}
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[#ff5a5a] text-white rounded-lg font-semibold hover:bg-[#ff4040] transition-colors"
            >
              {language === 'en' ? 'Go Back' : language === 'zh' ? '返回' : 'Hoki'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 h-[44px] bg-[#353535] dark:bg-gray-950 z-50 flex items-center justify-between px-4">
        <span className="text-white text-sm">10:29</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-white rounded-sm" />
            <div className="w-1 h-3 bg-white rounded-sm" />
            <div className="w-1 h-3 bg-white/60 rounded-sm" />
            <div className="w-1 h-3 bg-white/40 rounded-sm" />
          </div>
          <Navigation2 className="size-3 text-white" />
          <span className="text-white text-xs bg-white/20 px-1.5 py-0.5 rounded">96</span>
        </div>
      </div>

      {/* Map with Highlighted Path */}
      <div className="absolute inset-0 w-full h-full z-0">
        {path && path.nodes && path.nodes.length >= 2 ? (
          // Always try to render the map with path, even if segment info is missing
          effectiveCampusId ? (
            <div className="w-full h-full">
              {/* Map level indicator (for debugging - can be removed in production) */}
              {process.env.NODE_ENV === 'development' && currentSegment && (
                <div className="absolute top-20 left-4 z-30 bg-black/70 text-white text-xs p-2 rounded">
                  <div>Map: {currentSegment.levelType === 'floor' ? 'Indoor' : 'Outdoor'}</div>
                  <div>Level ID: {currentSegment.levelId}</div>
                  <div>Segment: {routeSegments.findIndex(s => s === currentSegment) + 1}/{routeSegments.length}</div>
                </div>
              )}
              <SvgRouteMap 
                campusId={effectiveCampusId} 
                levelType={currentSegment?.levelType || 'campus'} 
                levelId={currentSegment?.levelId || effectiveCampusId}
                path={progressPath} 
                fullPath={currentSegment ? {
                  // Only show nodes from current segment
                  nodes: currentSegment.nodes,
                  edges: currentSegment.edges,
                } : path}
                theme={theme}
                currentPosition={
                  currentStepData && path && path.nodes && path.nodes[currentStepData.nodeIndex] && currentSegment
                    ? (() => {
                        try {
                          const node = path.nodes[currentStepData.nodeIndex];
                          // Only show current position if node belongs to current segment
                          const segmentNodeIds = new Set(currentSegment.nodes.map(n => n.id));
                          if (!segmentNodeIds.has(node.id)) {
                            return null; // Node doesn't belong to current segment
                          }
                          return node?.x != null && node?.y != null 
                            ? { x: node.x, y: node.y }
                            : null;
                        } catch (e) {
                          console.error('Error getting current position:', e);
                          return null;
                        }
                      })()
                    : null
                }
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  {language === 'en' ? 'Campus ID required' : language === 'zh' ? '需要校区ID' : 'Me whai ID o te kura'}
                </p>
                <button
                  onClick={onBack}
                  className="px-4 py-2 bg-[#ff5a5a] text-white rounded-lg mt-4"
                >
                  {language === 'en' ? 'Go Back' : language === 'zh' ? '返回' : 'Hoki'}
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {language === 'en' ? 'No path data available' : language === 'zh' ? '没有可用的路径数据' : 'Kore he raraunga ara e wātea ana'}
              </p>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-[#ff5a5a] text-white rounded-lg"
              >
                {language === 'en' ? 'Go Back' : language === 'zh' ? '返回' : 'Hoki'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Top Instruction Banner */}
      {currentStepData && (
      <div className="absolute top-[60px] left-4 right-4 z-40">
        <div className="bg-gradient-to-r from-[#ff5a5a] to-[#ff4040] rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-4">
          <div className="flex-shrink-0">
              {getDirectionIcon(currentStepData)}
          </div>
          <div className="flex-1">
            <p className="text-white text-xl font-bold leading-tight">
              {getInstruction(currentStepData)}
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex-shrink-0 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Exit navigation"
          >
            <X className="size-6 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
      )}

      {/* Recenter Button */}
      <button
        onClick={() => {}}
        className="absolute bottom-[180px] left-4 z-40 bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 hover:scale-110 transition-transform"
      >
        <div className="flex items-center gap-2">
          <Navigation2 className="size-5 text-[#357ABD]" />
          <span className="text-sm font-semibold text-black dark:text-white pr-1">
            {language === 'en' ? 'Recenter' : language === 'zh' ? '回正' : 'Hoki'}
          </span>
        </div>
      </button>

      {/* Bottom Panel */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl transition-all duration-300 z-50 ${
          isPanelExpanded ? 'h-[500px]' : 'h-[160px]'
        }`}
      >
        {/* Drag Handle */}
        <button
          onClick={() => setIsPanelExpanded(!isPanelExpanded)}
          className="w-full flex flex-col items-center pt-3 pb-2 cursor-pointer"
        >
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mb-2" />
          <ChevronUp className={`size-5 text-gray-400 transition-transform ${isPanelExpanded ? '' : 'rotate-180'}`} />
        </button>

        {/* Panel Content */}
        <div className="px-6 pb-8 overflow-y-auto h-full">
          {steps.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {language === 'en' ? 'No steps available' : language === 'zh' ? '没有可用步骤' : 'Kore he hīkoi e wātea ana'}
              </p>
            </div>
          ) : !isPanelExpanded ? (
            // Collapsed View
            <div>
              <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {language === 'en'
                    ? `Step ${safeStep + 1}/${steps.length}`
                      : language === 'zh'
                    ? `第 ${safeStep + 1}/${steps.length} 步`
                    : `Whakaaturanga ${safeStep + 1}/${steps.length}`}
                  </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#ff5a5a] to-[#ff4040] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Continue Button */}
              {safeStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-[#ff5a5a] to-[#ff4040] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  {language === 'en' ? 'Continue' : language === 'zh' ? '继续' : 'Haere tonu'}
                </button>
              ) : (
                <button
                  onClick={onBack}
                  className="w-full bg-gradient-to-r from-[#ff5a5a] to-[#ff4040] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  {language === 'en' ? 'Finish Navigation' : language === 'zh' ? '完成导航' : 'Whakaoti i te Whakatere'}
                </button>
              )}
            </div>
          ) : (
            // Expanded View - All steps
            <div className="pb-6">
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                {language === 'en' ? 'All Directions' : language === 'zh' ? '所有步骤' : 'Ngā Tohutohu Katoa'}
              </h3>
              
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-xl transition-all ${
                      index === safeStep
                        ? 'bg-gradient-to-r from-[#ff5a5a]/20 to-[#ff4040]/20 border-2 border-[#ff5a5a]'
                        : index < safeStep
                        ? 'bg-red-50 dark:bg-red-900/20 opacity-60'
                        : 'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === safeStep
                          ? 'bg-[#ff5a5a] text-white'
                          : index < safeStep
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {index < safeStep ? '✓' : index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-semibold text-black dark:text-white mb-1">
                          {getInstruction(step)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {step.distance}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black dark:bg-white rounded-full z-50" />
    </div>
  );
}
