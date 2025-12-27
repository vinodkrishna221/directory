# Design Document
## College Student Directory

**Version:** 1.0  
**Last Updated:** December 27, 2024

---

## 1. Design Philosophy

### Core Principles
- **Clean & Professional**: Academic context demands professional aesthetics
- **Accessible**: Easy to use for all technical levels
- **Fast & Responsive**: Quick interactions with smooth animations
- **Consistent**: Unified design language throughout

### Design Inspiration
Modern dashboard interfaces with card-based layouts, emphasizing readability and efficient information discovery.

---

## 2. Color Palette

### Primary Colors
```css
/* Brand Colors */
--primary-50:  #eff6ff;   /* Lightest blue */
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #3b82f6;   /* Primary blue */
--primary-600: #2563eb;   /* Primary hover */
--primary-700: #1d4ed8;
--primary-800: #1e40af;
--primary-900: #1e3a8a;   /* Darkest blue */
```

### Neutral Colors
```css
/* Grayscale */
--gray-50:  #f9fafb;      /* Background */
--gray-100: #f3f4f6;      /* Card background */
--gray-200: #e5e7eb;      /* Borders */
--gray-300: #d1d5db;
--gray-400: #9ca3af;      /* Muted text */
--gray-500: #6b7280;
--gray-600: #4b5563;      /* Secondary text */
--gray-700: #374151;
--gray-800: #1f2937;      /* Primary text */
--gray-900: #111827;      /* Headings */
```

### Semantic Colors
```css
/* Status Colors */
--success: #22c55e;       /* Green - Active */
--warning: #f59e0b;       /* Amber - Pending */
--error:   #ef4444;       /* Red - Error */
--info:    #3b82f6;       /* Blue - Info */
```

### Department Colors (for visual coding)
```css
--dept-cse: #8b5cf6;      /* Purple - Computer Science */
--dept-ece: #06b6d4;      /* Cyan - Electronics */
--dept-me:  #f97316;      /* Orange - Mechanical */
--dept-ce:  #84cc16;      /* Lime - Civil */
--dept-ee:  #eab308;      /* Yellow - Electrical */
```

---

## 3. Typography

### Font Family
```css
/* Primary Font - Clean, modern, highly readable */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Monospace - For roll numbers, codes */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 32px | 700 | 1.2 |
| H2 (Section) | 24px | 600 | 1.3 |
| H3 (Card Title) | 18px | 600 | 1.4 |
| Body | 16px | 400 | 1.5 |
| Small | 14px | 400 | 1.5 |
| Caption | 12px | 500 | 1.4 |

---

## 4. Spacing System

### Base Unit: 4px
```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

### Component Spacing
- Card padding: 24px
- Section gaps: 32px
- Grid gap: 24px
- Input padding: 12px 16px

---

## 5. Component Specifications

### 5.1 Student Card

```
┌────────────────────────────────────────┐
│  ┌────────┐                            │
│  │        │  Name Here                 │
│  │ Avatar │  Roll Number               │
│  │ 80x80  │  Department Badge          │
│  └────────┘                            │
│                                        │
│  📧 email@college.edu                  │
│  📱 +91 XXXXX XXXXX                    │
│                                        │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ Skill │ │ Skill │ │ +3   │          │
│  └──────┘ └──────┘ └──────┘           │
│                                        │
│  [View Profile]                        │
└────────────────────────────────────────┘

Specifications:
- Width: 320px (flexible in grid)
- Border radius: 12px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: Scale 1.02, shadow increase
- Animation: Framer Motion spring
```

### 5.2 Search Bar

```
┌─────────────────────────────────────────────────────┐
│  🔍  Search students by name, roll number...        │
└─────────────────────────────────────────────────────┘

Specifications:
- Height: 48px
- Border radius: 8px
- Background: White
- Border: 1px solid gray-200
- Focus: Blue ring (primary-500)
- Debounce: 300ms
```

### 5.3 Filter Chips

```
┌────────────────────────────────────────────────────────┐
│ Department: ┌─────────────┐  Batch: ┌──────────────┐  │
│             │ All Depts ▼ │         │ All Years  ▼ │  │
│             └─────────────┘         └──────────────┘  │
│                                                        │
│ Skills: ┌────────┐ ┌────────┐ ┌──────┐ ┌───────────┐  │
│         │ React ✕│ │ Node ✕ │ │ +Add │ │ Clear All │  │
│         └────────┘ └────────┘ └──────┘ └───────────┘  │
└────────────────────────────────────────────────────────┘
```

### 5.4 Profile Page Layout

```
┌──────────────────────────────────────────────────────────┐
│ ← Back to Directory                                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐    Name Here                          │
│  │              │    Roll Number | Department            │
│  │   Avatar     │    📧 email@college.edu               │
│  │   160x160    │    📱 +91 XXXXX XXXXX                 │
│  │              │                                        │
│  └──────────────┘    [LinkedIn] [GitHub] [Portfolio]    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  About                                                   │
│  ─────────────────────────────────────────────          │
│  Bio text goes here...                                   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Skills & Technologies                                   │
│  ─────────────────────────────────────────────          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │  React │ │ Node.js│ │ Python │ │MongoDB │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Academic Information                                    │
│  ─────────────────────────────────────────────          │
│  Batch: 2022    Semester: 5    Section: A               │
│                                                          │
│  [Download Resume]                                       │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 6. Page Layouts

### 6.1 Dashboard Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Student Directory       [Search...]    [Avatar ▼] │
├─────────┬───────────────────────────────────────────────────┤
│         │                                                   │
│ 📊 Dash │   Welcome, [Name]!                               │
│         │                                                   │
│ 👥 Dir  │   ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│         │   │ Students │ │  Depts  │ │  Batch  │           │
│ 🔧 Admin│   │   1,234  │ │    8    │ │    5    │           │
│         │   └─────────┘ └─────────┘ └─────────┘           │
│ ⚙️ Set  │                                                   │
│         │   Recent Activity / Quick Actions                 │
│         │                                                   │
└─────────┴───────────────────────────────────────────────────┘
```

### 6.2 Directory Grid
```
┌─────────────────────────────────────────────────────────────┐
│  Student Directory                                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔍 Search students...           [Filters ▼] [+ Add]  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  Showing 24 of 1,234 students        [Grid] [List] [Dept]  │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Card 1  │  │  Card 2  │  │  Card 3  │  │  Card 4  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Card 5  │  │  Card 6  │  │  Card 7  │  │  Card 8  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  [1] [2] [3] ... [52] [Next →]                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Animation Specifications

### Using Framer Motion

#### Page Transitions
```javascript
// Page enter animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Transition config
const pageTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};
```

#### Card Stagger Animation
```javascript
// Container for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Individual card animation
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};
```

#### Hover Interactions
```javascript
// Card hover
const cardHover = {
  scale: 1.02,
  y: -4,
  boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
  transition: { type: "spring", stiffness: 400 }
};

// Button hover
const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400 }
};
```

#### Skeleton Loading
```javascript
// Skeleton pulse animation
const skeletonVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};
```

---

## 8. Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm:  640px;   /* Tablet portrait */
--breakpoint-md:  768px;   /* Tablet landscape */
--breakpoint-lg:  1024px;  /* Desktop */
--breakpoint-xl:  1280px;  /* Large desktop */
--breakpoint-2xl: 1536px;  /* Extra large */
```

### Grid Columns by Breakpoint
| Breakpoint | Card Grid | Sidebar |
|------------|-----------|---------|
| Mobile | 1 column | Hidden (hamburger) |
| sm | 2 columns | Hidden |
| md | 2 columns | Collapsed icons |
| lg | 3 columns | Full sidebar |
| xl | 4 columns | Full sidebar |
| 2xl | 5 columns | Full sidebar |

---

## 9. Shadcn/UI Components

### Components to Use
- **Button**: Primary actions, secondary actions
- **Input**: Search, form fields
- **Select**: Dropdowns for filters
- **Dialog**: Modals for profile edit, confirmations
- **Card**: Student cards, stat cards
- **Avatar**: Student profile pictures
- **Badge**: Department tags, skill badges
- **Table**: List view, admin tables
- **Tabs**: View switching, profile sections
- **Skeleton**: Loading states
- **Toast**: Notifications
- **DropdownMenu**: User menu, actions menu
- **Command**: Search palette (Cmd+K)
- **Sheet**: Mobile sidebar

### Custom Styling
All Shadcn components will be customized to match our design tokens in `globals.css` and `tailwind.config.ts`.

---

## 10. Dark Mode Support

### Color Mapping
| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Background | gray-50 | gray-900 |
| Card BG | white | gray-800 |
| Text Primary | gray-900 | gray-50 |
| Text Secondary | gray-600 | gray-400 |
| Borders | gray-200 | gray-700 |

Implementation via CSS variables and Tailwind's dark mode class strategy.

---

## 11. Accessibility Checklist

- [ ] Color contrast ratio ≥ 4.5:1 for normal text
- [ ] Color contrast ratio ≥ 3:1 for large text
- [ ] Focus indicators visible on all interactive elements
- [ ] Skip links for keyboard navigation
- [ ] ARIA labels on icon-only buttons
- [ ] Alt text on all images
- [ ] Form labels properly associated
- [ ] Error messages announced to screen readers
- [ ] Reduced motion preference respected

---

## 12. Assets Required

### Icons
Using **Lucide Icons** (included with Shadcn):
- Search, Filter, User, Mail, Phone
- Grid, List, Layers (view modes)
- Settings, LogOut, ChevronDown
- Plus, Edit, Trash, Download
- LinkedIn, GitHub, Globe

### Illustrations
- Empty state illustration (no results)
- Error state illustration (500 page)
- Welcome illustration (onboarding)

### Placeholder Avatar
SVG-based initial avatar generator for users without photos.

---

## 13. Design Deliverables

| Deliverable | Format | Status |
|-------------|--------|--------|
| Component Library | Shadcn + Custom | Planned |
| Page Wireframes | This document | ✅ |
| Color Palette | CSS Variables | ✅ |
| Typography Scale | CSS Variables | ✅ |
| Animation Specs | Framer Motion | ✅ |
| Responsive Grid | Tailwind Config | ✅ |
