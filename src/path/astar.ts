// Lightweight A* pathfinding with a binary-heap priority queue.
// Nodes are in SVG coordinate space (x, y). Edges carry attributes for stairs/well_lit/etc.

export type GraphNode = {
  id: string;
  x: number;
  y: number;
  z?: number;
  tags?: string[];
};

export type GraphEdge = {
  from: string;
  to: string;
  dist: number;
  attrs?: {
    stairs?: boolean;
    well_lit?: boolean;
    covered?: boolean;
    accessible?: boolean;
  };
};

export type Preferences = {
  avoidStairs?: boolean;
  preferWellLit?: boolean;
};

// Min-heap priority queue
class MinHeap<T> {
  private data: { k: number; v: T }[] = [];
  push(k: number, v: T) {
    this.data.push({ k, v });
    this.bubbleUp(this.data.length - 1);
  }
  pop(): T | undefined {
    if (!this.data.length) return undefined;
    const root = this.data[0].v;
    const last = this.data.pop();
    if (this.data.length && last) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return root;
  }
  get size() {
    return this.data.length;
  }
  private bubbleUp(i: number) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p].k <= this.data[i].k) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  private bubbleDown(i: number) {
    const n = this.data.length;
    while (true) {
      const l = (i << 1) + 1;
      const r = l + 1;
      let smallest = i;
      if (l < n && this.data[l].k < this.data[smallest].k) smallest = l;
      if (r < n && this.data[r].k < this.data[smallest].k) smallest = r;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}

const euclidean = (a: GraphNode, b: GraphNode) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
};

export function astar(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: string,
  goalId: string,
  pref: Preferences = {}
): string[] {
  if (startId === goalId) return [startId];

  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  const adj = new Map<string, GraphEdge[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push(e);
  }

  const start = nodeById.get(startId);
  const goal = nodeById.get(goalId);
  if (!start || !goal) throw new Error("Start or goal node missing");

  const open = new MinHeap<string>();
  const g = new Map<string, number>();
  const f = new Map<string, number>();
  const came = new Map<string, string | null>();

  g.set(startId, 0);
  f.set(startId, euclidean(start, goal));
  came.set(startId, null);
  open.push(f.get(startId)!, startId);

  const edgeCost = (edge: GraphEdge): number => {
    if (pref.avoidStairs && edge.attrs?.stairs) return Number.POSITIVE_INFINITY;
    let cost = edge.dist;
    if (pref.preferWellLit && edge.attrs && edge.attrs.well_lit === false) {
      cost *= 1.35;
    }
    return cost;
  };

  while (open.size) {
    const currentId = open.pop()!;
    if (currentId === goalId) {
      // reconstruct path
      const route: string[] = [];
      let cur: string | null = goalId;
      while (cur) {
        route.push(cur);
        cur = came.get(cur) ?? null;
      }
      return route.reverse();
    }
    const currentNode = nodeById.get(currentId);
    if (!currentNode) continue;
    const neighbors = adj.get(currentId) || [];
    for (const edge of neighbors) {
      const neighborId = edge.to;
      const neighbor = nodeById.get(neighborId);
      if (!neighbor) continue;
      const cost = edgeCost(edge);
      if (!Number.isFinite(cost)) continue;
      const tentativeG = (g.get(currentId) ?? Infinity) + cost;
      if (tentativeG < (g.get(neighborId) ?? Infinity)) {
        came.set(neighborId, currentId);
        g.set(neighborId, tentativeG);
        const h = euclidean(neighbor, goal);
        const newF = tentativeG + h;
        f.set(neighborId, newF);
        open.push(newF, neighborId);
      }
    }
  }

  throw new Error("No path found");
}

// Example usage and tiny test
export function testAstar() {
  const nodes: GraphNode[] = [
    { id: "A", x: 0, y: 0 },
    { id: "B", x: 10, y: 0 },
    { id: "C", x: 10, y: 10 },
    { id: "D", x: 0, y: 10 },
  ];
  const edges: GraphEdge[] = [
    { from: "A", to: "B", dist: 10, attrs: { well_lit: true } },
    { from: "B", to: "C", dist: 10, attrs: { well_lit: false } },
    { from: "A", to: "D", dist: 10, attrs: { well_lit: true } },
    { from: "D", to: "C", dist: 10, attrs: { well_lit: true } },
  ];
  const routeLit = astar(nodes, edges, "A", "C", { preferWellLit: true });
  const routeShort = astar(nodes, edges, "A", "C", {});
  console.log("Prefer well-lit route:", routeLit.join(" -> ")); // A -> D -> C
  console.log("Shortest route:", routeShort.join(" -> ")); // A -> B -> C
}
