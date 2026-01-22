# Campus Navigation System - Project Structure

## 📁 Project Overview

This is a mobile-first campus navigation system built with React, TypeScript, and Tailwind CSS. The application provides comprehensive indoor and outdoor navigation capabilities with bilingual support (English/Chinese) and dark mode.

---

## 🗂️ File Organization

### 📦 Root Directory

```
/
├── App.tsx                 # Main application component and routing
├── index.html             # HTML entry point
├── styles/
│   └── globals.css        # Global styles and Tailwind configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

### 🧩 Components Directory (`/components/`)

Main feature components for the application:

#### **Core Navigation Components**
- **`BuildingInfoPanel.tsx`** - Building information bottom sheet
  - Displays building details when user taps a building icon
  - Shows "View Indoor Map" and "Start Navigation" buttons
  - Slides up from bottom with backdrop

- **`RouteSetting.tsx`** - Route configuration page
  - Set start point and destination
  - Search for buildings
  - Toggle route preferences (avoid stairs, indoor navigation)
  - Swap start/end points

- **`NavigationPreview.tsx`** - Route preview before navigation
  - Full-screen route visualization
  - Shows distance, duration, and route summary
  - "Start Navigation" button to begin guidance

- **`StepNavigation.tsx`** - Turn-by-turn navigation
  - Step-by-step navigation instructions
  - Progress bar and step counter
  - Dynamic map switching (outdoor ↔ indoor)
  - Mini indoor map preview when approaching indoor sections
  - Previous/Next buttons for step control

- **`IndoorMap.tsx`** - Indoor floor plan viewer
  - Multi-floor indoor maps
  - Floor selector buttons
  - Zoom controls
  - Room highlighting and search

- **`MenuSidebar.tsx`** - Side menu panel
  - Dark mode toggle
  - Language selection (EN/CN)
  - Buildings list
  - Campus selector

#### **Legacy/Imported Components** (`/imports/`)
Figma-imported components (preserved for reference):
- `Homepage.tsx` - Original Figma design homepage
- `BuildingsList.tsx` - Buildings list view
- `ChangeCampus.tsx` - Campus selection
- `ChangeLanguage.tsx` - Language switcher
- `IndoorMap-*.tsx` - Various indoor map screens
- `Navigation.tsx` - Navigation screens
- `Menu.tsx` - Menu sidebar
- `svg-*.tsx` / `svg-*.ts` - SVG assets and icons

#### **UI Components** (`/components/ui/`)
Reusable UI library components (shadcn/ui based):
- `button.tsx`, `input.tsx`, `checkbox.tsx`, `switch.tsx`, etc.
- Shared utility components for consistent design

#### **Protected Components** (`/components/figma/`)
System-level components (do not modify):
- `ImageWithFallback.tsx` - Image loading with fallback handling

---

## 🎯 Application Flow

### Navigation Flow
```
1. Home Page
   └─> Click Building Icon
       └─> Building Info Panel
           ├─> View Indoor Map → Indoor Map Page
           └─> Start Navigation → Navigation Preview → Step Navigation

2. Home Page
   └─> Click Floating Route Button
       └─> Route Setting
           └─> Confirm Route → Navigation Preview → Step Navigation
```

### Page States (Managed in App.tsx)
- `home` - Homepage with map
- `routeSetting` - Route configuration
- `navigationPreview` - Route preview
- `stepNavigation` - Turn-by-turn guidance
- `indoorMap` - Indoor floor plan viewer

---

## 🎨 Design System

### Color Scheme
- **Primary Red**: `#ff5a5a` - All interactive elements, highlights, active states
- **Light Mode**: White backgrounds, gray text
- **Dark Mode**: Gray-900 backgrounds, white text

### Typography
- Defined in `/styles/globals.css`
- Do not use Tailwind font classes (text-xl, font-bold, etc.) unless specifically requested
- Default typography applied to HTML elements

### Theme Support
- Light/Dark mode toggle in menu sidebar
- All components support `theme` prop
- Automatic color transitions on theme change

### Bilingual Support
- English (`en`) / Chinese (`zh`)
- All text content has both language versions
- Language state managed globally in App.tsx

---

## 🔧 Component Architecture

### Common Props Pattern
Most components receive these standard props:
```typescript
interface ComponentProps {
  language: Language;        // 'en' | 'zh'
  theme: Theme;             // 'light' | 'dark'
  onBack?: () => void;      // Navigation back handler
  // ... component-specific props
}
```

### Data Types (Defined in App.tsx)
```typescript
type Language = 'en' | 'zh';
type Theme = 'light' | 'dark';
type Page = 'home' | 'routeSetting' | 'navigationPreview' | 'stepNavigation' | 'indoorMap';

interface Building {
  id: string;
  name: string;           // English name
  nameCN: string;         // Chinese name
  lat: number;
  lng: number;
  hasIndoorMap?: boolean;
}

interface RoutePreference {
  avoidStairs: boolean;
  indoorNavigation: boolean;
}
```

---

## 📱 Mobile-First Design

### Screen Size
- Target: iPhone 14/15 Pro (393 × 852)
- All components responsive within mobile viewport

### Mobile Interactions
- Bottom sheets for modals (native feel)
- Floating action buttons
- Swipe gestures (planned)
- Touch-friendly tap targets (min 44px)

### Status Bar & Home Indicator
- iOS-style status bar (44px height)
- Home indicator at bottom (34px safe area)
- All components account for safe areas

---

## 🎭 Animation & Transitions

### Custom Animations (CSS)
- `slide-up` - Bottom sheets sliding up
- `slide-in-left` - Sidebar sliding in from right
- `fade-in` - Backdrop overlay fade

### Transitions
- Color transitions on theme change
- Smooth page transitions
- Button hover/active states
- Loading states (planned)

---

## 🔍 Key Features

### Smart Map Switching
- Automatically switches between outdoor and indoor maps based on navigation step
- Shows mini preview of upcoming indoor section

### Step Icons
- 👣 **Walk** - `Footprints` icon (Lucide)
- 🪜 **Stairs** - Custom SVG stairs icon
- 🏢 **Indoor** - `Building2` icon (Lucide)

### Route Preferences
- **Avoid Stairs**: Alternative routes without stairs
- **Indoor Navigation**: Prefer indoor paths through buildings

### Search & Filter
- Real-time building search
- Filter by name (EN/CN)
- Highlight available indoor maps

---

## 🚀 Future Enhancements

- [ ] Real-time location tracking
- [ ] Live navigation with GPS
- [ ] Accessibility features (voice guidance)
- [ ] Save favorite locations
- [ ] Recent searches history
- [ ] Share route functionality
- [ ] Offline map support
- [ ] AR navigation mode

---

## 📝 Development Guidelines

### Code Style
1. **Use English comments only**
2. **Add JSDoc comments** for all exported components
3. **File headers** explaining purpose and features
4. **Section dividers** using `// ============` format

### Component Structure Template
```typescript
/**
 * ============================================================================
 * ComponentName.tsx - Brief Description
 * ============================================================================
 * 
 * PURPOSE:
 * [Explain what this component does]
 * 
 * FEATURES:
 * - [Feature 1]
 * - [Feature 2]
 * 
 * INTERACTION:
 * [How users interact with this component]
 * 
 * ============================================================================
 */

import { ... } from 'react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ComponentProps { ... }

// ============================================================================
// COMPONENT
// ============================================================================

export default function Component() {
  // State
  // Event handlers
  // Render
}
```

### Best Practices
- ✅ Use TypeScript for type safety
- ✅ Keep components focused and single-responsibility
- ✅ Extract reusable logic into custom hooks
- ✅ Use Tailwind classes consistently
- ✅ Support both light/dark themes
- ✅ Provide bilingual text for all content
- ✅ Add meaningful comments for complex logic

---

## 🎓 Tech Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4.0
- **Icons**: Lucide React
- **Build Tool**: Vite (assumed)
- **State Management**: React useState hooks
- **Routing**: Component-based page switching

---

## 📞 Contact & Support

For questions or issues, please refer to the project guidelines or contact the development team.

---

**Last Updated**: December 2024
**Version**: 1.0.0
