import type { PathfindingResponse, PathfindingNode, PathfindingEdge, MapLevelType } from '../api/client';

/**
 * Represents a segment of the route that should be displayed on a specific map
 */
export interface RouteSegment {
  levelType: MapLevelType;
  levelId: string; // campus_id or floor_id
  nodes: PathfindingNode[];
  edges: PathfindingEdge[];
  startNode: PathfindingNode;
  endNode: PathfindingNode;
}

/**
 * Splits a pathfinding route into segments based on is_scene_change in edges.
 * Each segment represents a portion of the route that should be displayed on a specific map.
 * 
 * @param path - The pathfinding response containing nodes and edges
 * @param campusId - The default campus ID to use for outdoor segments
 * @returns Array of route segments, each representing a portion of the route on a specific map
 */
export function splitRouteIntoSegments(
  path: PathfindingResponse | null,
  campusId: string
): RouteSegment[] {
  if (!path || !path.nodes || !path.edges || path.nodes.length === 0) {
    return [];
  }

  const segments: RouteSegment[] = [];
  const nodesById = new Map<string, PathfindingNode>();
  path.nodes.forEach((node) => {
    nodesById.set(node.id, node);
  });

  // Build edge map for quick lookup
  const edgesByFromNode = new Map<string, PathfindingEdge[]>();
  path.edges.forEach((edge) => {
    if (!edgesByFromNode.has(edge.from_node_id)) {
      edgesByFromNode.set(edge.from_node_id, []);
    }
    edgesByFromNode.get(edge.from_node_id)!.push(edge);
  });

  // Start with the first node
  let currentNodeId = path.nodes[0].id;
  let currentSegmentNodes: PathfindingNode[] = [path.nodes[0]];
  let currentSegmentEdges: PathfindingEdge[] = [];

  // Determine initial map level
  const firstNode = path.nodes[0];
  let currentLevelType: MapLevelType = firstNode.floor_id ? 'floor' : 'campus';
  let currentLevelId = firstNode.floor_id || campusId;

  // Traverse through nodes following edges
  for (let i = 0; i < path.nodes.length - 1; i++) {
    const currentNode = nodesById.get(currentNodeId);
    if (!currentNode) break;

    const edges = edgesByFromNode.get(currentNodeId) || [];
    const nextEdge = edges.find((e) => e.to_node_id === path.nodes[i + 1]?.id);
    
    if (!nextEdge) {
      // No edge found, try to continue with next node
      const nextNode = path.nodes[i + 1];
      if (nextNode) {
        currentSegmentNodes.push(nextNode);
        currentNodeId = nextNode.id;
      }
      continue;
    }

    const nextNode = nodesById.get(nextEdge.to_node_id);
    if (!nextNode) continue;

    // Check if this edge causes a scene change
    if (nextEdge.is_scene_change) {
      // Finalize current segment
      if (currentSegmentNodes.length > 0) {
        segments.push({
          levelType: currentLevelType,
          levelId: currentLevelId,
          nodes: [...currentSegmentNodes],
          edges: [...currentSegmentEdges],
          startNode: currentSegmentNodes[0],
          endNode: currentSegmentNodes[currentSegmentNodes.length - 1],
        });
      }

      // Start new segment with the next node (destination of scene change edge)
      // This is the first node that belongs to the new map
      currentSegmentNodes = [nextNode];
      currentSegmentEdges = [];
      
      // Determine new map level based on next node
      // If next node has floor_id, it's indoor; otherwise it's outdoor (campus)
      if (nextNode.floor_id) {
        // Node has floor_id - it's indoor
        currentLevelType = 'floor';
        currentLevelId = nextNode.floor_id;
        console.log('RouteSegments: Scene change to indoor - using floor_id', {
          floor_id: nextNode.floor_id,
          building_id: nextNode.building_id,
          node_id: nextNode.id,
          node_name: nextNode.name,
          space_type: nextNode.space_type
        });
      } else {
        // Node doesn't have floor_id - it's outdoor (campus)
        // Even if it has building_id or space_type, if no floor_id, it's campus level
        currentLevelType = 'campus';
        currentLevelId = campusId;
        console.log('RouteSegments: Scene change to outdoor (campus) - no floor_id', {
          campusId,
          node_id: nextNode.id,
          node_name: nextNode.name,
          building_id: nextNode.building_id,
          space_type: nextNode.space_type,
          hasFloorId: !!nextNode.floor_id
        });
      }
    } else {
      // Continue current segment
      currentSegmentNodes.push(nextNode);
      currentSegmentEdges.push(nextEdge);
    }

    currentNodeId = nextNode.id;
  }

  // Add final segment
  if (currentSegmentNodes.length > 0) {
    // Ensure we have the correct levelId - check all nodes in segment for floor_id
    let finalLevelType = currentLevelType;
    let finalLevelId = currentLevelId;
    
    // Check if any node in the segment has a floor_id (indoor)
    // Only floor_id determines indoor, not building_id or space_type
    const hasIndoorNode = currentSegmentNodes.some(n => n.floor_id);
    if (hasIndoorNode) {
      finalLevelType = 'floor';
      // Find the first node with floor_id
      const indoorNode = currentSegmentNodes.find(n => n.floor_id);
      if (indoorNode?.floor_id) {
        finalLevelId = indoorNode.floor_id;
      }
    } else {
      // No floor_id found - it's outdoor (campus)
      finalLevelType = 'campus';
      finalLevelId = campusId;
    }
    
    console.log('RouteSegments: Final segment', {
      levelType: finalLevelType,
      levelId: finalLevelId,
      nodeCount: currentSegmentNodes.length,
      hasIndoorNode
    });
    
    segments.push({
      levelType: finalLevelType,
      levelId: finalLevelId,
      nodes: [...currentSegmentNodes],
      edges: [...currentSegmentEdges],
      startNode: currentSegmentNodes[0],
      endNode: currentSegmentNodes[currentSegmentNodes.length - 1],
    });
  }

  return segments;
}

/**
 * Gets the map level information for a specific node in the route
 */
export function getNodeMapLevel(
  node: PathfindingNode,
  campusId: string
): { levelType: MapLevelType; levelId: string } {
  if (node.floor_id) {
    return { levelType: 'floor', levelId: node.floor_id };
  }
  if (node.building_id) {
    // For building nodes without floor, use campus level
    return { levelType: 'campus', levelId: campusId };
  }
  return { levelType: 'campus', levelId: campusId };
}
