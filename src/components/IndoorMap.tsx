import { ArrowLeft, ZoomIn, ZoomOut, Search, MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';
import { Building, Language, Theme } from '../App';
import svgPaths from "../imports/svg-thjg8xekjb";
import imgIndoorMap from "figma:asset/46c55aef4864e0dd5a25689ecf3745917d8c6dcb.png";

interface IndoorMapProps {
  language: Language;
  theme: Theme;
  building: Building | null;
  onBack: () => void;
}

export default function IndoorMap({ language, theme, building, onBack }: IndoorMapProps) {
  const [currentFloor, setCurrentFloor] = useState('Ground');
  const [zoom, setZoom] = useState(1);
  const floors = ['Ground', 'L1', 'L2', 'L3'];

  const buildingName = building ? (language === 'en' ? building.name : building.nameCN) : 'G Block';

  return (
    <div className="relative w-full h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Status Bar */}
      <div className="bg-[#353535] h-[44px] overflow-clip pointer-events-auto sticky top-0 w-full z-50">
        <div className="absolute h-[21px] left-[24px] rounded-[24px] top-[12px] w-[54px]">
          <p className="absolute font-['SF_Pro_Text:Semibold',sans-serif] h-[20px] leading-[20px] left-[27px] not-italic text-[15px] text-center text-white top-px tracking-[-0.5px] translate-x-[-50%] w-[54px]">9:41</p>
        </div>
      </div>

      {/* Modern Top Bar */}
      <div className="absolute top-[44px] left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative z-50"
          >
            <ArrowLeft className="size-5 text-black dark:text-white" strokeWidth={2.5} />
          </button>

          {/* Building Info */}
          <div className="flex flex-col items-center">
            <h1 className="font-semibold text-black dark:text-white">
              {buildingName}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Indoor Navigation' : '室内导航'}
            </p>
          </div>

          {/* Info Button */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
            <Search className="size-5 text-black dark:text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Map Container with Modern Design */}
      <div className="absolute top-[104px] left-4 right-4 bottom-24 bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Floor Selector - Modern Pills */}
        <div className="absolute top-4 left-4 right-4 z-30 flex gap-2">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setCurrentFloor(floor)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                currentFloor === floor
                  ? 'bg-[#ff5a5a] text-white shadow-lg shadow-[#ff5a5a]/30 scale-105'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Map Image with Route */}
        <div className="relative w-full h-full pt-16">
          {/* Indoor Map Image */}
          <div 
            className="absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}
          >
            <img 
              alt="Indoor Map" 
              className="w-full h-full object-contain pointer-events-none" 
              src={imgIndoorMap} 
            />
            
            {/* Navigation Route Overlay */}
            <div className="absolute h-[81.35px] left-[calc(50%+8.89px)] top-[calc(50%+200px)] w-[115.859px] pointer-events-none">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 124 90">
                <path d={svgPaths.p12fa4000} stroke="#ff5a5a" strokeLinecap="round" strokeWidth="8" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info Card - Floating */}
        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-[#ff5a5a] to-[#ff7a7a] rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <MapPin className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  {language === 'en' ? 'Current Floor' : '当前楼层'}
                </p>
                <p className="text-xs opacity-90">
                  {currentFloor} • {language === 'en' ? '24 rooms' : '24个房间'}
                </p>
              </div>
            </div>
            <button className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Navigation className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Zoom Controls - Right Side */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-1 p-2">
          <button 
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <ZoomIn className="size-6 text-black dark:text-white" strokeWidth={2.5} />
          </button>
          <div className="h-px w-full bg-gray-200 dark:bg-gray-600 mx-auto" />
          <button 
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <ZoomOut className="size-6 text-black dark:text-white" strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Zoom Level Indicator */}
        <div className="mt-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg px-3 py-2 text-center">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
            {Math.round(zoom * 100)}%
          </p>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 flex justify-center w-full pointer-events-none">
        <div className="w-[134px] h-[5px] bg-black dark:bg-white rounded-full" />
      </div>
    </div>
  );
}