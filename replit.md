# CareerConnect - Professional-Student Matching Platform

## Overview
CareerConnect is a platform that connects students with industry professionals for mentoring, internships, and job shadowing opportunities. The system automatically matches users based on shared interests, expertise, and opportunity types.

## Recent Changes
- **November 4, 2025**: Initial project setup with complete frontend implementation
  - Built landing page with hero section and dual CTAs for students and professionals
  - Created student registration with resume upload and preference selection
  - Created professional registration with survey form
  - Implemented match dashboards for both user types
  - Added contact information reveal modals
  - Configured design system with Inter/Manrope fonts

## Project Architecture

### Tech Stack
- **Frontend**: React, TypeScript, Wouter (routing), TanStack Query (data fetching)
- **Backend**: Express.js, Node.js
- **Storage**: In-memory storage (MemStorage)
- **UI**: Shadcn UI components, Tailwind CSS
- **File Upload**: Multer (for resume uploads)

### Data Models

#### Students
- `id`: Unique identifier
- `name`: Full name
- `email`: Contact email
- `phone`: Phone number
- `resumeUrl`: Path to uploaded resume file
- `interests`: Array of career fields (e.g., "Software Engineering", "Marketing")
- `opportunityTypes`: Array of what they're seeking ("Mentoring", "Internship", "Job Shadowing")
- `createdAt`: Registration timestamp

#### Professionals
- `id`: Unique identifier
- `name`: Full name
- `email`: Contact email
- `phone`: Phone number
- `title`: Job title
- `company`: Company name
- `bio`: Professional biography
- `expertise`: Array of expertise areas
- `availableOpportunities`: Array of opportunities they can offer
- `createdAt`: Registration timestamp

#### Matches
- `id`: Unique identifier
- `studentId`: Reference to student
- `professionalId`: Reference to professional
- `score`: Match percentage (0-100)
- `createdAt`: When match was created

### Key Features

1. **Landing Page** (`/`)
   - Hero section with value proposition
   - Statistics showcase
   - How it works section
   - Dual path CTAs for students and professionals

2. **Student Registration** (`/student/register`)
   - Personal information form
   - Resume file upload (drag & drop)
   - Multi-select field interests
   - Opportunity type selection
   - Form validation with Zod

3. **Professional Registration** (`/professional/register`)
   - Personal and professional information
   - Bio/description field
   - Expertise area selection
   - Available opportunities selection
   - Form validation with Zod

4. **Student Dashboard** (`/student/dashboard/:id`)
   - Welcome message with student name
   - Profile summary card
   - Grid of matched professionals
   - Match score indicators
   - Contact reveal functionality

5. **Professional Dashboard** (`/professional/dashboard/:id`)
   - Welcome message with professional name
   - Profile summary card
   - Grid of matched students
   - Match score indicators
   - Contact reveal with resume access

### Matching Algorithm (Backend)
The matching algorithm calculates overlap between:
- Student interests ↔ Professional expertise
- Student opportunity types ↔ Professional available opportunities

Match score is calculated as a percentage (0-100) based on the intersection of these arrays.

### API Endpoints (To Be Implemented)

**Students:**
- `POST /api/students/register` - Register new student with resume upload
- `GET /api/students/:id` - Get student by ID
- `GET /api/students/:id/matches` - Get matches for a student

**Professionals:**
- `POST /api/professionals/register` - Register new professional
- `GET /api/professionals/:id` - Get professional by ID
- `GET /api/professionals/:id/matches` - Get matches for a professional

**File Serving:**
- `GET /uploads/:filename` - Serve uploaded resume files

## Design System

### Colors
- Primary: Blue (#217BF4 - professional, trustworthy)
- Background: Light gray for light mode, dark for dark mode
- Card backgrounds: Slightly elevated from background
- Text hierarchy: foreground, muted-foreground for supporting text

### Typography
- Primary Font: Inter
- Secondary Font: Manrope
- Heading hierarchy: 4xl-6xl for hero, 2xl-3xl for sections, base-lg for body

### Spacing
- Consistent padding: p-6 for cards, p-12 for hero sections
- Gap system: gap-4 to gap-8 for grids and flex containers

### Components Used
- Shadcn UI: Card, Button, Form, Input, Textarea, Checkbox, Badge, Avatar, Dialog, Toast
- All components follow elevation system with hover-elevate and active-elevate-2
- Consistent rounded corners (rounded-lg, rounded-xl)

## File Structure

```
client/src/
├── pages/
│   ├── landing.tsx              # Home page
│   ├── student-register.tsx     # Student registration
│   ├── professional-register.tsx # Professional registration
│   ├── student-dashboard.tsx    # Student matches view
│   ├── professional-dashboard.tsx # Professional matches view
│   └── not-found.tsx            # 404 page
├── components/
│   ├── match-card.tsx           # Reusable match card component
│   ├── contact-modal.tsx        # Contact reveal modal
│   └── ui/                      # Shadcn components
├── App.tsx                      # Router configuration
└── index.css                    # Global styles and design tokens

server/
├── routes.ts                    # API route handlers (to be implemented)
├── storage.ts                   # Storage interface and MemStorage
└── index.ts                     # Server entry point

shared/
└── schema.ts                    # Shared TypeScript types and Zod schemas
```

## User Workflow

### For Students:
1. Visit landing page → Click "I'm a Student"
2. Fill registration form with personal info
3. Upload resume (PDF/DOC/DOCX)
4. Select fields of interest (multiple)
5. Select opportunity types wanted
6. Submit → Redirected to dashboard
7. View matched professionals with scores
8. Click "View Contact Information" to reveal email/phone

### For Professionals:
1. Visit landing page → Click "I'm a Professional"
2. Fill registration form with personal/professional info
3. Write bio about expertise
4. Select expertise areas
5. Select opportunities they can offer
6. Submit → Redirected to dashboard
7. View matched students with scores
8. Click "View Contact Information" to reveal contact + resume

## Next Steps
1. Implement backend API endpoints
2. Add file upload handling with Multer
3. Implement matching algorithm
4. Connect frontend to backend
5. Add error handling and loading states
6. Test complete user journeys
