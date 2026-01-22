import React, { useState, useEffect, useRef } from 'react';
import svgPaths from "./svg-vyj7vz77k0";
import campusMapSvg from "../assets/CurrentCampus.flattened.svg"; // Fallback
import { imgGroup } from "./svg-vz0t5";
import { Search, Plus, Minus, Menu as MenuIcon, ChevronRight, Route, Clock, Loader2, MapPin, Building2, X } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { fetchMapSvg, getDefaultCampusId } from '../api/client';
import * as echarts from 'echarts';

interface SearchResult {
  id: string;
  name: string;
  type: 'building' | 'node';
}

interface HomepageProps {
  onMenuClick?: () => void;
  onBuildingClick?: (buildingId: string) => void;
  onFloatingButtonClick?: () => void;
  onSearch?: (keyword: string) => Promise<SearchResult[]>;
  userLocation?: { x: number; y: number; accuracy?: number } | null;
  campusId?: string;
}

function Notch() {
  return (
    <div className="absolute h-[31px] left-[calc(50%+0.5px)] top-[-2px] translate-x-[-50%] w-[164px]" data-name="Notch">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 164 31">
        <g id="Notch">
          <g id="Notch_2"></g>
        </g>
      </svg>
    </div>
  );
}

function RightSide() {
  return (
    <div className="absolute h-[11.336px] right-[27.34px] top-[17.33px] w-[66.661px]" data-name="Right Side">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 12">
        <g id="Right Side">
          <g id="Battery">
            <path d={svgPaths.p18c81cf0} id="Rectangle" opacity="0.35" stroke="var(--stroke-0, white)" />
            <path d={svgPaths.p3d3cbf00} fill="var(--fill-0, white)" id="Combined Shape" opacity="0.4" />
            <path d={svgPaths.p3cceaf80} fill="var(--fill-0, white)" id="Rectangle_2" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p1d7c8600} fill="var(--fill-0, white)" fillRule="evenodd" id="Wifi" />
          <path clipRule="evenodd" d={svgPaths.p3e2de00} fill="var(--fill-0, white)" fillRule="evenodd" id="Mobile Signal" />
        </g>
      </svg>
    </div>
  );
}

function Time() {
  return (
    <div className="absolute h-[21px] left-[24px] rounded-[24px] top-[12px] w-[54px]" data-name="_Time">
      <p className="absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[20px] left-[27px] not-italic text-[15px] text-center text-white top-px tracking-[-0.5px] translate-x-[-50%] w-[54px]">9:41</p>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="absolute contents left-[24px] top-[12px]" data-name="Left Side">
      <Time />
    </div>
  );
}

function StatusBarIPhone1313Pro() {
  return (
    <div className="bg-[#353535] h-[44px] overflow-clip pointer-events-auto sticky top-0 w-[393px]" data-name="Status Bar / iPhone 13 & 13 Pro">
      <Notch />
      <RightSide />
      <LeftSide />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.001px_0px] mask-size-[97.38px_29.33px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 30">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p34b9a900} fill="var(--fill-0, #FFA400)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.p140d5400} fill="var(--fill-0, #231F20)" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p3b84c200} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_3" />
          <path d={svgPaths.p1f622380} fill="var(--fill-0, #231F20)" id="Vector_4" />
          <path d={svgPaths.pb88bd00} fill="var(--fill-0, #231F20)" id="Vector_5" />
          <path d={svgPaths.p1b120e00} fill="var(--fill-0, #231F20)" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.p10070680} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_7" />
          <path clipRule="evenodd" d={svgPaths.p36958780} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_8" />
          <path d={svgPaths.p394b1740} fill="var(--fill-0, #231F20)" id="Vector_9" />
          <path clipRule="evenodd" d={svgPaths.p23c71200} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_10" />
          <path d={svgPaths.pb99c600} fill="var(--fill-0, #231F20)" id="Vector_11" />
          <path clipRule="evenodd" d={svgPaths.p5943200} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_12" />
          <path d={svgPaths.p11a93b00} fill="var(--fill-0, #231F20)" id="Vector_13" />
          <path d={svgPaths.p17408d10} fill="var(--fill-0, #FFA400)" id="Vector_14" />
          <path d={svgPaths.p2f766f20} fill="var(--fill-0, #231F20)" id="Vector_15" />
          <path clipRule="evenodd" d={svgPaths.pf577500} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_16" />
          <path d={svgPaths.p23038100} fill="var(--fill-0, #E1251B)" id="Vector_17" />
          <path d={svgPaths.p2d711f80} fill="var(--fill-0, #E1251B)" id="Vector_18" />
          <path d={svgPaths.p2f65f80} fill="var(--fill-0, #E1251B)" id="Vector_19" />
          <path d={svgPaths.p18fbc3a0} fill="var(--fill-0, #E1251B)" id="Vector_20" />
          <path d={svgPaths.p15d11180} fill="var(--fill-0, #E1251B)" id="Vector_21" />
          <path d={svgPaths.p553b4f0} fill="var(--fill-0, #E1251B)" id="Vector_22" />
          <path d={svgPaths.p2cf69600} fill="var(--fill-0, #E1251B)" id="Vector_23" />
          <path d={svgPaths.p8c2ee00} fill="var(--fill-0, #E1251B)" id="Vector_24" />
          <path d={svgPaths.p3fada300} fill="var(--fill-0, #E1251B)" id="Vector_25" />
          <path d={svgPaths.p17647b00} fill="var(--fill-0, #E1251B)" id="Vector_26" />
          <path d={svgPaths.p19ded6f0} fill="var(--fill-0, #E1251B)" id="Vector_27" />
          <path d={svgPaths.p32d36200} fill="var(--fill-0, #E1251B)" id="Vector_28" />
          <path d={svgPaths.p18933680} fill="var(--fill-0, #E1251B)" id="Vector_29" />
          <path clipRule="evenodd" d={svgPaths.p17ffd00} fill="var(--fill-0, #FFA400)" fillRule="evenodd" id="Vector_30" />
          <path clipRule="evenodd" d={svgPaths.p31290c00} fill="var(--fill-0, #FFA400)" fillRule="evenodd" id="Vector_31" />
          <path d={svgPaths.p159c3b00} fill="var(--fill-0, #E1251B)" id="Vector_32" />
          <path d={svgPaths.p3b701680} fill="var(--fill-0, #231F20)" id="Vector_33" />
          <path clipRule="evenodd" d={svgPaths.p12ef9d00} fill="var(--fill-0, #FFA400)" fillRule="evenodd" id="Vector_34" />
          <path clipRule="evenodd" d={svgPaths.p27c21c00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_35" />
          <path clipRule="evenodd" d={svgPaths.p12d4e00} fill="var(--fill-0, #231F20)" fillRule="evenodd" id="Vector_36" />
          <path d={svgPaths.p29fe9870} fill="var(--fill-0, black)" id="Vector_37" />
          <path d={svgPaths.p4c9e6c0} fill="var(--fill-0, black)" id="Vector_38" />
          <path d={svgPaths.p9f80700} fill="var(--fill-0, black)" id="Vector_39" />
          <path d={svgPaths.p1a01ab00} fill="var(--fill-0, black)" id="Vector_40" />
          <path d={svgPaths.p275928f0} fill="var(--fill-0, black)" id="Vector_41" />
          <path d={svgPaths.p299f4580} fill="var(--fill-0, black)" id="Vector_42" />
          <path d={svgPaths.p5323500} fill="var(--fill-0, black)" id="Vector_43" />
          <path d={svgPaths.p1a327380} fill="var(--fill-0, black)" id="Vector_44" />
          <path clipRule="evenodd" d={svgPaths.p27657b00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_45" />
          <path d={svgPaths.p17ebad00} fill="var(--fill-0, black)" id="Vector_46" />
          <path d={svgPaths.pa328000} fill="var(--fill-0, black)" id="Vector_47" />
          <path d={svgPaths.p6ca5540} fill="var(--fill-0, black)" id="Vector_48" />
          <path d={svgPaths.p3d5d7ff0} fill="var(--fill-0, black)" id="Vector_49" />
          <path clipRule="evenodd" d={svgPaths.p2158700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_50" />
          <path d={svgPaths.p107ba0f0} fill="var(--fill-0, black)" id="Vector_51" />
          <path clipRule="evenodd" d={svgPaths.p3805a680} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_52" />
          <path d={svgPaths.p355ee600} fill="var(--fill-0, #E1251B)" id="Vector_53" />
          <path clipRule="evenodd" d={svgPaths.p2e8f7f00} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_54" />
          <path clipRule="evenodd" d={svgPaths.p1cfb4600} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_55" />
          <path d={svgPaths.p3f41e50} fill="var(--fill-0, #E1251B)" id="Vector_56" />
          <path clipRule="evenodd" d={svgPaths.p1b822100} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_57" />
          <path d={svgPaths.p1a47a800} fill="var(--fill-0, #E1251B)" id="Vector_58" />
          <path clipRule="evenodd" d={svgPaths.p167b4500} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_59" />
          <path d={svgPaths.p38cb7d80} fill="var(--fill-0, #E1251B)" id="Vector_60" />
          <path clipRule="evenodd" d={svgPaths.p2ae2c00} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_61" />
          <path d={svgPaths.p15306f00} fill="var(--fill-0, #E1251B)" id="Vector_62" />
          <path clipRule="evenodd" d={svgPaths.p20d4d600} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_63" />
          <path clipRule="evenodd" d={svgPaths.p3bb86200} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_64" />
          <path d={svgPaths.p35cdb80} fill="var(--fill-0, #E1251B)" id="Vector_65" />
          <path clipRule="evenodd" d={svgPaths.p153ee700} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_66" />
          <path clipRule="evenodd" d={svgPaths.p7533900} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_67" />
          <path clipRule="evenodd" d={svgPaths.p1f17cc80} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_68" />
          <path clipRule="evenodd" d={svgPaths.p16884600} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_69" />
          <path d={svgPaths.p1fb3af00} fill="var(--fill-0, #E1251B)" id="Vector_70" />
          <path clipRule="evenodd" d={svgPaths.p25785b00} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_71" />
          <path d={svgPaths.p2830cef0} fill="var(--fill-0, #E1251B)" id="Vector_72" />
          <path clipRule="evenodd" d={svgPaths.p148b19e0} fill="var(--fill-0, #E1251B)" fillRule="evenodd" id="Vector_73" />
          <path d={svgPaths.p284254f0} fill="var(--fill-0, #E1251B)" id="Vector_74" />
          <path clipRule="evenodd" d={svgPaths.p2a588e80} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_75" />
          <path clipRule="evenodd" d={svgPaths.p29fa0880} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_76" />
          <path clipRule="evenodd" d={svgPaths.p3321b100} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_77" />
          <path clipRule="evenodd" d={svgPaths.p2006f000} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector_78" />
          <path d={svgPaths.p3d2dbf00} fill="var(--fill-0, black)" id="Vector_79" />
          <path d={svgPaths.p2287e880} fill="var(--fill-0, black)" id="Vector_80" />
          <path d={svgPaths.p14af9a80} fill="var(--fill-0, black)" id="Vector_81" />
        </g>
      </svg>
    </div>
  );
}

function Component() {
  return (
    <div className="h-[29.33px] relative shrink-0 w-[97.38px] bg-white dark:bg-gray-100 rounded-md px-1 shadow-sm" data-name="Component 3">
      <Group />
    </div>
  );
}

function Location() {
  return (
    <div className="h-[79px] relative w-[69px]" data-name="location">
      <div className="absolute bottom-[-0.38%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 69 80">
          <g>
            <path d={svgPaths.p361f1200} fill="url(#paint0_linear_1_668)" id="Vector 2" />
            <circle cx="35" cy="51" fill="var(--fill-0, #255AFF)" fillOpacity="0.1" r="28.15" stroke="var(--stroke-0, #95BCE1)" strokeWidth="0.3" />
            <circle cx="35" cy="51" fill="var(--fill-0, #255AFF)" id="point" r="8" stroke="var(--stroke-0, white)" strokeWidth="4" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_668" x1="35" x2="35" y1="2" y2="50">
              <stop stopColor="#255AFF" stopOpacity="0" />
              <stop offset="1" stopColor="#255AFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function HomeIndicatorLight() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 w-[390px]" data-name="Home Indicator/Light">
      <div className="absolute bg-black dark:bg-white bottom-[8px] h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

export default function Homepage({ onMenuClick, onBuildingClick, onFloatingButtonClick, onSearch, userLocation, campusId }: HomepageProps) {
  const [zoomLevel, setZoomLevel] = useState(1); // Keep for fallback image zoom
  const [searchQuery, setSearchQuery] = useState('');
  const [showCampusPanel, setShowCampusPanel] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('hamilton');
  const [showRecentSearch, setShowRecentSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [mapSvg, setMapSvg] = useState<string | null>(null);
  const [mapLoading, setMapLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);
  const currentZoomRef = useRef<number>(1); // Track zoom without causing re-renders

  // Fetch map from API on mount and register with ECharts
  useEffect(() => {
    const loadMap = async () => {
      const campusIdToUse = campusId || getDefaultCampusId();
      if (!campusIdToUse) {
        setMapLoading(false);
        return;
      }

      try {
        setMapLoading(true);
        const mapData = await fetchMapSvg(campusIdToUse, 'campus', campusIdToUse);
        
        // Check if the response is a URL instead of SVG data (backend returns Azure Blob Storage URL)
        if (mapData.svg_data.trim().startsWith('http://') || mapData.svg_data.trim().startsWith('https://')) {
          // Can't fetch from internal IP addresses, use fallback immediately
          await loadFallbackSvg(campusIdToUse);
        } else {
          // Normal case: API returned SVG data directly
          setMapSvg(mapData.svg_data);
          const mapName = `campus-map-${campusIdToUse}`;
          echarts.registerMap(mapName, { svg: mapData.svg_data });
        }
      } catch (error) {
        await loadFallbackSvg(campusIdToUse);
      } finally {
        setMapLoading(false);
      }
      
      async function loadFallbackSvg(campusId: string) {
        try {
          // Try to load the imported fallback SVG first
          const response = await fetch(campusMapSvg);
          if (response.ok) {
            const svgText = await response.text();
            setMapSvg(svgText);
            const mapName = `campus-map-${campusId}`;
            echarts.registerMap(mapName, { svg: svgText });
            return;
          }
        } catch (e) {
          // Try public folder as fallback
        }
        
        try {
          // Try public folder as second fallback
          const publicResponse = await fetch('/maps/lg.svg');
          if (publicResponse.ok) {
            const svgText = await publicResponse.text();
            setMapSvg(svgText);
            const mapName = `campus-map-${campusId}`;
            echarts.registerMap(mapName, { svg: svgText });
          } else {
            setMapSvg(null);
          }
        } catch (fallbackError) {
          setMapSvg(null);
        }
      }
    };

    loadMap();
  }, [campusId]);

  // Initialize ECharts when map is loaded
  useEffect(() => {
    if (!mapContainerRef.current || !mapSvg || mapLoading) return;
    
    const campusIdToUse = campusId || getDefaultCampusId();
    const mapName = `campus-map-${campusIdToUse}`;
    
    // Dispose existing chart if any
    if (chartRef.current) {
      chartRef.current.dispose();
      chartRef.current = null;
    }
    
    // Wait for container to have dimensions
    const container = mapContainerRef.current;
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      const checkDimensions = setInterval(() => {
        if (container.clientWidth > 0 && container.clientHeight > 0) {
          clearInterval(checkDimensions);
          initializeChart();
        }
      }, 50);
      return () => clearInterval(checkDimensions);
    }
    
    initializeChart();
    
    function initializeChart() {
      if (!mapContainerRef.current || !mapSvg) return;
      
      // Initialize chart with proper configuration for touch devices
      const chart = echarts.init(mapContainerRef.current, null, {
        renderer: 'svg',
        useDirtyRect: false,
        // Enable touch events for mobile devices
        devicePixelRatio: window.devicePixelRatio || 1,
      });
      chartRef.current = chart;

      // Prepare markers data
      const markers: Array<{ name: string; value: [number, number]; symbolSize: number; itemStyle: { color: string } }> = [];
      
      // Add user location marker if available
      if (userLocation && userLocation.x != null && userLocation.y != null) {
        markers.push({
          name: 'user',
          value: [userLocation.x, userLocation.y],
          symbolSize: 16,
          itemStyle: { color: '#255AFF' }
        });
      }

      // Calculate bounding coordinates to fit the map on screen
      // SVG dimensions: 1515 x 1237.8
      const svgWidth = 1515;
      const svgHeight = 1237.8;
      const container = mapContainerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const containerRatio = containerWidth / containerHeight;
      const svgRatio = svgWidth / svgHeight;

      let boundingCoords: [[number, number], [number, number]];
      
      if (containerRatio > svgRatio) {
        // Container is wider - fit height, crop sides
        const visibleHeight = svgHeight;
        const visibleWidth = svgHeight * containerRatio;
        const cutX = (svgWidth - visibleWidth) / 2;
        boundingCoords = [
          [Math.max(0, cutX), 0],
          [Math.min(svgWidth, svgWidth - cutX), svgHeight],
        ];
      } else {
        // Container is taller - fit width, crop top/bottom
        const visibleWidth = svgWidth;
        const visibleHeight = svgWidth / containerRatio;
        const cutY = (svgHeight - visibleHeight) / 2;
        boundingCoords = [
          [0, Math.max(0, cutY)],
          [svgWidth, Math.min(svgHeight, svgHeight - cutY)],
        ];
      }

      // Calculate initial zoom for aesthetic view - zoomed in for better detail
      // Calculate based on container to ensure it fits properly
      const scaleX = containerWidth / svgWidth;
      const scaleY = containerHeight / svgHeight;
      const baseZoom = Math.min(scaleX, scaleY);
      // Use 1.2x multiplier for a zoomed-in aesthetic view (shows more detail)
      // This provides a nice zoomed-in view that's not too close
      const calculatedZoom = Math.max(0.8, Math.min(1.3, baseZoom * 1.2));

      // Set ECharts option - Google Maps-like functionality
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        animation: false, // Disable initial animation to prevent zoom jump
        animationDuration: 0, // No animation on initial load
        animationEasing: 'cubicOut', // Smooth easing
        geo: {
          map: mapName,
          roam: true, // Enable both pan and zoom gestures (like Google Maps)
          zoom: calculatedZoom, // Initial zoom level - zoomed in for detail
          center: [svgWidth / 2, svgHeight / 2], // Center the map on the SVG center point
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          layoutSize: '100%', // Fill entire container
          layoutCenter: ['50%', '50%'], // Center the map in container
          boundingCoords: boundingCoords, // Fit map to screen
          itemStyle: {
            areaColor: 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
          },
          emphasis: {
            disabled: true,
          },
          silent: true,
        },
        series: markers.length > 0 ? [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: markers,
            symbolSize: 16,
            itemStyle: {
              color: '#255AFF',
            },
            zlevel: 10,
          },
        ] : [],
      };

      chart.setOption(option, true);
      
      // Force resize to ensure proper fitting
      setTimeout(() => {
        if (chartRef.current) {
          chartRef.current.resize();
          // Recalculate bounding coords after resize
          const newContainerWidth = container.clientWidth;
          const newContainerHeight = container.clientHeight;
          const newContainerRatio = newContainerWidth / newContainerHeight;
          
          let newBoundingCoords: [[number, number], [number, number]];
          if (newContainerRatio > svgRatio) {
            const visibleHeight = svgHeight;
            const visibleWidth = svgHeight * newContainerRatio;
            const cutX = (svgWidth - visibleWidth) / 2;
            newBoundingCoords = [
              [Math.max(0, cutX), 0],
              [Math.min(svgWidth, svgWidth - cutX), svgHeight],
            ];
          } else {
            const visibleWidth = svgWidth;
            const visibleHeight = svgWidth / newContainerRatio;
            const cutY = (svgHeight - visibleHeight) / 2;
            newBoundingCoords = [
              [0, Math.max(0, cutY)],
              [svgWidth, Math.min(svgHeight, svgHeight - cutY)],
            ];
          }
          
          // Recalculate zoom for new container size with 1.2x multiplier
          const newScaleX = newContainerWidth / svgWidth;
          const newScaleY = newContainerHeight / svgHeight;
          const newBaseZoom = Math.min(newScaleX, newScaleY);
          const newCalculatedZoom = Math.max(0.8, Math.min(1.3, newBaseZoom * 1.2));
          
          chartRef.current.setOption({
            geo: {
              boundingCoords: newBoundingCoords,
              zoom: newCalculatedZoom,
              center: [svgWidth / 2, svgHeight / 2], // Keep map centered
            },
          }, false);
          
          currentZoomRef.current = newCalculatedZoom;
        }
      }, 100);

      // Add double-click to zoom in (Google Maps-like behavior)
      chart.on('dblclick', (params: any) => {
        if (chartRef.current && params.componentType === 'geo') {
          const currentOption = chartRef.current.getOption() as any;
          const currentZoom = currentOption.geo?.[0]?.zoom || 1;
          const maxZoom = 3; // Maximum zoom level
          const newZoom = Math.min(currentZoom * 1.5, maxZoom); // Zoom in by 1.5x, max 3
          chartRef.current.setOption({
            geo: { zoom: newZoom }
          }, false);
          currentZoomRef.current = newZoom;
        }
      });

      // Track zoom changes to keep currentZoomRef in sync and enforce zoom limits
      chart.on('georoam', () => {
        if (chartRef.current) {
          const option = chartRef.current.getOption() as any;
          const actualZoom = option.geo?.[0]?.zoom || 1;
          const minZoom = 0.3; // Minimum zoom level (zoom out limit)
          const maxZoom = 3; // Maximum zoom level (zoom in limit)
          
          // Enforce zoom limits
          if (actualZoom < minZoom || actualZoom > maxZoom) {
            const clampedZoom = Math.max(minZoom, Math.min(maxZoom, actualZoom));
            chartRef.current.setOption({
              geo: { zoom: clampedZoom }
            }, false);
            currentZoomRef.current = clampedZoom;
          } else {
            currentZoomRef.current = actualZoom;
          }
        }
      });
    }

    // Handle resize - recalculate bounding coords to fit map
    const handleResize = () => {
      if (chartRef.current && mapContainerRef.current) {
        chartRef.current.resize();
        
        // Recalculate bounding coords for new container size
        const svgWidth = 1515;
        const svgHeight = 1237.8;
        const container = mapContainerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const containerRatio = containerWidth / containerHeight;
        const svgRatio = svgWidth / svgHeight;
        
        let newBoundingCoords: [[number, number], [number, number]];
        if (containerRatio > svgRatio) {
          const visibleHeight = svgHeight;
          const visibleWidth = svgHeight * containerRatio;
          const cutX = (svgWidth - visibleWidth) / 2;
          newBoundingCoords = [
            [Math.max(0, cutX), 0],
            [Math.min(svgWidth, svgWidth - cutX), svgHeight],
          ];
        } else {
          const visibleWidth = svgWidth;
          const visibleHeight = svgWidth / containerRatio;
          const cutY = (svgHeight - visibleHeight) / 2;
          newBoundingCoords = [
            [0, Math.max(0, cutY)],
            [svgWidth, Math.min(svgHeight, svgHeight - cutY)],
          ];
        }
        
        chartRef.current.setOption({
          geo: {
            boundingCoords: newBoundingCoords,
            center: [svgWidth / 2, svgHeight / 2], // Keep map centered on resize
          },
        }, false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, [mapSvg, mapLoading, campusId]);

  // Update markers when user location changes (without re-initializing)
  useEffect(() => {
    if (!chartRef.current || !mapSvg) return;

    const markers: Array<{ name: string; value: [number, number]; symbolSize: number; itemStyle: { color: string } }> = [];
    
    if (userLocation && userLocation.x != null && userLocation.y != null) {
      markers.push({
        name: 'user',
        value: [userLocation.x, userLocation.y],
        symbolSize: 16,
        itemStyle: { color: '#255AFF' }
      });
    }

    chartRef.current.setOption({
      series: markers.length > 0 ? [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: markers,
          symbolSize: 16,
          itemStyle: {
            color: '#255AFF',
          },
          zlevel: 10,
        },
      ] : [],
    }, false);
  }, [userLocation, mapSvg]);


  // Call API when user searches - always calls backend API with timeout protection
  useEffect(() => {
    const keyword = searchQuery.trim();
    
    if (!keyword || !onSearch) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    let cancelled = false;
    setIsSearching(true);
    setSearchError(null);
    
    // Debounce API call - 300ms for smooth UX
    const debounceTimeout = setTimeout(() => {
      // Add a timeout wrapper to prevent infinite loading
      const searchTimeout = setTimeout(() => {
        if (!cancelled) {
          setSearchResults([]);
          setIsSearching(false);
          setSearchError('Search timed out. Please try again.');
        }
      }, 12000); // 12 second max timeout (10s API + 2s buffer)
      
      // Always call the API - no local fallback
      onSearch(keyword)
        .then((results) => {
          clearTimeout(searchTimeout);
          if (!cancelled) {
            setSearchResults(results);
            setIsSearching(false);
            setSearchError(null);
          }
        })
        .catch((error) => {
          clearTimeout(searchTimeout);
          if (!cancelled) {
            setSearchResults([]);
            setIsSearching(false);
            setSearchError(error instanceof Error ? error.message : 'Search failed. Please try again.');
          }
        });
    }, 300); // 300ms debounce for smooth typing experience

    return () => {
      cancelled = true;
      clearTimeout(debounceTimeout);
      setIsSearching(false);
      setSearchError(null);
    };
  }, [searchQuery, onSearch]);

  const recentSearches = [
    { id: '1', name: 'M Block', type: 'Building' as const },
    { id: '2', name: 'Student Centre', type: 'Building' as const },
    { id: '3', name: 'Library', type: 'Building' as const },
  ];

  const handleZoomIn = () => {
    try {
      // Get current zoom from ref or chart; fall back to image zoom level
      const currentZoom = chartRef.current && mapSvg ? (currentZoomRef.current || 1) : zoomLevel;
      const maxZoom = 3; // Maximum zoom level
      const newZoom = Math.min(currentZoom * 1.5, maxZoom); // Google Maps-like zoom step, max 3
      currentZoomRef.current = newZoom;
      setZoomLevel(newZoom); // keep fallback image in sync
      
      // Update zoom with smooth animation (if chart is active)
      if (chartRef.current && mapSvg) {
        chartRef.current.setOption({
          geo: { 
            zoom: newZoom 
          }
        }, false);
      }
    } catch (error) {
      console.error('Zoom in error:', error);
    }
  };

  const handleZoomOut = () => {
    try {
      // Get current zoom from ref or chart; fall back to image zoom level
      const currentZoom = chartRef.current && mapSvg ? (currentZoomRef.current || 1) : zoomLevel;
      const minZoom = 0.3; // Minimum zoom level
      const newZoom = Math.max(currentZoom / 1.5, minZoom); // Google Maps-like zoom step, min 0.3
      currentZoomRef.current = newZoom;
      setZoomLevel(newZoom); // keep fallback image in sync
      
      // Update zoom with smooth animation (if chart is active)
      if (chartRef.current && mapSvg) {
        chartRef.current.setOption({
          geo: { 
            zoom: newZoom 
          }
        }, false);
      }
    } catch (error) {
      console.error('Zoom out error:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 relative size-full" data-name="Homepage">
      <div className="absolute bg-white dark:bg-gray-900 h-[852px] left-0 top-0 w-[393px]" data-name="background" />
      
      {/* Status Bar */}
      <div className="absolute bottom-0 h-[852px] left-0 pointer-events-none top-0">
        <StatusBarIPhone1313Pro />
      </div>
      
      {/* White background for Title and Search */}
      <div className="absolute bg-white dark:bg-gray-900 h-[96px] left-0 top-[48px] w-[390px]" />
      
      {/* Map - Using ECharts */}
      <div
        className="absolute left-0 right-0 top-[121px] bottom-[140px] mx-auto w-full max-w-[480px] rounded-[20px] overflow-hidden bg-white dark:bg-gray-900"
        data-name="map"
        style={{ height: 'calc(100vh - 240px)' }}
      >
        {mapLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-tl-[20px] rounded-tr-[20px]">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading map...</p>
          </div>
        ) : mapSvg ? (
          <div 
            ref={mapContainerRef}
            className="absolute inset-0 rounded-tl-[20px] rounded-tr-[20px] w-full h-full"
            style={{ 
              touchAction: 'pan-x pan-y pinch-zoom', // Explicitly allow panning in all directions and pinch-zoom
              cursor: 'grab', // Show grab cursor on desktop
              WebkitUserSelect: 'none', // Prevent text selection on touch
              userSelect: 'none',
              WebkitTouchCallout: 'none', // Prevent iOS callout menu
              overscrollBehavior: 'contain', // Prevent page scroll when panning map
              pointerEvents: 'auto', // Ensure pointer events are enabled
            }}
            onMouseDown={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.cursor = 'grabbing';
              }
            }}
            onMouseUp={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.cursor = 'grab';
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget) {
                e.currentTarget.style.cursor = 'grab';
              }
            }}
          />
        ) : (
          // Fallback to static image if API fails
          <img 
            alt="Campus Map" 
            className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[20px] rounded-tr-[20px] size-full transition-transform duration-200" 
            src={campusMapSvg}
          style={{ transform: `scale(${zoomLevel})` }}
        />
        )}
      </div>
      
      {/* Floating Route Button */}
      <button onClick={onFloatingButtonClick} className="absolute bg-gradient-to-br from-[#ff5a5a] to-[#ff4040] box-border content-stretch flex gap-[4px] items-center justify-center left-[calc(83.33%-6.5px)] p-[8px] rounded-[100px] shadow-[0px_8px_12px_0px_rgba(0,0,0,0.3)] size-[56px] top-[759px] cursor-pointer hover:scale-105 hover:shadow-[0px_8px_16px_0px_rgba(255,90,90,0.4)] transition-all z-10">
        <Route className="size-7 text-white" strokeWidth={2} />
      </button>
      
      {/* Search Input - Professional Google Maps style */}
      <div className={`absolute bg-white dark:bg-gray-800 box-border content-stretch flex gap-[8px] items-center left-[16px] px-[12px] py-[10px] rounded-[100px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] top-[144px] w-[361px] z-20 transition-all duration-200 ${
        showRecentSearch ? 'shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)]' : ''
      }`}>
        <Search className={`size-5 text-[#2B2B2B] dark:text-gray-400 transition-colors ${isSearching ? 'text-blue-500' : ''}`} strokeWidth={2} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowRecentSearch(true)}
          placeholder="Search buildings, rooms, or locations..."
          className="flex-1 outline-none bg-transparent font-['Inter:Regular',sans-serif] text-[15px] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        {searchQuery && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSearchQuery('');
              setSearchResults([]);
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="size-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
          </button>
        )}
        {isSearching && (
          <Loader2 className="size-4 text-blue-500 animate-spin" strokeWidth={2} />
        )}
      </div>
      
      {/* Search Results Panel - Professional Google Maps style */}
      {showRecentSearch && (
        <div className="absolute bg-white dark:bg-gray-800 box-border flex flex-col left-[16px] max-h-[450px] overflow-hidden rounded-[16px] shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] top-[192px] w-[361px] z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          {searchQuery.trim() ? (
            <>
              {/* Search Results Header */}
              <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center gap-2">
                  {isSearching ? (
                    <>
                      <Loader2 className="size-4 text-blue-500 animate-spin" strokeWidth={2} />
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-gray-600 dark:text-gray-400">
                        Searching...
                      </p>
                    </>
                  ) : (
                    <>
                      <Search className="size-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-gray-600 dark:text-gray-400">
                        {searchResults.length > 0 ? `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}` : 'No results'}
                      </p>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => setShowRecentSearch(false)} 
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="size-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
                </button>
              </div>
              
              {/* Search Results List */}
              <div className="flex flex-col overflow-y-auto max-h-[380px]">
                {isSearching ? (
                  <div className="px-[16px] py-[24px] text-center">
                    <Loader2 className="size-6 text-blue-500 animate-spin mx-auto mb-2" strokeWidth={2} />
                    <p className="font-['Inter:Regular',sans-serif] text-[14px] text-gray-500 dark:text-gray-400">
                      Searching backend...
                    </p>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSearchQuery(item.name);
                        setShowRecentSearch(false);
                        // Only call onBuildingClick for buildings, not nodes
                        if (item.type === 'building') {
                          onBuildingClick?.(item.id);
                        }
                      }}
                      className="flex items-center gap-3 px-[16px] py-[14px] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0 active:bg-gray-100 dark:active:bg-gray-700"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        item.type === 'building' 
                          ? 'bg-blue-100 dark:bg-blue-900/30' 
                          : 'bg-green-100 dark:bg-green-900/30'
                      }`}>
                        {item.type === 'building' ? (
                          <Building2 className="size-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
                        ) : (
                          <MapPin className="size-5 text-green-600 dark:text-green-400" strokeWidth={2} />
                        )}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-black dark:text-white truncate">
                          {item.name}
                        </p>
                        <p className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-500 dark:text-gray-400 capitalize mt-0.5">
                          {item.type === 'building' ? 'Building' : 'Location'}
                        </p>
                      </div>
                      <ChevronRight className="size-5 text-gray-400 dark:text-gray-500 flex-shrink-0" strokeWidth={2} />
                    </button>
                  ))
                ) : searchError ? (
                  <div className="px-[16px] py-[24px] text-center">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-red-600 dark:text-red-400 mb-1">
                        Search Error
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-red-500 dark:text-red-500">
                        {searchError}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="px-[16px] py-[32px] text-center">
                    <Search className="size-8 text-gray-300 dark:text-gray-600 mx-auto mb-3" strokeWidth={1.5} />
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[14px] text-gray-500 dark:text-gray-400 mb-1">
                      No results found
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-400 dark:text-gray-500">
                      Try a different search term
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Recent Searches Header */}
              <div className="flex items-center justify-between px-[16px] py-[12px] border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-2">
                  <Clock className="size-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
                  <p className="font-['Inter:Medium',sans-serif] font-medium text-[13px] text-gray-600 dark:text-gray-400">
                    Recent Searches
                  </p>
            </div>
                <button 
                  onClick={() => setShowRecentSearch(false)} 
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="size-4 text-gray-500 dark:text-gray-400" strokeWidth={2} />
            </button>
          </div>
              
              {/* Recent Searches List */}
              <div className="flex flex-col overflow-y-auto max-h-[380px]">
            {recentSearches.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSearchQuery(item.name);
                  setShowRecentSearch(false);
                  onBuildingClick?.(item.id);
                }}
                    className="flex items-center gap-3 px-[16px] py-[14px] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0 active:bg-gray-100 dark:active:bg-gray-700"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Clock className="size-5 text-gray-500 dark:text-gray-400" strokeWidth={2} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[15px] text-black dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="font-['Inter:Regular',sans-serif] text-[12px] text-gray-500 dark:text-gray-400 capitalize mt-0.5">
                        {item.type}
                      </p>
                    </div>
                    <ChevronRight className="size-5 text-gray-400 dark:text-gray-500 flex-shrink-0" strokeWidth={2} />
              </button>
            ))}
          </div>
            </>
          )}
        </div>
      )}
      
      {/* Overlay to close recent search */}
      {showRecentSearch && (
        <div onClick={() => setShowRecentSearch(false)} className="absolute inset-0 z-[25]" />
      )}
      
      {/* Title Bar */}
      <div className="absolute box-border content-stretch flex items-center justify-between left-0 px-[16px] py-[24px] top-[44px] w-[393px] z-20">
        <button onClick={onMenuClick} className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 size-[29.33px] cursor-pointer hover:opacity-80 transition-opacity">
          <MenuIcon className="size-6 text-black dark:text-white" strokeWidth={2} />
        </button>
        
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-[316px]">
          <Component />
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.4] not-italic relative shrink-0 text-[20px] text-black dark:text-white text-nowrap whitespace-pre">Campus Map</p>
        </div>
        
        <button onClick={() => setShowCampusPanel(!showCampusPanel)} className="relative shrink-0 size-[24px] cursor-pointer hover:opacity-80 transition-opacity">
          <ChevronRight className="size-6 text-black dark:text-white" strokeWidth={2} />
        </button>
        
        {/* Campus Panel */}
        {showCampusPanel && (
          <div className="absolute bg-[#f6f6f6] dark:bg-gray-800 box-border content-stretch flex flex-col gap-[7px] items-start left-[calc(50%+36.5px)] overflow-clip px-[16px] py-[4px] rounded-[20px] top-[56px] w-[128px] z-30">
            <button onClick={() => { setSelectedCampus('hamilton'); setShowCampusPanel(false); }} className="w-full text-left">
              <p className={`font-['Inter:Bold',sans-serif] font-bold leading-[1.4] not-italic text-[20px] ${selectedCampus === 'hamilton' ? 'text-[#ff5a5a]' : 'text-[rgba(0,0,0,0.6)] dark:text-gray-400 opacity-60'}`}>Hamilton</p>
            </button>
            <button onClick={() => { setSelectedCampus('tauranga'); setShowCampusPanel(false); }} className="w-full text-left">
              <p className={`font-['Inter:Bold',sans-serif] font-bold leading-[1.4] not-italic text-[20px] ${selectedCampus === 'tauranga' ? 'text-[#ff5a5a]' : 'text-[rgba(0,0,0,0.6)] dark:text-gray-400 opacity-60'}`}>Tauranga</p>
            </button>
          </div>
        )}
      </div>
      
      {/* Zoom Controls */}
      <div className="absolute bottom-[35px] left-[16px] h-[81px] w-[40px] z-20">
        <div className="bg-white dark:bg-gray-800 rounded-[14px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] h-full w-full flex flex-col items-center justify-between py-2">
          <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Plus className="size-5 text-black dark:text-white" strokeWidth={2} />
          </button>
          <div className="h-px w-[28.5714px] bg-[#E6E6E6] dark:bg-gray-600" />
          <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Minus className="size-5 text-black dark:text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
      
      <HomeIndicatorLight />
    </div>
  );
}
