import React from 'react';
import svgPaths from "./svg-qpxocxjoht";
import imgMap from "figma:asset/948540a80b08b11c7f9fea140c43d5fe43103d7e.png";
import { imgGroup } from "./svg-29oym";

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

function FiRrCaretRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="fi-rr-caret-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="fi-rr-caret-right">
          <path d={svgPaths.p118993c0} fill="var(--fill-0, black)" id="Vector" />
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
      <FiRrCaretRight />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute h-[16px] left-[24px] top-[734px] w-[16.5px]">
      <div className="absolute bottom-[-4.42%] left-[-8.57%] right-0 top-[-4.42%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
          <g id="Group 17">
            <path d={svgPaths.p18968d80} id="Line 7" stroke="var(--stroke-0, black)" strokeWidth="2" />
            <path d={svgPaths.p21f4f780} id="Vector 3" stroke="var(--stroke-0, black)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute h-[74px] left-[calc(16.67%+14.5px)] top-[751px] w-[14px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 74">
        <g id="Group 35">
          <g id="Ellipse 6"></g>
          <g id="Group 16">
            <ellipse cx="7" cy="29.7341" fill="var(--fill-0, #CCCCCC)" id="Ellipse 7" rx="2" ry="2.28724" />
            <ellipse cx="7" cy="37.7396" fill="var(--fill-0, #CCCCCC)" id="Ellipse 8" rx="2" ry="2.28724" />
            <ellipse cx="7" cy="45.7449" fill="var(--fill-0, #CCCCCC)" id="Ellipse 9" rx="2" ry="2.28724" />
          </g>
          <g id="Group 10">
            <path d={svgPaths.p12dc0b00} fill="var(--fill-0, #FF5A5A)" id="Vector" />
            <path d={svgPaths.p8bbee00} fill="var(--fill-0, #FF5A5A)" id="Vector_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-white border border-[#d5d6d9] border-solid h-[42px] left-[calc(16.67%+43.5px)] rounded-[5px] top-[738px] w-[192px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[42px] not-italic text-[16px] text-[rgba(0,0,0,0.6)] text-nowrap top-[8px] whitespace-pre">Your Location</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-white border border-[#dadce0] border-solid h-[42px] left-[calc(16.67%+43.5px)] rounded-[5px] top-[789px] w-[192px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[50.5px] not-italic text-[16px] text-[rgba(0,0,0,0.6)] text-nowrap top-[8px] whitespace-pre">Destination</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[21px] left-[calc(83.33%-11.5px)] top-[799px] w-[18px]">
      <div className="absolute inset-[-6.73%_-3.93%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 24">
          <g id="Group 15">
            <line id="Line 6" stroke="var(--stroke-0, black)" strokeWidth="2" x1="6.20711" x2="6.20711" y1="13.4142" y2="1.41421" />
            <path d={svgPaths.p6e80a40} id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="2" />
            <line id="Line 7" stroke="var(--stroke-0, black)" strokeWidth="2" transform="matrix(-4.37114e-08 1 1 4.37114e-08 14.2071 10.4142)" x2="12" y1="-1" y2="-1" />
            <path d={svgPaths.p29730f80} id="Vector 3" stroke="var(--stroke-0, black)" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute h-[15px] left-[calc(83.33%-7.5px)] top-[750px] w-[3px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 15">
        <g id="Group 12">
          <circle cx="1.5" cy="1.5" fill="var(--fill-0, black)" id="Ellipse 10" r="1.5" />
          <circle cx="1.5" cy="7.5" fill="var(--fill-0, black)" id="Ellipse 11" r="1.5" />
          <circle cx="1.5" cy="13.5" fill="var(--fill-0, black)" id="Ellipse 12" r="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-[716px]">
      <div className="absolute bg-white h-[136px] left-0 rounded-tl-[20px] rounded-tr-[20px] top-[716px] w-[393px]" />
      <div className="absolute h-[13.541px] left-[calc(16.67%+14.5px)] top-[752px] w-[14px]">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(0, 0, 0, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p23548980} fill="var(--fill-0, white)" id="Ellipse 6" stroke="var(--stroke-0, black)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <Group3 />
      <Group4 />
      <Frame3 />
      <Frame4 />
      {[...Array(2).keys()].map((_, i) => (
        <Group2 key={i} />
      ))}
      <Group1 />
    </div>
  );
}

function ZoomControls() {
  return (
    <div className="absolute bottom-[199px] h-[81px] right-[calc(83.33%+13.5px)] w-[40px]" data-name="Zoom Controls">
      <div className="absolute inset-[-19.75%_-50%_-29.63%_-50%]" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 121">
          <g filter="url(#filter0_d_4_2000)" id="Zoom Controls">
            <path d={svgPaths.p1b69600} fill="var(--fill-0, white)" shapeRendering="crispEdges" />
            <path d={svgPaths.p35309c00} fill="var(--fill-0, black)" id="PLus" />
            <path d={svgPaths.pbc7b800} fill="var(--fill-0, black)" id="Minus" />
            <rect fill="var(--fill-0, #E6E6E6)" height="1" id="Separator" width="28.5714" x="26" y="57" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="121" id="filter0_d_4_2000" width="80" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4_2000" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4_2000" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function SearchDestination() {
  return (
    <div className="bg-white relative size-full" data-name="search destination">
      <div className="absolute bg-white h-[852px] left-0 top-0 w-[393px]" data-name="background" />
      <div className="absolute bottom-0 left-0 pointer-events-none top-0">
        <StatusBarIPhone1313Pro />
      </div>
      <div className="absolute bg-white h-[100px] left-0 top-[44px] w-[393px]" />
      <div className="absolute h-[731px] left-0 rounded-tl-[20px] rounded-tr-[20px] top-[121px] w-[393px]" data-name="map">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-tl-[20px] rounded-tr-[20px] size-full" src={imgMap} />
      </div>
      <div className="absolute flex h-[84.713px] items-center justify-center left-[calc(33.33%+52px)] top-[384px] w-[75.623px]" style={{ "--transform-inner-width": "69", "--transform-inner-height": "79" } as React.CSSProperties}>
        <div className="flex-none rotate-[355deg]">
          <Location />
        </div>
      </div>
      <Frame1 />
      <Group5 />
      <ZoomControls />
    </div>
  );
}