# Design Guidelines: Professional-Student Matching Platform

## Design Approach
**Selected Approach:** Design System (Material Design principles) with inspiration from professional networking platforms like LinkedIn
**Justification:** Information-dense application requiring credibility, clear hierarchy, and efficient form processing. Professional context demands stability and trust over trendy aesthetics.

## Core Design Elements

### Typography System
- **Primary Font:** Inter or Manrope (Google Fonts) - clean, professional, excellent readability
- **Secondary Font:** System font stack for UI elements
- **Hierarchy:**
  - Hero Headlines: 4xl to 5xl, font-weight-700
  - Section Headers: 3xl, font-weight-600
  - Subsection Headers: 2xl, font-weight-600
  - Body Large: lg, font-weight-400, line-height-relaxed
  - Body Standard: base, font-weight-400, line-height-relaxed
  - Labels/Meta: sm, font-weight-500, uppercase tracking-wide
  - Captions: xs, font-weight-400

### Layout System
**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- **Common patterns:** p-6, gap-8, space-y-4, mb-12, mt-16
- **Grid System:** 12-column grid with gap-6 for desktop, gap-4 for mobile
- **Container widths:** max-w-7xl for main content, max-w-4xl for forms, max-w-prose for text-heavy sections

### Page-Specific Layouts

**Landing Page (Marketing):**
- Hero Section: Full-width with split layout (60/40) - left side bold headline + value proposition, right side featuring diverse student/professional imagery
- Trust Indicators: Centered stats bar (3-column grid: "X Students Matched" | "X Professionals" | "X Success Stories")
- How It Works: 3-column grid showing process steps with numbered icons
- Dual Path CTAs: Side-by-side cards for "I'm a Student" and "I'm a Professional" with distinct visual treatment
- Testimonials: 2-column alternating layout with profile photos
- Final CTA: Centered with supporting trust elements
- Footer: 4-column grid (About, Resources, Legal, Contact) with newsletter signup

**Student Portal:**
- Dashboard: Card-based layout with primary "Your Matches" section (list view with avatars), secondary "Complete Your Profile" prompt
- Profile Creation: Single-column form with clear section breaks, resume upload with drag-drop zone (h-48), multi-select chips for interests
- Match Results: Grid of professional cards (2-column on desktop, 1-column mobile) with avatar, name, title, company, expertise tags, match percentage indicator

**Professional Portal:**
- Dashboard: Similar card structure, "Your Matches" showcasing student profiles, "Profile Completeness" widget
- Profile Survey: Multi-step form with progress indicator, clear section headers, checkbox groups for expertise/opportunities
- Match Results: Student profile cards with resume preview link, contact reveal button

### Component Library

**Navigation:**
- Header: Fixed top, height h-16, horizontal nav with logo left, auth buttons right
- Mobile: Hamburger menu with full-screen overlay

**Forms:**
- Input Fields: Consistent h-12, rounded-lg, border width-2, focus ring-2
- Labels: Above inputs, mb-2, font-medium
- File Upload: Dashed border-2, rounded-lg, h-48 drag-drop zone with icon and helper text
- Multi-select: Pill/chip style with close icons
- Buttons: Primary CTA h-12 px-8 rounded-lg font-semibold, Secondary outlined with same dimensions

**Cards:**
- Profile Cards: Rounded-xl, border width-1, shadow-md, p-6, hover:shadow-lg transition
- Match Cards: Include circular avatar (w-16 h-16), content section with name/title, tags row, action footer
- Dashboard Widgets: Rounded-lg, p-6, space-y-4 internal spacing

**Data Display:**
- Tags/Chips: Rounded-full px-4 py-1, text-sm font-medium
- Match Percentage: Circular progress indicator or horizontal bar with percentage label
- Lists: Divide-y divider, py-4 spacing between items

**Overlays:**
- Modals: max-w-2xl, rounded-xl, shadow-2xl, p-8
- Contact Reveal: Modal with professional/student details, contact info cards, connection suggestions

### Responsive Breakpoints
- Mobile: Single column, stacked navigation, full-width cards
- Tablet (md): 2-column grids, horizontal navigation appears
- Desktop (lg): 3-column grids where applicable, optimal spacing

## Images
**Hero Image:** Wide professional photo showing diverse students and professionals in modern workspace/campus setting, positioned right side of split hero, aspect-ratio-4/3, rounded-xl
**Profile Avatars:** Circular w-16 h-16 for cards, w-24 h-24 for detailed views
**Testimonial Photos:** Circular w-12 h-12, with subtle ring border
**Empty States:** Illustrative graphics for "No matches yet" states

## Animation Strategy
**Minimal, purposeful animations only:**
- Card hover: subtle shadow lift (shadow-md to shadow-lg)
- Button interactions: Built-in component states
- Page transitions: Simple fade-ins for new content loads
- Match reveal: Gentle slide-in animation for new matches appearing

## Key Design Principles
1. **Clarity Over Cleverness:** Information hierarchy must be immediately scannable
2. **Trust Signals:** Professional photos, credentials, match percentages prominently displayed
3. **Efficient Workflows:** Minimize clicks to complete profiles and view matches
4. **Accessibility First:** Consistent form patterns, clear labels, keyboard navigation
5. **Progressive Disclosure:** Show essential info first, detailed profiles on click/expand