import { useEffect, useState } from 'react';
import { ArrowLeft, Search, ArrowUpDown, Navigation, MapPin, Loader2 } from 'lucide-react';
import { Language, Theme, RoutePreference, MapNode } from '../App';

interface RouteSettingProps {
  language: Language;
  theme: Theme;
  startPoint: MapNode | null;
  destination: MapNode | null;
  routePreference: RoutePreference;
  onBack: () => void;
  onStartPointChange: (node: MapNode | null) => void;
  onDestinationChange: (node: MapNode | null) => void;
  onRoutePreferenceChange: (preference: RoutePreference) => void;
  onConfirm: () => void;
  onSearchNodes: (keyword: string) => Promise<MapNode[]>;
}

export default function RouteSetting({
  language,
  theme,
  startPoint,
  destination,
  routePreference,
  onBack,
  onStartPointChange,
  onDestinationChange,
  onRoutePreferenceChange,
  onConfirm,
  onSearchNodes,
}: RouteSettingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeField, setActiveField] = useState<'start' | 'destination' | null>(null);
  const [searchResults, setSearchResults] = useState<MapNode[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeField) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }
    
    const keyword = searchQuery.trim();
    if (!keyword) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    let cancelled = false;
    
    // Debounce search - wait 400ms after user stops typing
    const debounceTimeout = setTimeout(() => {
      if (cancelled) return;
      
      setIsSearching(true);
      setSearchError(null);

      // Add timeout protection
      const searchTimeout = setTimeout(() => {
        if (!cancelled) {
          setIsSearching(false);
          setSearchError('Search timed out. Please try again.');
        }
      }, 8000); // 8 second timeout

      onSearchNodes(keyword)
        .then((nodes) => {
          clearTimeout(searchTimeout);
          if (!cancelled) {
            setSearchResults(nodes);
            setIsSearching(false);
            setSearchError(null);
          }
        })
        .catch((error) => {
          clearTimeout(searchTimeout);
          if (!cancelled) {
            setSearchError(error instanceof Error ? error.message : 'Search failed');
            setIsSearching(false);
            setSearchResults([]);
          }
        });
    }, 400); // 400ms debounce

    return () => {
      cancelled = true;
      clearTimeout(debounceTimeout);
    };
  }, [activeField, onSearchNodes, searchQuery]);

  const handleSwap = () => {
    const temp = startPoint;
    onStartPointChange(destination);
    onDestinationChange(temp);
  };

  const handleNodeSelect = (node: MapNode) => {
    if (activeField === 'start') {
      onStartPointChange(node);
    } else if (activeField === 'destination') {
      onDestinationChange(node);
    }
    setActiveField(null);
    setSearchQuery('');
  };

  const handlePreferenceChange = (key: keyof RoutePreference) => (checked: boolean) => {
    onRoutePreferenceChange({
      ...routePreference,
      [key]: checked,
    });
  };

  return (
    <div className="absolute inset-0 z-50">
      {/* Backdrop 遮罩层 */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onBack}
      />

      {/* Map Preview - 保留顶部的地图缩略图 */}
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none" />

      {/* Bottom Panel - 重新设计的底部面板 */}
      <div className="absolute left-0 bottom-0 w-[393px] bg-white dark:bg-gray-800 rounded-t-[24px] shadow-[0_-4px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.4)] animate-slide-up">
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pb-4 flex items-center justify-between relative z-20">
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative z-30"
          >
            <ArrowLeft className="size-5 text-black dark:text-white" />
          </button>
          <h2 className="font-['Inter:Bold',sans-serif] text-[18px] text-black dark:text-white">
            {language === 'en' ? 'Plan Route' : '规划路线'}
          </h2>
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>

        {/* Route Inputs Container */}
        <div className="px-6 pb-6">
          <div className="relative bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 space-y-3">
            {/* Starting Point */}
            <button
              onClick={() => setActiveField('start')}
              className="w-full flex items-center gap-3 bg-white dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
            >
              <div className="flex-shrink-0 w-3 h-3 rounded-full border-2 border-[#ff5a5a] bg-white dark:bg-gray-800" />
              <div className="flex-1 text-left">
                <div className="text-[12px] text-gray-500 dark:text-gray-400 mb-0.5">
                  {language === 'en' ? 'From' : '起点'}
                </div>
                <div className="text-[16px] text-black dark:text-white font-['Inter:Semi_Bold',sans-serif]">
                  {startPoint
                    ? startPoint.name
                    : language === 'en'
                    ? 'Your Location'
                    : '我的位置'}
                </div>
              </div>
            </button>

            {/* Swap Button */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                onClick={handleSwap}
                className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all border border-gray-200 dark:border-gray-600"
              >
                <ArrowUpDown className="size-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Destination */}
            <button
              onClick={() => setActiveField('destination')}
              className="w-full flex items-center gap-3 bg-white dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
            >
              <MapPin className="flex-shrink-0 size-5 text-[#FF5A5A]" fill="#FF5A5A" />
              <div className="flex-1 text-left">
                <div className="text-[12px] text-gray-500 dark:text-gray-400 mb-0.5">
                  {language === 'en' ? 'To' : '终点'}
                </div>
                <div className="text-[16px] text-black dark:text-white font-['Inter:Semi_Bold',sans-serif]">
                  {destination
                    ? destination.name
                    : language === 'en'
                    ? 'Choose destination'
                    : '选择目的地'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Route preferences */}
        {!activeField && (
          <div className="px-6 pb-4 space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-3 hover:border-[#ff5a5a] transition-colors">
                <input
                  type="checkbox"
                  checked={routePreference.avoidStairs}
                  onChange={(e) => handlePreferenceChange('avoidStairs')(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#ff5a5a] focus:ring-[#ff5a5a]"
                />
                <div>
                  <p className="text-sm text-black dark:text-white font-semibold">
                    {language === 'en' ? 'Avoid stairs' : '避免楼梯'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Choose lifts/ramps when possible' : '尽量选择电梯或坡道'}
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-3 hover:border-[#ff5a5a] transition-colors">
                <input
                  type="checkbox"
                  checked={routePreference.preferAccessible}
                  onChange={(e) => handlePreferenceChange('preferAccessible')(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#ff5a5a] focus:ring-[#ff5a5a]"
                />
                <div>
                  <p className="text-sm text-black dark:text-white font-semibold">
                    {language === 'en' ? 'Accessible route' : '无障碍优先'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Elevators, ramps, and gentle slopes' : '优先电梯、坡道和缓坡'}
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-3 hover:border-[#ff5a5a] transition-colors">
                <input
                  type="checkbox"
                  checked={routePreference.preferWellLit}
                  onChange={(e) => handlePreferenceChange('preferWellLit')(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#ff5a5a] focus:ring-[#ff5a5a]"
                />
                <div>
                  <p className="text-sm text-black dark:text-white font-semibold">
                    {language === 'en' ? 'Well-lit paths' : '优先光线充足'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Favour routes with lighting at night' : '夜间优先有照明的路线'}
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-3 hover:border-[#ff5a5a] transition-colors">
                <input
                  type="checkbox"
                  checked={routePreference.indoorNavigation}
                  onChange={(e) => handlePreferenceChange('indoorNavigation')(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#ff5a5a] focus:ring-[#ff5a5a]"
                />
                <div>
                  <p className="text-sm text-black dark:text-white font-semibold">
                    {language === 'en' ? 'Prefer indoor route' : '优先室内路线'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === 'en' ? 'Stay indoors when buildings allow' : '尽量在建筑物内行进'}
                  </p>
                </div>
              </label>
            </div>

            {(routePreference.avoidStairs ||
              routePreference.preferAccessible ||
              routePreference.preferWellLit ||
              routePreference.indoorNavigation) && (
              <div className="flex flex-wrap gap-2 pt-1">
                {routePreference.avoidStairs && (
                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/40 text-[#ff5a5a]">
                    {language === 'en' ? 'No stairs' : '避开楼梯'}
                  </span>
                )}
                {routePreference.preferAccessible && (
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    {language === 'en' ? 'Accessible' : '无障碍'}
                  </span>
                )}
                {routePreference.preferWellLit && (
                  <span className="px-3 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                    {language === 'en' ? 'Well lit' : '照明优先'}
                  </span>
                )}
                {routePreference.indoorNavigation && (
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                    {language === 'en' ? 'Indoor' : '室内'}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Start Button - 当选择了目的地后显示 */}
        {!activeField && destination && (
          <div className="px-6 pb-8">
            <button
              onClick={onConfirm}
              className="w-full flex items-center justify-center gap-2 bg-[#FF5A5A] hover:bg-[#ff4040] text-white py-4 rounded-full transition-all shadow-lg hover:shadow-xl font-['Inter:Semi_Bold',sans-serif]"
            >
              <Navigation className="size-5" />
              <span className="text-[16px]">{language === 'en' ? 'Start Navigation' : '开始导航'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Results Panel - 当点击输入框时显示 */}
      {activeField && (
        <div className="absolute left-0 bottom-0 w-[393px] h-[500px] bg-white dark:bg-gray-800 rounded-t-[24px] shadow-2xl z-60 animate-slide-up">
          <div className="flex justify-center pt-3 pb-4">
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
          
          <div className="px-6">
            {/* Search Header */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setActiveField(null)}
                className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="size-5 text-black dark:text-white" />
              </button>
              <h3 className="text-[16px] text-black dark:text-white font-['Inter:Semi_Bold',sans-serif]">
                {activeField === 'start'
                  ? language === 'en' ? 'Choose starting point' : '选择起点'
                  : language === 'en' ? 'Choose destination' : '选择目的地'}
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search locations...' : '搜索地点...'}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-black dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#FF5A5A] transition-all"
                autoFocus
              />
            </div>

            {/* Search List */}
            <div className="space-y-1 max-h-[320px] overflow-y-auto">
              {searchError && (
                <div className="text-sm text-red-500 px-2 py-2">
                  {searchError}
                </div>
              )}

              {isSearching && (
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 px-2 py-2">
                  <Loader2 className="size-4 animate-spin" />
                  <span>{language === 'en' ? 'Searching…' : '搜索中…'}</span>
                </div>
              )}

              {!isSearching && searchResults.length === 0 && !searchError && (
                <div className="text-sm text-gray-500 dark:text-gray-400 px-2 py-2">
                  {language === 'en' ? 'Type to search nodes' : '输入关键字搜索节点'}
                </div>
              )}

              {searchResults.map((node) => (
                <button
                  key={node.id}
                  onClick={() => handleNodeSelect(node)}
                  className="w-full text-left p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="size-5 text-gray-400 group-hover:text-[#FF5A5A] transition-colors" />
                    <div>
                      <div className="text-[15px] text-black dark:text-white font-['Inter:Medium',sans-serif]">
                        {node.name}
                      </div>
                      <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">
                        {node.building_id ? `${node.building_id}` : ''}
                        {node.floor_id ? ` · ${node.floor_id}` : ''}
                        {node.func_type ? ` · ${node.func_type}` : ''}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
