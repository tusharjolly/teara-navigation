import svgPaths from "./svg-bmp8qw6b8m";
import imgMap from "figma:asset/948540a80b08b11c7f9fea140c43d5fe43103d7e.png";
import { imgGroup } from "./svg-u2upl";

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

function ButtonIcon() {
  return (
    <div className="absolute left-[calc(33.33%+28px)] size-[24px] top-[254px]" data-name="button/icon">
      <div className="absolute inset-[-16.67%_-50%_-83.33%_-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g filter="url(#filter0_d_1_767)" id="button/icon">
            <rect fill="var(--fill-0, #1973E8)" height="24" rx="12" shapeRendering="crispEdges" width="24" x="12" y="4" />
            <path d={svgPaths.p3da400} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_767" width="48" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_767" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_767" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ButtonIcon1() {
  return (
    <div className="absolute left-[calc(66.67%-9px)] size-[24px] top-[609px]" data-name="button/icon">
      <div className="absolute inset-[-16.67%_-50%_-83.33%_-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g filter="url(#filter0_d_1_767)" id="button/icon">
            <rect fill="var(--fill-0, #1973E8)" height="24" rx="12" shapeRendering="crispEdges" width="24" x="12" y="4" />
            <path d={svgPaths.p3da400} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_767" width="48" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_767" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_767" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ButtonIcon2() {
  return (
    <div className="absolute left-[calc(33.33%+40px)] size-[24px] top-[559px]" data-name="button/icon">
      <div className="absolute inset-[-16.67%_-50%_-83.33%_-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g filter="url(#filter0_d_1_767)" id="button/icon">
            <rect fill="var(--fill-0, #1973E8)" height="24" rx="12" shapeRendering="crispEdges" width="24" x="12" y="4" />
            <path d={svgPaths.p3da400} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_767" width="48" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_767" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_767" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ButtonIcon3() {
  return (
    <div className="absolute left-[calc(16.67%+11.5px)] size-[24px] top-[463px]" data-name="button/icon">
      <div className="absolute inset-[-16.67%_-50%_-83.33%_-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g filter="url(#filter0_d_1_767)" id="button/icon">
            <rect fill="var(--fill-0, #1973E8)" height="24" rx="12" shapeRendering="crispEdges" width="24" x="12" y="4" />
            <path d={svgPaths.p3da400} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_767" width="48" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_767" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_767" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ButtonIcon4() {
  return (
    <div className="absolute left-[calc(66.67%-3px)] size-[24px] top-[402px]" data-name="button/icon">
      <div className="absolute inset-[-16.67%_-50%_-83.33%_-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g filter="url(#filter0_d_1_767)" id="button/icon">
            <rect fill="var(--fill-0, #1973E8)" height="24" rx="12" shapeRendering="crispEdges" width="24" x="12" y="4" />
            <path d={svgPaths.p3da400} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_767" width="48" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_767" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_767" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function IconArrowSign() {
  return (
    <div className="relative size-[14.142px]" data-name="icon/arrow sign">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <g id="icon/arrow sign">
            <rect fill="var(--fill-0, white)" height="14.1421" rx="1" width="14.1421" />
            <path d={svgPaths.pf4041b2} fill="var(--fill-0, #1973E8)" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <div className="absolute flex items-center justify-center left-1/2 size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ "--transform-inner-width": "14.140625", "--transform-inner-height": "14.140625" } as React.CSSProperties}>
        <div className="flex-none rotate-[315deg]">
          <IconArrowSign />
        </div>
      </div>
    </div>
  );
}

function ButtonIcon5() {
  return (
    <div className="absolute bg-[#1973e8] box-border content-stretch flex gap-[4px] items-center justify-center left-[calc(83.33%-6.5px)] p-[8px] rounded-[100px] shadow-[0px_8px_12px_0px_rgba(0,0,0,0.3)] size-[56px] top-[759px]" data-name="button/icon">
      <Icon />
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

function Icon1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="icon">
          <path d={svgPaths.pca0b500} fill="var(--fill-0, #2B2B2B)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Cursor() {
  return <div className="absolute bg-[#2b2b2b] h-[26px] left-[43px] top-[7px] w-[2px]" data-name="cursor" />;
}

function Input() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] items-center left-[16px] px-[12px] py-[8px] rounded-[100px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] top-[144px] w-[361px]" data-name="Input">
      <Icon1 />
      <div className="basis-0 flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#cccccc] text-[16px]">
        <p className="leading-[24px]">Search</p>
      </div>
      <Cursor />
    </div>
  );
}

function Menu() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="menu">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="menu">
          <path d={svgPaths.p32dc8f00} fill="var(--fill-0, black)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center relative shrink-0 size-[29.33px]">
      <Menu />
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
    <div className="h-[29.33px] relative shrink-0 w-[97.38px]" data-name="Component 3">
      <Group />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[316px]">
      <Component />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.4] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">Campus Map</p>
    </div>
  );
}

function FiRrCaretDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi-rr-caret-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi-rr-caret-down">
          <path d={svgPaths.p1fb4e4f0} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-between left-0 px-[16px] py-[24px] top-[44px] w-[393px]">
      <Frame2 />
      <Frame />
      <FiRrCaretDown />
    </div>
  );
}

function ButtonIcon6() {
  return (
    <div className="absolute left-[calc(33.33%+15px)] size-[24px] top-[644px]" data-name="button/icon">
      <div className="absolute inset-[-16.67%_-50%_-83.33%_-50%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <g filter="url(#filter0_d_1_767)" id="button/icon">
            <rect fill="var(--fill-0, #1973E8)" height="24" rx="12" shapeRendering="crispEdges" width="24" x="12" y="4" />
            <path d={svgPaths.p3da400} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_1_767" width="48" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_767" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_767" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ZoomControls() {
  return (
    <div className="absolute bottom-[35px] h-[81px] right-[calc(83.33%+6.5px)] w-[40px]" data-name="Zoom Controls">
      <div className="absolute inset-[-19.75%_-50%_-29.63%_-50%]" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 121">
          <g filter="url(#filter0_d_5_4788)" id="Zoom Controls">
            <path d={svgPaths.p1b69600} fill="var(--fill-0, white)" shapeRendering="crispEdges" />
            <path d={svgPaths.p35309c00} fill="var(--fill-0, black)" id="PLus" />
            <path d={svgPaths.pbc7b800} fill="var(--fill-0, black)" id="Minus" />
            <rect fill="var(--fill-0, #E6E6E6)" height="1" id="Separator" width="28.5714" x="26" y="57" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="121" id="filter0_d_5_4788" width="80" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_5_4788" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_5_4788" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function CampusClick() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="campus click">
      <p className="[grid-area:1_/_1] font-['Inter:Bold',sans-serif] font-bold leading-[1.4] ml-0 mt-0 not-italic relative text-[#ff5a5a] text-[20px] text-nowrap whitespace-pre">Hamilton</p>
    </div>
  );
}

function SwitchCampus() {
  return (
    <div className="absolute bg-[#f6f6f6] box-border content-stretch flex flex-col gap-[7px] items-start left-[calc(50%+36.5px)] overflow-clip px-[16px] py-[4px] rounded-[20px] top-[100px] w-[128px]" data-name="Switch campus">
      <CampusClick />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[1.4] min-w-full not-italic opacity-60 relative shrink-0 text-[20px] text-[rgba(0,0,0,0.6)] w-[min-content]">Tauranga</p>
    </div>
  );
}

function HomeIndicatorLight() {
  return (
    <div className="absolute bottom-0 h-[34px] left-0 w-[390px]" data-name="Home Indicator/Light">
      <div className="absolute bg-black bottom-[8px] h-[5px] left-1/2 rounded-[100px] translate-x-[-50%] w-[134px]" data-name="Home Indicator" />
    </div>
  );
}

export default function ChangeCampus() {
  return (
    <div className="bg-white relative size-full" data-name="change campus">
      <div className="absolute bg-white h-[852px] left-0 top-0 w-[393px]" data-name="background" />
      <div className="absolute bottom-0 left-0 pointer-events-none top-0">
        <StatusBarIPhone1313Pro />
      </div>
      <div className="absolute bg-white h-[96px] left-0 top-[48px] w-[390px]" />
      <div className="absolute h-[731px] left-0 rounded-tl-[20px] rounded-tr-[20px] top-[121px] w-[393px]" data-name="map">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[20px] rounded-tr-[20px] size-full" src={imgMap} />
      </div>
      <ButtonIcon />
      <ButtonIcon1 />
      <ButtonIcon2 />
      <ButtonIcon3 />
      <ButtonIcon4 />
      <ButtonIcon5 />
      <div className="absolute flex h-[84.713px] items-center justify-center left-[calc(33.33%+52px)] top-[384px] w-[75.623px]" style={{ "--transform-inner-width": "69", "--transform-inner-height": "79" } as React.CSSProperties}>
        <div className="flex-none rotate-[355deg]">
          <Location />
        </div>
      </div>
      <Input />
      <Frame1 />
      <ButtonIcon6 />
      <ZoomControls />
      <SwitchCampus />
      <HomeIndicatorLight />
    </div>
  );
}