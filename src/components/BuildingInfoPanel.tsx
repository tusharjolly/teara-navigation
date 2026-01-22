import { X, MapPin, Navigation } from 'lucide-react';
import { Building, Language, Theme, RoutePreference } from '../App';

// ============================================================================
// INTERFACE
// ============================================================================

interface BuildingInfoPanelProps {
  building: Building;
  language: Language;
  theme: Theme;
  routePreference: RoutePreference;
  onClose: () => void;
  onOpenIndoorMap: () => void;
  onStartRoute: () => void;
  onRoutePreferenceChange: (preference: RoutePreference) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function BuildingInfoPanel({ 
  building, 
  language, 
  onClose, 
  onOpenIndoorMap,
  onStartRoute
}: BuildingInfoPanelProps) {
  // Get building name based on language
  const buildingName = language === 'en' ? building.name : building.nameCN;
  
  console.log('Building Info Panel:', building.name, 'hasIndoorMap:', building.hasIndoorMap);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Panel - Bigger Mobile Size */}
      <div className="absolute bottom-0 left-0 right-0 z-50 animate-slide-up">
        {/* White Background with rounded top */}
        <div className="bg-white dark:bg-gray-800 rounded-t-[20px] shadow-2xl">
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-14 h-[3px] bg-[#cccccc] dark:bg-gray-600 rounded-full" />
          </div>

          {/* Header with Close Button */}
          <div className="flex items-center justify-between px-4 pb-4 relative z-10">
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-1.5 -ml-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative z-20"
            >
              <X className="size-6 text-gray-700 dark:text-gray-300" strokeWidth={2.5} />
            </button>

            {/* Building Name */}
            <h2 className="text-[22px] font-normal text-black dark:text-white flex-1 text-center -ml-8">
              {buildingName}
            </h2>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-6 space-y-3">
            <button
              onClick={building.hasIndoorMap ? onOpenIndoorMap : undefined}
              disabled={!building.hasIndoorMap}
              className={`w-full rounded-2xl py-4 px-6 transition-all ${
                building.hasIndoorMap
                  ? 'bg-[#ff5a5a] hover:bg-[#ff4545] active:bg-[#ff3030] active:scale-95 text-white shadow-lg shadow-[#ff5a5a]/25'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <MapPin className="size-5" strokeWidth={2.5} />
                <span className="text-[16px] font-semibold">
                  {language === 'en' ? 'View Indoor Map' : '查看室内地图'}
                </span>
              </div>
            </button>

            <button
              onClick={onStartRoute}
              className="w-full bg-white dark:bg-gray-700 border-2 border-[#ff5a5a] text-[#ff5a5a] dark:text-[#ff7a7a] rounded-2xl py-4 px-6 transition-all active:scale-95"
            >
              <div className="flex items-center justify-center gap-3">
                <Navigation className="size-5" strokeWidth={2.5} />
                <span className="text-[16px] font-semibold">
                  {language === 'en' ? 'Start Navigation' : '开始导航'}
                </span>
              </div>
            </button>
          </div>

          {/* Home Indicator */}
          <div className="pb-2 flex justify-center">
            <div className="w-[134px] h-[5px] bg-black dark:bg-white rounded-full" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}