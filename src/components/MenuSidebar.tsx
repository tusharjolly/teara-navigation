import { useState } from 'react';
import { X, ChevronDown, ChevronUp, ChevronRight, Search, MapPin, Moon, Globe, Check } from 'lucide-react';
import { Language, Theme } from '../App';
import svgPaths from "../imports/svg-jr9ok6g6l3";
import { imgGroup } from "../imports/svg-je40q";

interface MenuSidebarProps {
  language: Language;
  theme: Theme;
  onClose: () => void;
  onLanguageChange: () => void;
  onThemeChange: () => void;
  onBuildingSelect: (buildingId: string) => void;
}

export default function MenuSidebar({
  language,
  theme,
  onClose,
  onLanguageChange,
  onThemeChange,
  onBuildingSelect,
}: MenuSidebarProps) {
  const [showLanguagePanel, setShowLanguagePanel] = useState(false);
  const [showBuildingsList, setShowBuildingsList] = useState(false);

  const handleLanguageClick = () => {
    setShowLanguagePanel(!showLanguagePanel);
  };

  const handleLanguageSelect = (lang: Language) => {
    if (lang !== language) {
      onLanguageChange();
    }
    setShowLanguagePanel(false);
  };

  const handleThemeToggle = () => {
    console.log('Theme toggle clicked, current theme:', theme);
    onThemeChange();
  };

  // Helper function for translations
  const t = (en: string, zh: string, mi: string) => {
    if (language === 'zh') return zh;
    if (language === 'mi') return mi;
    return en;
  };

  const buildings = [
    { id: 'g-block', nameEN: 'G Block', nameCN: 'G座', nameMI: 'Whare G' },
    { id: 'l-block', nameEN: 'L Block', nameCN: 'L座', nameMI: 'Whare L' },
    { id: 'the-pa', nameEN: 'The Pā', nameCN: 'The Pā', nameMI: 'Te Pā' },
    { id: 'student-centre', nameEN: 'Student Centre', nameCN: '学生中心', nameMI: 'Pokapū Ākonga' },
  ];

  return (
    <div className="absolute inset-0 z-50 flex animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="relative w-[305px] h-full bg-white dark:bg-gray-800 shadow-2xl flex flex-col animate-slide-in-left z-10">
        {/* Close Button & Logo */}
        <div className="px-4 pt-6 pb-4 relative z-20">
          <div className="flex items-start gap-3">
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors relative z-30"
            >
              <X className="size-7 text-black dark:text-white" />
            </button>

            {/* University Logo */}
            <div className="h-[29.33px] w-[97.38px] relative mt-1 bg-white dark:bg-gray-100 rounded-md px-1 shadow-sm">
              <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat" style={{ maskImage: `url('${imgGroup}')` }}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 30">
                  <g>
                    <path clipRule="evenodd" d={svgPaths.p34b9a900} fill="#FFA400" fillRule="evenodd" />
                    <path d={svgPaths.p140d5400} fill="#231F20" />
                    <path clipRule="evenodd" d={svgPaths.p3b84c200} fill="#231F20" fillRule="evenodd" />
                    <path d={svgPaths.p1f622380} fill="#231F20" />
                    <path d={svgPaths.pb88bd00} fill="#231F20" />
                    <path d={svgPaths.p1b120e00} fill="#231F20" />
                    <path clipRule="evenodd" d={svgPaths.p10070680} fill="#231F20" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p36958780} fill="#231F20" fillRule="evenodd" />
                    <path d={svgPaths.p394b1740} fill="#231F20" />
                    <path clipRule="evenodd" d={svgPaths.p23c71200} fill="#231F20" fillRule="evenodd" />
                    <path d={svgPaths.pb99c600} fill="#231F20" />
                    <path clipRule="evenodd" d={svgPaths.p5943200} fill="#231F20" fillRule="evenodd" />
                    <path d={svgPaths.p11a93b00} fill="#231F20" />
                    <path d={svgPaths.p17408d10} fill="#FFA400" />
                    <path d={svgPaths.p2f766f20} fill="#231F20" />
                    <path clipRule="evenodd" d={svgPaths.pf577500} fill="#231F20" fillRule="evenodd" />
                    <path d={svgPaths.p23038100} fill="#E1251B" />
                    <path d={svgPaths.p2d711f80} fill="#E1251B" />
                    <path d={svgPaths.p2f65f80} fill="#E1251B" />
                    <path d={svgPaths.p18fbc3a0} fill="#E1251B" />
                    <path d={svgPaths.p15d11180} fill="#E1251B" />
                    <path d={svgPaths.p553b4f0} fill="#E1251B" />
                    <path d={svgPaths.p2cf69600} fill="#E1251B" />
                    <path d={svgPaths.p8c2ee00} fill="#E1251B" />
                    <path d={svgPaths.p3fada300} fill="#E1251B" />
                    <path d={svgPaths.p17647b00} fill="#E1251B" />
                    <path d={svgPaths.p19ded6f0} fill="#E1251B" />
                    <path d={svgPaths.p32d36200} fill="#E1251B" />
                    <path d={svgPaths.p18933680} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p17ffd00} fill="#FFA400" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p31290c00} fill="#FFA400" fillRule="evenodd" />
                    <path d={svgPaths.p159c3b00} fill="#E1251B" />
                    <path d={svgPaths.p3b701680} fill="#231F20" />
                    <path clipRule="evenodd" d={svgPaths.p12ef9d00} fill="#FFA400" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p27c21c00} fill="white" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p12d4e00} fill="#231F20" fillRule="evenodd" />
                    <path d={svgPaths.p29fe9870} fill="black" />
                    <path d={svgPaths.p4c9e6c0} fill="black" />
                    <path d={svgPaths.p9f80700} fill="black" />
                    <path d={svgPaths.p1a01ab00} fill="black" />
                    <path d={svgPaths.p275928f0} fill="black" />
                    <path d={svgPaths.p299f4580} fill="black" />
                    <path d={svgPaths.p5323500} fill="black" />
                    <path d={svgPaths.p1a327380} fill="black" />
                    <path clipRule="evenodd" d={svgPaths.p27657b00} fill="black" fillRule="evenodd" />
                    <path d={svgPaths.p17ebad00} fill="black" />
                    <path d={svgPaths.pa328000} fill="black" />
                    <path d={svgPaths.p6ca5540} fill="black" />
                    <path d={svgPaths.p3d5d7ff0} fill="black" />
                    <path clipRule="evenodd" d={svgPaths.p2158700} fill="black" fillRule="evenodd" />
                    <path d={svgPaths.p107ba0f0} fill="black" />
                    <path clipRule="evenodd" d={svgPaths.p3805a680} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p355ee600} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p2e8f7f00} fill="#E1251B" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p1cfb4600} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p3f41e50} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p1b822100} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p1a47a800} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p167b4500} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p38cb7d80} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p2ae2c00} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p15306f00} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p20d4d600} fill="#E1251B" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p3bb86200} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p35cdb80} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p153ee700} fill="#E1251B" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p7533900} fill="#E1251B" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p1f17cc80} fill="#E1251B" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p16884600} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p1fb3af00} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p25785b00} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p2830cef0} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p148b19e0} fill="#E1251B" fillRule="evenodd" />
                    <path d={svgPaths.p284254f0} fill="#E1251B" />
                    <path clipRule="evenodd" d={svgPaths.p2a588e80} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p29fa0880} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p3321b100} fill="black" fillRule="evenodd" />
                    <path clipRule="evenodd" d={svgPaths.p2006f000} fill="black" fillRule="evenodd" />
                    <path d={svgPaths.p3d2dbf00} fill="black" />
                    <path d={svgPaths.p2287e880} fill="black" />
                    <path d={svgPaths.p14af9a80} fill="black" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-5 pt-8">
          <div className="space-y-0">
            {/* Dark Mode */}
            <button
              onClick={handleThemeToggle}
              className="w-full flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Moon className="size-6 text-black dark:text-white" />
                <span className="text-black dark:text-white text-xl font-bold">
                  {t('Dark Mode', '深色模式', 'Aratau Pōuri')}
                </span>
              </div>
              {/* Toggle Switch */}
              <div className="relative w-10 h-6 bg-[#D9D9D9] dark:bg-gray-600 rounded-full pointer-events-none">
                <div className={`absolute top-[2px] ${theme === 'dark' ? 'left-[18px]' : 'left-[2px]'} w-5 h-5 bg-[#474242] dark:bg-white rounded-full transition-all duration-200`} />
              </div>
            </button>

            {/* Language */}
            <div className="relative">
              <button
                onClick={handleLanguageClick}
                className="w-full flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Globe className="size-6 text-black dark:text-white" />
                  <span className="text-black dark:text-white text-xl font-bold">
                    {t('Language', '语言', 'Reo')}
                  </span>
                </div>
                <ChevronRight className={`size-4 text-black dark:text-white transition-transform ${showLanguagePanel ? 'rotate-90' : ''}`} strokeWidth={4} />
              </button>

              {/* Language Selection Panel */}
              {showLanguagePanel && (
                <div className="absolute left-[66px] top-[75px] w-[173px] bg-[#f6f6f6] dark:bg-gray-700 rounded-[20px] px-4 py-2 shadow-lg z-10">
                  <button
                    onClick={() => handleLanguageSelect('en')}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      language === 'en' ? 'text-[#ff5a5a]' : 'text-black dark:text-white'
                    }`}
                  >
                    <span className="text-xl font-bold">English</span>
                    {language === 'en' && (
                      <Check className="size-6 text-[#ff5a5a]" strokeWidth={3} />
                    )}
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('zh')}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      language === 'zh' ? 'text-[#ff5a5a]' : 'text-black dark:text-white'
                    }`}
                  >
                    <span className="text-xl font-bold">Chinese</span>
                    {language === 'zh' && (
                      <Check className="size-6 text-[#ff5a5a]" strokeWidth={3} />
                    )}
                  </button>
                  <button
                    onClick={() => handleLanguageSelect('mi')}
                    className={`w-full text-left py-2 flex items-center justify-between ${
                      language === 'mi' ? 'text-[#ff5a5a]' : 'text-black dark:text-white'
                    }`}
                  >
                    <span className="text-xl font-bold">Māori</span>
                    {language === 'mi' && (
                      <Check className="size-6 text-[#ff5a5a]" strokeWidth={3} />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Buildings List */}
            <div>
              <button
                onClick={() => setShowBuildingsList(!showBuildingsList)}
                className="w-full flex items-center justify-between py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <MapPin className="size-6 text-black dark:text-white" />
                  <span className="text-black dark:text-white text-xl font-bold">
                    {t('Buildings List', '建筑列表', 'Rārangi Whare')}
                  </span>
                </div>
                {showBuildingsList ? (
                  <ChevronDown className="size-4 text-black dark:text-white" strokeWidth={4} />
                ) : (
                  <ChevronRight className="size-4 text-black dark:text-white" strokeWidth={4} />
                )}
              </button>

              {/* Buildings List Items */}
              {showBuildingsList && (
                <div className="pl-[66px] space-y-6 pb-4">
                  {buildings.map((building) => (
                    <button
                      key={building.id}
                      onClick={() => {
                        onBuildingSelect(building.id);
                        setShowBuildingsList(false);
                        onClose();
                      }}
                      className="w-full text-left text-black dark:text-white text-xl font-bold hover:text-[#ff5a5a] transition-colors"
                    >
                      {language === 'en' ? building.nameEN : language === 'zh' ? building.nameCN : building.nameMI}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="pb-2 flex justify-center">
          <div className="w-[134px] h-[5px] bg-black dark:bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
