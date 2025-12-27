# Project Structure
## College Student Directory

```
student-directory/
│
├── 📁 .github/                      # GitHub specific files
│   └── workflows/
│       └── ci.yml                   # CI/CD pipeline
│
├── 📁 docs/                         # Documentation
│   ├── PRD.md                       # Product Requirements
│   ├── DESIGN.md                    # Design specifications
│   ├── ARCHITECTURE.md              # Technical architecture
│   └── API.md                       # API documentation
│
├── 📁 public/                       # Static assets
│   ├── favicon.ico
│   ├── logo.svg
│   └── 📁 images/
│       ├── placeholder-avatar.svg
│       └── empty-state.svg
│
├── 📁 src/
│   │
│   ├── 📁 app/                      # Next.js App Router
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Global styles
│   │   │
│   │   ├── 📁 (auth)/               # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx           # Auth pages layout
│   │   │
│   │   ├── 📁 (dashboard)/          # Protected route group
│   │   │   ├── layout.tsx           # Dashboard layout (sidebar)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx         # Overview/stats
│   │   │   ├── directory/
│   │   │   │   └── page.tsx         # Student listing
│   │   │   ├── students/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx     # Student profile
│   │   │   │   └── new/
│   │   │   │       └── page.tsx     # Add new student (admin)
│   │   │   ├── profile/
│   │   │   │   └── page.tsx         # Current user profile
│   │   │   ├── settings/
│   │   │   │   └── page.tsx         # User settings
│   │   │   └── admin/
│   │   │       ├── page.tsx         # Admin dashboard
│   │   │       ├── users/
│   │   │       │   └── page.tsx     # User management
│   │   │       ├── import/
│   │   │       │   └── page.tsx     # Bulk import
│   │   │       └── departments/
│   │   │           └── page.tsx     # Department management
│   │   │
│   │   └── 📁 api/                  # API Routes
│   │       ├── 📁 auth/
│   │       │   ├── [...nextauth]/
│   │       │   │   └── route.ts     # NextAuth handler
│   │       │   └── register/
│   │       │       └── route.ts
│   │       ├── 📁 students/
│   │       │   ├── route.ts         # GET (list), POST (create)
│   │       │   ├── [id]/
│   │       │   │   └── route.ts     # GET, PUT, DELETE
│   │       │   ├── search/
│   │       │   │   └── route.ts
│   │       │   ├── export/
│   │       │   │   └── route.ts
│   │       │   └── bulk-import/
│   │       │       └── route.ts
│   │       ├── 📁 departments/
│   │       │   ├── route.ts
│   │       │   └── [id]/
│   │       │       └── route.ts
│   │       └── 📁 admin/
│   │           ├── stats/
│   │           │   └── route.ts
│   │           ├── users/
│   │           │   └── route.ts
│   │           └── audit-logs/
│   │               └── route.ts
│   │
│   ├── 📁 components/               # React Components
│   │   ├── 📁 ui/                   # Shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── command.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── sheet.tsx
│   │   │
│   │   ├── 📁 layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── UserMenu.tsx
│   │   │
│   │   ├── 📁 students/             # Student-related components
│   │   │   ├── StudentCard.tsx
│   │   │   ├── StudentGrid.tsx
│   │   │   ├── StudentList.tsx
│   │   │   ├── StudentProfile.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   ├── StudentFilters.tsx
│   │   │   └── StudentSkeleton.tsx
│   │   │
│   │   ├── 📁 search/               # Search components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── FilterChips.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── CommandPalette.tsx
│   │   │
│   │   ├── 📁 auth/                 # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── PasswordResetForm.tsx
│   │   │
│   │   ├── 📁 admin/                # Admin components
│   │   │   ├── StatsCard.tsx
│   │   │   ├── UserTable.tsx
│   │   │   ├── BulkImporter.tsx
│   │   │   ├── DepartmentForm.tsx
│   │   │   └── AuditLogTable.tsx
│   │   │
│   │   └── 📁 shared/               # Shared/common components
│   │       ├── Logo.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── Pagination.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── LoadingSpinner.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── 📁 hooks/                    # Custom React hooks
│   │   ├── useStudents.ts           # Student data fetching
│   │   ├── useDepartments.ts        # Department data
│   │   ├── useSearch.ts             # Search with debounce
│   │   ├── useFilters.ts            # Filter management
│   │   ├── usePagination.ts         # Pagination logic
│   │   ├── useAuth.ts               # Auth utilities
│   │   └── useMediaQuery.ts         # Responsive hooks
│   │
│   ├── 📁 lib/                      # Utility libraries
│   │   ├── auth.ts                  # NextAuth config
│   │   ├── db.ts                    # MongoDB connection
│   │   ├── utils.ts                 # Helper utilities
│   │   ├── validations.ts           # Zod schemas
│   │   └── constants.ts             # App constants
│   │
│   ├── 📁 models/                   # Mongoose models
│   │   ├── User.ts
│   │   ├── Student.ts
│   │   ├── Department.ts
│   │   └── AuditLog.ts
│   │
│   ├── 📁 stores/                   # Zustand stores
│   │   ├── useDirectoryStore.ts
│   │   ├── useAuthStore.ts
│   │   └── useUIStore.ts
│   │
│   ├── 📁 types/                    # TypeScript types
│   │   ├── index.ts                 # Export all types
│   │   ├── student.ts
│   │   ├── user.ts
│   │   ├── department.ts
│   │   └── api.ts
│   │
│   ├── 📁 animations/               # Framer Motion variants
│   │   ├── page.ts                  # Page transitions
│   │   ├── card.ts                  # Card animations
│   │   ├── list.ts                  # Stagger animations
│   │   └── modal.ts                 # Modal animations
│   │
│   └── 📁 styles/                   # Additional styles
│       └── animations.css           # CSS animations
│
├── 📁 prisma/ (alternative)         # If using Prisma instead
│   └── schema.prisma
│
├── 📄 .env.local                    # Local environment vars
├── 📄 .env.example                  # Example env file
├── 📄 .eslintrc.json                # ESLint config
├── 📄 .prettierrc                   # Prettier config
├── 📄 .gitignore                    # Git ignore rules
├── 📄 components.json               # Shadcn config
├── 📄 middleware.ts                 # Next.js middleware
├── 📄 next.config.js                # Next.js config
├── 📄 package.json                  # Dependencies
├── 📄 tailwind.config.ts            # Tailwind config
├── 📄 tsconfig.json                 # TypeScript config
└── 📄 README.md                     # Project readme
```

---

## Key Directories Explained

### `/src/app/` - Next.js App Router
Uses the new App Router with route groups:
- `(auth)` - Unauthenticated pages with minimal layout
- `(dashboard)` - Protected pages with sidebar layout

### `/src/components/` - Component Organization
- **ui/**: Shadcn base components (styled primitives)
- **layout/**: Page structure components
- **students/**: Feature-specific components
- **shared/**: Reusable across features

### `/src/lib/` - Core Utilities
- Database connections
- Authentication setup
- Validation schemas
- Helper functions

### `/src/stores/` - State Management
Zustand stores for:
- Directory filtering/search state
- Auth session state
- UI preferences (theme, sidebar)

### `/src/animations/` - Framer Motion
Centralized animation variants for consistent motion design.

---

## Important Files

| File | Purpose |
|------|---------|
| `middleware.ts` | Route protection, auth checks |
| `lib/auth.ts` | NextAuth configuration |
| `lib/db.ts` | MongoDB connection singleton |
| `lib/validations.ts` | Zod schemas for type safety |
| `components.json` | Shadcn UI configuration |

---

## Environment Variables

```bash
# .env.example

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-directory

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Optional: Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Image Upload
CLOUDINARY_URL=cloudinary://...
```

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component files | PascalCase | `StudentCard.tsx` |
| Hook files | camelCase with "use" | `useStudents.ts` |
| Utility files | camelCase | `validations.ts` |
| Type files | camelCase | `student.ts` |
| CSS files | camelCase | `globals.css` |
| Route segments | kebab-case | `forgot-password/` |
| API routes | kebab-case | `bulk-import/` |
