import { X, Navigation, MapPin } from 'lucide-react';
import { Building, Language, RoutePreference } from '../App';

interface BuildingBarProps {
  building: Building;
  language: Language;
  routePreference: RoutePreference;
  onClose: () => void;
  onStartRoute: () => void;
  onOpenIndoorMap: () => void;
  onRoutePreferenceChange: (pref: RoutePreference) => void;
}

export default function BuildingBar({
  building,
  language,
  routePreference,
  onClose,
  onStartRoute,
  onOpenIndoorMap,
  onRoutePreferenceChange,
}: BuildingBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.15)] z-30 animate-slide-up">
      {/* Drag Handle */}
      <div className="flex justify-center pt-2 pb-3">
        <div className="w-14 h-0.5 bg-[#cccccc] dark:bg-gray-600 rounded-full" />
      </div>

      <div className="px-4 pb-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-3 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X className="size-6 text-black dark:text-white" />
        </button>

        {/* Building Name - Centered */}
        <div className="text-center mb-6 mt-2">
          <h2 className="text-black dark:text-white">
            {language === 'en' ? building.name : building.nameCN}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Description
          </p>
        </div>

        {/* Indoor Map Button - Top Right */}
        {building.hasIndoorMap && (
          <button
            onClick={onOpenIndoorMap}
            className="absolute right-4 top-4 px-3 py-2 bg-[#ff5a5a]/15 hover:bg-[#ff5a5a]/25 rounded-lg transition-colors"
          >
            <span className="text-[#ff5a5a] dark:text-[#ff5a5a] font-semibold">
              {language === 'en' ? 'Indoor Map' : '室内地图'}
            </span>
          </button>
        )}

        {/* Action Buttons Row */}
        <div className="flex gap-3">
          {/* Start Button */}
          <button
            onClick={onStartRoute}
            className="flex-1 bg-[#ff5a5a] hover:bg-[#ff4040] text-white py-3.5 rounded-[14px] transition-colors flex flex-col items-center justify-center gap-0.5"
          >
            <Navigation className="size-6" />
            <span className="text-[13px] font-semibold">
              {language === 'en' ? 'Start' : '开始'}
            </span>
          </button>

          {/* Avoid Stairs Checkbox */}
          <button
            onClick={() => onRoutePreferenceChange({
              ...routePreference,
              avoidStairs: !routePreference.avoidStairs,
            })}
            className="bg-[#ff5a5a] hover:bg-[#ff4040] text-white px-4 py-3.5 rounded-[14px] transition-colors flex items-center gap-2"
          >
            <div className={`w-[22px] h-[22px] rounded-md border-2 border-white bg-white flex items-center justify-center ${routePreference.avoidStairs ? 'bg-white' : ''}`}>
              {routePreference.avoidStairs && (
                <div className="w-3 h-3 bg-[#ff5a5a] rounded-sm" />
              )}
            </div>
            <span className="text-[16px]">
              {language === 'en' ? 'Avoid stairs' : '避开楼梯'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}