# Team Task Allocation Guide
## College Student Directory Project

**Guide for:** 4-Member Development Team  
**Tech Stack:** Next.js (App Router), Tailwind CSS, Shadcn/UI, MongoDB, Framer Motion

---

## 🚀 Getting Started (Everyone) in the group

Before splitting up, **everyone** must ensure they have the environment set up:
1.  **Clone the repo** and run `npm install`.
2.  **Environment Variables**: Create a `.env.local` file with `MONGODB_URI` and `NEXTAUTH_SECRET`.
3.  **Read the Docs**: Familiarize yourself with `docs/DESIGN.md` (for UI rules) and `docs/ARCHITECTURE.md` (for code structure).
4.  **Branching Strategy**:
    *   Member 1: `feature/auth`
    *   Member 2: `feature/dashboard`
    *   Member 3: `feature/profile`
    *   Member 4: `feature/directory`

---

## 👤 Member 1: Authentication System
**Responsibility**: Secure Login/Register flows and Session Management.

### 📋 Scope
-   **Frontend**: Login Page, Register Page, Forgot Password Page.
-   **Backend**: `next-auth` configuration, API routes for registration.
-   **Middleware**: Route protection (ensure non-logged-in users can't access dashboard).

### 🛠️ Implementation Steps

#### 1. Backend & Configuration
-   **Setup NextAuth.js**: Configure `src/lib/auth.ts` and `src/app/api/auth/[...nextauth]/route.ts`. Use the Credentials provider (email/password).
-   **Create Register API**: Implement `POST /api/auth/register` in `src/app/api/auth/register/route.ts`.
    -   *Logic*: Validate input (Zod), check if email exists, hash password (bcrypt), create User document in MongoDB.
-   **Middleware**: Create `src/middleware.ts` to redirect unauthenticated users from `/dashboard/*` to `/login`.

#### 2. Frontend Components
-   **Create Forms**: Build `LoginForm.tsx` and `RegisterForm.tsx` using `react-hook-form` and `zod`.
    -   *Location*: `src/components/auth/`
    -   *Style*: Use Shadcn `Card`, `Input`, `Button`. Center them on the screen.
-   **Pages**:
    -   `src/app/(auth)/login/page.tsx`
    -   `src/app/(auth)/register/page.tsx`
-   **Validation**: Display error messages clearly (e.g., "Invalid email format", "Password too short").

#### 🔑 Key Deliverables
-   [ ] Users can sign up and are saved to MongoDB.
-   [ ] Users can log in and receive a session.
-   [ ] Protected routes redirect to login.

---

## 📊 Member 2: Dashboard System
**Responsibility**: The main landing hub for logged-in users.

### 📋 Scope
-   **Frontend**: Global Layout (Sidebar/Header), Dashboard Home Page.
-   **Backend**: Stats endpoints (count of students, departments, etc.).
-   **Components**: Stats Cards, Navigation Menu, User Dropdown.

### 🛠️ Implementation Steps

#### 1. Global Layout
-   **Sidebar/Navigation**: Create `src/components/layout/Sidebar.tsx`.
    -   *Features*: Links to Dashboard, Directory, Profile. Highlight active link. Responsive (collapsible on mobile).
-   **Header**: Create `src/components/layout/Header.tsx` containing the User Menu (Avatar + Logout button).
-   **Layout Wrapper**: Implement `src/app/(dashboard)/layout.tsx` to wrap all dashboard pages with the Sidebar and Header.

#### 2. Dashboard Page (`/dashboard`)
-   **Stats API**: Create `GET /api/admin/stats` (or dashboard stats).
    -   *Return*: `{ totalStudents: 1200, totalDepts: 8, newThisWeek: 15 }`.
-   **UI Construction**:
    -   Create **Stats Cards**: Displays numbers with icons (Use `lucide-react` icons).
    -   **Recent Activity**: A simple list component showing "New student joined", "Profile updated" (mock data initially if needed).
    -   *Animation*: Use `framer-motion` to fade in the cards on load.

#### 🔑 Key Deliverables
-   [ ] Responsive Sidebar that works on mobile.
-   [ ] Working Logout button in Header.
-   [ ] Dashboard page showing real (or mocked) statistics from the database.

---

## 📝 Member 3: User Profile Management
**Responsibility**: Individual User Settings and Profile Editing.

### 📋 Scope
-   **Frontend**: Profile View Page, Edit Profile Page/Modal.
-   **Backend**: API to get current user data and update user fields.
-   **Components**: Profile Form, Avatar Uploader (optional simple version first).

### 🛠️ Implementation Steps

#### 1. Backend
-   **Get Profile**: Implement `GET /api/users/me` (can leverage existing NextAuth session, but might need fresh DB fetch).
-   **Update Profile**: Implement `PUT /api/users/profile`.
    -   *Allowed Fields*: Bio, Social Links, Skills, Phone.
    -   *Validation*: Ensure URLs are valid, phone number format is correct.

#### 2. Frontend
-   **Profile Page**: `src/app/(dashboard)/profile/page.tsx`.
    -   *Display*: Show User Card with Avatar (large), Basic Info, and Skills tags.
-   **Edit Mechanism**:
    -   Create `StudentForm.tsx` or `ProfileForm.tsx`.
    -   Can be a separate page (`/profile/edit`) or a Shadcn `Dialog` (Modal) on the profile page.
    -   *Features*: Text inputs for Bio, dynamic inputs for Skills (allow adding multiple tags).

#### 🔑 Key Deliverables
-   [ ] User can view their own details.
-   [ ] User can update their Bio and Skills.
-   [ ] Changes persist to the database and reflect immediately.

---

## 🔍 Member 4: Core Feature (Student Directory)
**Responsibility**: The central feature - Searching and Filtering Students.

### 📋 Scope
-   **Frontend**: Directory Listing Page (Grid/List views), Search Bar, Filters.
-   **Backend**: Advanced Search API with filtering logic.
-   **Components**: Student Card, Filter Sidebar/Dropdowns.

### 🛠️ Implementation Steps

#### 1. Backend
-   **Search API**: Implement `GET /api/students/search`.
    -   *Query Params*: `?q=name`, `?dept=CSE`, `?batch=2024`, `?page=1`.
    -   *Logic*: Use MongoDB filtering. Implement pagination (limit 12 per page).

#### 2. Frontend Components
-   **Student Card**: Create `src/components/students/StudentCard.tsx`.
    -   *Design*: See `docs/DESIGN.md`. Display Avatar, Name, Department, and Skill badges.
    -   *Interactions*: Hover effects (scale up slightly). Click to go to `students/[id]`.
-   **Directory Page**: `src/app/(dashboard)/directory/page.tsx`.
    -   **Search Bar**: Component with debounce (wait 300ms before searching).
    -   **Filters**: Dropdowns for Department and Batch.
    -   **Grid**: Use CSS Grid (Tailwind `grid-cols-1 md:grid-cols-3`) to display cards.

#### 🔑 Key Deliverables
-   [ ] API returns paginated results.
-   [ ] Search bar filters the grid in real-time (Debounced).
-   [ ] Filter dropdowns work combined with text search.
