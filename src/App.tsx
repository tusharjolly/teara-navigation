import { useCallback, useEffect, useState, useRef } from 'react';
import Homepage from './imports/Homepage';
import MenuSidebar from './components/MenuSidebar';
import BuildingInfoPanel from './components/BuildingInfoPanel';
import RouteSetting from './components/RouteSetting';
import NavigationPreview from './components/NavigationPreview';
import StepNavigation from './components/StepNavigation';
import IndoorMap from './components/IndoorMap';
import { ErrorBoundary } from './components/ErrorBoundary';
import {
  fetchBuildings,
  fetchNodesForBuilding,
  fetchPathfinding,
  getDefaultCampusId,
  searchNodes,
  searchBuildingsAndNodes,
  type ApiBuilding,
  type ApiNode,
  type PathfindingResponse,
} from './api/client';
import { useGeolocation } from './location/useGeolocation';
import { projectLatLngToSvg, exampleCalibration } from './location/calibration';
import { loadPois, searchPois, type PoiIndex } from './search/poiSearch';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type Language = 'en' | 'zh' | 'mi';
export type Theme = 'light' | 'dark';
export type Page = 'home' | 'routeSetting' | 'navigationPreview' | 'stepNavigation' | 'indoorMap';

export interface Building {
  id: string;
  name: string;
  nameCN?: string;
  lat?: number;
  lng?: number;
  hasIndoorMap?: boolean;
  floorIds?: string[];
  tags?: string[];
}

export type MapNode = ApiNode;

export interface RoutePreference {
  avoidStairs: boolean;
  indoorNavigation: boolean;
  preferWellLit: boolean;
  preferAccessible: boolean;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function App() {
  // Page navigation state
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const campusId = getDefaultCampusId();
  
  // Global settings
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Building and route state
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoadingBuildings, setIsLoadingBuildings] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [startPoint, setStartPoint] = useState<MapNode | null>(null);
  const [destination, setDestination] = useState<MapNode | null>(null);
  const [routePreference, setRoutePreference] = useState<RoutePreference>({
    avoidStairs: false,
    indoorNavigation: false,
    preferWellLit: false,
    preferAccessible: false,
  });
  const [pathResult, setPathResult] = useState<PathfindingResponse | null>(null);
  const [isPathLoading, setIsPathLoading] = useState(false);
  const [pathError, setPathError] = useState<string | null>(null);
  const [userSvg, setUserSvg] = useState<{ x: number; y: number; accuracy?: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'locating' | 'ready' | 'error'>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [poiIndex, setPoiIndex] = useState<PoiIndex | null>(null);
  const [destMarker, setDestMarker] = useState<{ x: number; y: number } | null>(null);
  
  // Navigation step tracking
  const [currentStep, setCurrentStep] = useState(0);

  // ============================================================================
  // DATA LOADING
  // ============================================================================

  useEffect(() => {
    const mapBuilding = (b: ApiBuilding): Building => ({
      id: b.building_id,
      name: b.building_name,
      nameCN: b.building_name,
      hasIndoorMap: (b.floor_ids?.length ?? 0) > 0,
      floorIds: b.floor_ids ?? [],
      tags: b.tags ?? [],
    });

    if (!campusId) {
      setPathError('Missing campus ID. Set VITE_DEFAULT_CAMPUS_ID in your .env.');
      setIsLoadingBuildings(false);
      return;
    }

    setIsLoadingBuildings(true);
    fetchBuildings(campusId)
      .then((res) => {
        setBuildings(res.buildings.map(mapBuilding));
      })
      .catch((err) => {
        setPathError(err instanceof Error ? err.message : 'Failed to load buildings');
      })
      .finally(() => setIsLoadingBuildings(false));
  }, [campusId]);

  // Load POIs once
  useEffect(() => {
    loadPois()
      .then(setPoiIndex)
      .catch(() => setPoiIndex(null));
  }, []);

  // ============================================================================
  // GEOLOCATION + SNAP
  // ============================================================================
  useGeolocation({
    onUpdate: (pos) => {
      setLocationStatus('ready');
      const projected = projectLatLngToSvg(pos.lat, pos.lng, exampleCalibration);
      if (projected) {
        setUserSvg({ ...projected, accuracy: pos.accuracy });
        // Snap to nearest node if we have any (use current path nodes as a fallback).
        const candidates = pathResult?.nodes ?? [];
        if (candidates.length) {
          let best: ApiNode | null = null;
          let bestDist = Number.POSITIVE_INFINITY;
          for (const n of candidates) {
            if (n.x == null || n.y == null) continue;
            const dx = (n.x as number) - projected.x;
            const dy = (n.y as number) - projected.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < bestDist) {
              bestDist = d2;
              best = n;
            }
          }
          if (best) {
            setStartPoint(best);
          }
        }
      } else {
        setLocationMessage('Missing calibration; cannot place user on map.');
      }
    },
  });

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handle building icon click on map
   * Shows the building info panel
   */
  const handleBuildingClick = (buildingId: string) => {
    const building = buildings.find((b) => b.id === buildingId);
    if (building) {
      setSelectedBuilding(building);
    }
  };

  /**
   * Start route setting from floating button
   */
  const handleStartRoute = () => {
    setCurrentPage('routeSetting');
    setPathResult(null);
  };

  const updateStartPoint = (node: MapNode | null) => {
    setStartPoint(node);
    setPathResult(null);
  };

  const updateDestination = (node: MapNode | null) => {
    setDestination(node);
    setPathResult(null);
  };

  /**
   * Start route setting from building info panel
   * Sets the destination as the selected building
   * Sets the start point as the first building in the list (default)
   * Closes the building panel
   * Directly goes to navigation preview
   */
  const handleStartRouteFromBuilding = async (building: Building) => {
    setSelectedBuilding(null);
    updateDestination(null);

    if (!campusId) {
      setPathError('Set VITE_DEFAULT_CAMPUS_ID to enable routing.');
      setCurrentPage('routeSetting');
      return;
    }

    try {
      const res = await fetchNodesForBuilding(campusId, building.id);
      if (res.nodes && res.nodes.length > 0) {
        updateDestination(res.nodes[0]);
      }
    } catch (error) {
      setPathError(
        error instanceof Error
          ? error.message
          : 'Could not find a destination node for this building.'
      );
    }

    setCurrentPage('routeSetting');
  };

  /**
   * Confirm route settings, call backend pathfinding and go to navigation preview
   */
  const handleConfirmRoute = async () => {
    if (!startPoint || !destination) {
      setPathError('Choose both start and destination nodes.');
      return;
    }
    if (!campusId) {
      setPathError('Set VITE_DEFAULT_CAMPUS_ID to enable routing.');
      return;
    }

    setIsPathLoading(true);
    setPathError(null);
    const fallbackPath: PathfindingResponse = {
      nodes: [
        {
          id: startPoint.id,
          name: startPoint.name,
          building_id: startPoint.building_id,
          floor_id: startPoint.floor_id,
          x: startPoint.x,
          y: startPoint.y,
        },
        {
          id: destination.id,
          name: destination.name,
          building_id: destination.building_id,
          floor_id: destination.floor_id,
          x: destination.x,
          y: destination.y,
        },
      ],
      edges: [
        {
          from_node_id: startPoint.id,
          to_node_id: destination.id,
        },
      ],
    };

    try {
      const result = await fetchPathfinding(
        campusId,
        startPoint.id,
        destination.id,
        routePreference
      );
      setPathResult(result);
      setCurrentStep(0);
      setCurrentPage('navigationPreview');
      setDestMarker(null);
    } catch (error) {
      // Fallback to a simple 2-point path so the UI keeps working offline / without the API.
      setPathResult(fallbackPath);
      setCurrentStep(0);
      setCurrentPage('navigationPreview');
      setDestMarker(null);
      setPathError(
        error instanceof Error
          ? `${error.message} (using fallback straight path)`
          : 'Pathfinding failed (using fallback straight path)'
      );
    } finally {
      setIsPathLoading(false);
    }
  };

  /**
   * Start navigation from preview
   * Resets step counter
   * Switches to step navigation page
   */
  const handleStartNavigation = () => {
    if (!pathResult) {
      setPathError('Run pathfinding before starting navigation.');
      setCurrentPage('routeSetting');
      return;
    }
    setCurrentStep(0);
    setCurrentPage('stepNavigation');
  };

  /**
   * Open indoor map for a selected building
   * Switches to indoor map page
   */
  const handleOpenIndoorMap = (building: Building) => {
    setSelectedBuilding(building);
    setCurrentPage('indoorMap');
  };

  /**
   * Go back to home page
   * Clears selected building
   */
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedBuilding(null);
    setPathResult(null);
    updateStartPoint(null);
    updateDestination(null);
  };

  // Simple in-memory cache for search results
  const searchCache = useRef<Map<string, MapNode[]>>(new Map());
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  const cacheTimestamps = useRef<Map<string, number>>(new Map());

  const searchNodesForCampus = useCallback(
    async (keyword: string) => {
      console.log('🔍 searchNodesForCampus called:', { keyword, campusId: campusId || 'NOT SET' });
      
      if (!campusId) {
        console.warn('⚠️ No campusId, returning empty results');
        return [];
      }
      
      const trimmed = keyword.trim().toLowerCase();
      if (!trimmed) {
        console.warn('⚠️ Empty keyword after trim, returning empty results');
        return [];
      }
      
      // Check cache first
      const cacheKey = `${campusId}:${trimmed}`;
      const cached = searchCache.current.get(cacheKey);
      const cacheTime = cacheTimestamps.current.get(cacheKey);
      if (cached && cacheTime && Date.now() - cacheTime < CACHE_TTL) {
        console.log('✅ Using cached results for:', cacheKey);
        return cached;
      }
      
      console.log('🔍 Cache miss, calling API for:', trimmed);
      
      // Improved search term normalization for queries like "L building gate no 2"
      let searchTerm = trimmed;
      
      // Normalize common patterns:
      // "L building gate no 2" -> "L gate 2" or "L gate no 2"
      // "L block gate 2" -> "L gate 2"
      const buildingPattern = /\b(block|building|blk|bldg)\b/gi;
      const hasBuildingWord = buildingPattern.test(trimmed);
      
      if (hasBuildingWord) {
        // Remove building words but keep the rest
        searchTerm = trimmed.replace(buildingPattern, '').trim();
        // Also try without "no" for gate numbers
        searchTerm = searchTerm.replace(/\bno\s+/gi, '').trim();
      }
      
      // Try multiple search strategies
      const searchTerms = [searchTerm];
      if (searchTerm !== trimmed) {
        searchTerms.push(trimmed); // Also try original
      }
      
      try {
        console.log('🌐 Calling searchBuildingsAndNodes with:', { campusId, searchTerm });
        // Try the normalized term first
        let res = await searchBuildingsAndNodes(campusId, searchTerm);
        console.log('📥 searchBuildingsAndNodes response:', { resultCount: res.results?.length || 0 });
        
        // If no results, try original term
        if (res.results.length === 0 && searchTerm !== trimmed) {
          console.log('🔄 No results with normalized term, trying original:', trimmed);
          res = await searchBuildingsAndNodes(campusId, trimmed);
          console.log('📥 Second searchBuildingsAndNodes response:', { resultCount: res.results?.length || 0 });
        }
        
        // Map results
        const results = res.results.map((item) => ({
          id: item.id,
          name: item.name,
          building_id: item.building_id,
          floor_id: item.floor_id,
          func_type: item.func_type,
          type: item.type,
        }));
        
        console.log('✅ Mapped results:', { count: results.length });
        
        // Cache the results
        if (results.length > 0) {
          searchCache.current.set(cacheKey, results);
          cacheTimestamps.current.set(cacheKey, Date.now());
        }
        
        return results;
      } catch (error) {
        console.error('❌ Search API error:', error);
        console.error('❌ Error details:', {
          message: error instanceof Error ? error.message : String(error),
          name: error instanceof Error ? error.name : typeof error
        });
        // If API fails and we have local POI index, use it as fallback
        if (poiIndex) {
          console.log('🔄 Using local POI fallback');
          const local = searchPois(poiIndex, keyword);
          return local;
        }
        return [];
      }
    },
    [campusId, poiIndex]
  );

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="relative w-full h-screen overflow-hidden bg-white dark:bg-gray-900 transition-colors">
        <div className="relative w-full max-w-[393px] h-full max-h-[852px] mx-auto bg-white dark:bg-gray-900 transition-colors">
          {(currentPage === 'home' || currentPage === 'routeSetting' || menuOpen) && (
            <>
              <Homepage 
                onMenuClick={() => setMenuOpen(true)}
                onBuildingClick={handleBuildingClick}
                onFloatingButtonClick={handleStartRoute}
                userLocation={userSvg}
                campusId={campusId}
                onSearch={async (keyword: string) => {
                  const results = await searchNodesForCampus(keyword);
                  return results.map((item) => ({
                    id: item.id,
                    name: item.name || '',
                    type: (item.type === 'building' ? 'building' : 'node') as 'building' | 'node',
                  }));
                }}
              />
              {selectedBuilding && currentPage === 'home' && !menuOpen && (
                <BuildingInfoPanel
                  building={selectedBuilding}
                  language={language}
                  theme={theme}
                  routePreference={routePreference}
                  onClose={() => setSelectedBuilding(null)}
                  onStartRoute={() => handleStartRouteFromBuilding(selectedBuilding)}
                  onOpenIndoorMap={() => handleOpenIndoorMap(selectedBuilding)}
                  onRoutePreferenceChange={setRoutePreference}
                />
              )}
            </>
          )}

          {currentPage === 'routeSetting' && (
          <RouteSetting
            language={language}
            theme={theme}
            startPoint={startPoint}
            destination={destination}
            routePreference={routePreference}
            onBack={handleBackToHome}
            onStartPointChange={updateStartPoint}
            onDestinationChange={(node) => {
              updateDestination(node);
              setDestMarker(node?.x != null && node?.y != null ? { x: node.x as number, y: node.y as number } : null);
            }}
            onRoutePreferenceChange={setRoutePreference}
            onConfirm={handleConfirmRoute}
            onSearchNodes={searchNodesForCampus}
          />
          )}

          {currentPage === 'navigationPreview' && (
            <NavigationPreview
              language={language}
              theme={theme}
              campusId={campusId}
              startPoint={startPoint}
              destination={destination}
              routePreference={routePreference}
              path={pathResult}
              isLoading={isPathLoading}
              error={pathError}
              onBack={() => setCurrentPage('routeSetting')}
              onStart={handleStartNavigation}
              userSvg={userSvg}
              destMarker={destMarker}
            />
          )}

          {currentPage === 'stepNavigation' && (
            <ErrorBoundary
              fallback={
                <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                  <div className="text-center px-4">
                    <h2 className="text-xl font-bold text-red-500 mb-4">Navigation Error</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Failed to load navigation. Please try again.
                    </p>
                    <button
                      onClick={handleBackToHome}
                      className="px-6 py-3 bg-[#ff5a5a] text-white rounded-lg font-semibold hover:bg-[#ff4040] transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              }
            >
              <StepNavigation
                language={language}
                theme={theme}
                startPoint={startPoint}
                destination={destination}
                routePreference={routePreference}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                onBack={handleBackToHome}
                path={pathResult}
                campusId={campusId}
              />
            </ErrorBoundary>
          )}

          {currentPage === 'indoorMap' && (
            <IndoorMap
              language={language}
              theme={theme}
              building={selectedBuilding}
              onBack={handleBackToHome}
            />
          )}

          {menuOpen && (
            <MenuSidebar
              language={language}
              theme={theme}
              onClose={() => setMenuOpen(false)}
              onLanguageChange={() => {
                setLanguage(
                  language === 'en' ? 'zh' : language === 'zh' ? 'mi' : 'en'
                );
              }}
              onThemeChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              onBuildingSelect={(buildingId) => {
                handleBackToHome();
                handleBuildingClick(buildingId);
                setMenuOpen(false);
              }}
              buildings={buildings}
              isLoadingBuildings={isLoadingBuildings}
            />
          )}
        </div>
      </div>
    </div>
  );
}
