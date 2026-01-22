import { useEffect, useMemo, useState } from "react";
import IndoorMapECharts from "../components/IndoorMapECharts.jsx";
import { astar } from "../path/astar";

const defaultPrefs = { avoidStairs: false, preferWellLit: false };

export default function IndoorNavigator() {
  const [graph, setGraph] = useState(null);
  const [pois, setPois] = useState([]);
  const [startId, setStartId] = useState("");
  const [destId, setDestId] = useState("");
  const [prefs, setPrefs] = useState(defaultPrefs);
  const [routePoints, setRoutePoints] = useState([]);
  const [status, setStatus] = useState("Load indoor graph and POIs to begin.");
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Lazy load assets when page mounts
  useEffect(() => {
    const load = async () => {
      try {
        const [graphRes, poiRes] = await Promise.all([
          fetch("/data/lg-graph.json").then((r) => r.json()),
          fetch("/data/lg-poi.json").then((r) => r.json()),
        ]);
        setGraph(graphRes);
        setPois(poiRes);
        if (graphRes.nodes?.length) {
          setStartId(graphRes.nodes[0].id);
        }
        if (poiRes.length) {
          setDestId(poiRes[0].nodeId || poiRes[0].id);
        }
        setStatus("Tap the map to set start, search to pick destination.");
      } catch (err) {
        setError("Failed to load indoor assets (lg-graph.json / lg-poi.json / lg.svg).");
      }
    };
    load();
  }, []);

  const nodesById = useMemo(() => {
    if (!graph?.nodes) return new Map();
    return new Map(graph.nodes.map((n) => [n.id, n]));
  }, [graph]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return pois
      .filter((p) => {
        return (
          p.label?.toLowerCase().includes(q) ||
          p.building?.toLowerCase().includes(q) ||
          (p.keywords || []).some((k) => k.toLowerCase().includes(q))
        );
      })
      .slice(0, 8);
  }, [pois, query]);

  // Compute route when inputs change
  useEffect(() => {
    if (!graph || !startId || !destId) return;
    try {
      const routeIds = astar(graph.nodes, graph.edges, startId, destId, prefs);
      const pts = routeIds
        .map((id) => nodesById.get(id))
        .filter(Boolean)
        .map((n) => ({ x: n.x, y: n.y }));
      setRoutePoints(pts);
      setError(null);
      setStatus(`Route ready (${pts.length} points).`);
    } catch (err) {
      setRoutePoints([]);
      setError(err instanceof Error ? err.message : "No path found.");
    }
  }, [graph, startId, destId, prefs, nodesById]);

  const handleMapTap = ({ x, y }) => {
    if (!graph?.nodes?.length) return;
    let best = graph.nodes[0];
    let bestD2 = Number.POSITIVE_INFINITY;
    for (const n of graph.nodes) {
      const dx = n.x - x;
      const dy = n.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestD2) {
        bestD2 = d2;
        best = n;
      }
    }
    setStartId(best.id);
    setStatus(`Start set to ${best.id}`);
  };

  const startNode = startId ? nodesById.get(startId) : null;
  const destNode = destId ? nodesById.get(destId) : null;

  return (
    <div className="w-full h-screen bg-white text-black flex flex-col">
      <div className="p-3 border-b border-gray-200 shadow-sm">
        <div className="text-lg font-semibold">LG Indoor Navigator</div>
        <p className="text-xs text-gray-600">{status}</p>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>

      <div className="flex-1 min-h-0">
        <IndoorMapECharts
          routePoints={routePoints}
          startPoint={startNode ? { x: startNode.x, y: startNode.y } : null}
          endPoint={destNode ? { x: destNode.x, y: destNode.y } : null}
          onMapTap={handleMapTap}
          height="100%"
        />
      </div>

      <div className="p-3 border-t border-gray-200 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500">Search destination</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to search POIs"
              className="w-full border rounded-lg px-2 py-2 text-sm"
            />
            {searchResults.length > 0 && (
              <div className="mt-1 bg-white border rounded-lg max-h-40 overflow-auto shadow">
                {searchResults.map((p) => (
                  <button
                    key={p.id}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-50 text-sm"
                    onClick={() => {
                      setDestId(p.nodeId || p.id);
                      setQuery(p.label);
                    }}
                  >
                    {p.label}
                    {p.building ? <span className="text-gray-500 text-xs"> — {p.building}</span> : null}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-28">
            <label className="text-xs text-gray-500">Destination</label>
            <select
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
              className="w-full border rounded-lg px-2 py-2 text-sm"
            >
              {graph?.nodes?.slice(0, 200).map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500">Start node</label>
            <select
              value={startId}
              onChange={(e) => setStartId(e.target.value)}
              className="w-full border rounded-lg px-2 py-2 text-sm"
            >
              {graph?.nodes?.slice(0, 200).map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500">Tap the map to set start quickly.</p>
          </div>
          <div className="w-32 space-y-1">
            <label className="text-xs text-gray-500">Prefs</label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={prefs.avoidStairs}
                onChange={(e) => setPrefs((p) => ({ ...p, avoidStairs: e.target.checked }))}
              />
              Avoid stairs
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={prefs.preferWellLit}
                onChange={(e) => setPrefs((p) => ({ ...p, preferWellLit: e.target.checked }))}
              />
              Prefer well-lit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
