import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

/**
 * Props:
 * - routePoints: [{x,y}]
 * - startPoint: {x,y} | null
 * - endPoint: {x,y} | null
 * - onMapTap: ({x,y}) => void
 * - height: css height (default 100%)
 */
export default function IndoorMapECharts({
  routePoints = [],
  startPoint = null,
  endPoint = null,
  onMapTap,
  height = "100%",
}) {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  // Load SVG and register map once
  useEffect(() => {
    let disposed = false;
    const loadSvg = async () => {
      try {
        const res = await fetch("/maps/lg.svg");
        const svgText = await res.text();
        if (disposed) return;
        echarts.registerMap("LG_INDOOR", { svg: svgText });
        setMapReady(true);
      } catch (err) {
        console.error("Failed to load LG SVG", err);
      }
    };
    loadSvg();
    return () => {
      disposed = true;
    };
  }, []);

  // Init chart
  useEffect(() => {
    if (!containerRef.current || !mapReady) return;
    const chart = echarts.init(containerRef.current);
    chartRef.current = chart;

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    const handleClick = (params) => {
      if (!onMapTap || !chartRef.current) return;
      const pixel = [params.event.offsetX, params.event.offsetY];
      const svgCoord = chartRef.current.convertFromPixel({ geoIndex: 0 }, pixel);
      if (Array.isArray(svgCoord) && svgCoord.length === 2) {
        onMapTap({ x: svgCoord[0], y: svgCoord[1] });
      }
    };
    chart.on("click", handleClick);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.off("click", handleClick);
      chart.dispose();
    };
  }, [mapReady, onMapTap]);

  // Update options whenever data changes
  useEffect(() => {
    if (!chartRef.current || !mapReady) return;
    const hasRoute = routePoints.length > 1;
    const routeCoords = routePoints.map((p) => [p.x, p.y]);
    const scatterData = [];
    if (startPoint) scatterData.push({ name: "start", value: [startPoint.x, startPoint.y], symbolSize: 12 });
    if (endPoint) scatterData.push({ name: "end", value: [endPoint.x, endPoint.y], symbolSize: 14 });

    chartRef.current.setOption(
      {
        animation: false,
        geo: {
          map: "LG_INDOOR",
          roam: true,
          zoom: 1.2,
          selectedMode: false,
        },
        series: [
          {
            id: "route",
            type: "lines",
            coordinateSystem: "geo",
            polyline: true,
            effect: { show: false },
            lineStyle: {
              color: "#4A90E2",
              width: 4,
              opacity: 0.95,
            },
            data: hasRoute ? [{ coords: routeCoords }] : [],
          },
          {
            id: "markers",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "circle",
            itemStyle: {
              color: (val) => (val.name === "start" ? "#10B981" : "#EF4444"),
            },
            data: scatterData,
            emphasis: { scale: true },
          },
        ],
      },
      true
    );
  }, [mapReady, routePoints, startPoint, endPoint]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height }}
      className="bg-white touch-pan-y touch-pan-x"
    />
  );
}
