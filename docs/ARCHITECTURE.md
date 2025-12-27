# Technical Architecture Document
## College Student Directory

**Version:** 1.0  
**Last Updated:** December 27, 2024

---

## 1. Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | Next.js | 14.x | React framework with App Router |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS |
| **UI Components** | Shadcn/UI | Latest | Accessible component library |
| **Animations** | Framer Motion | 10.x | Declarative animations |
| **Database** | MongoDB | 7.x | NoSQL document database |
| **ODM** | Mongoose | 8.x | MongoDB object modeling |
| **Authentication** | NextAuth.js | 5.x | Auth solution for Next.js |
| **Forms** | React Hook Form | 7.x | Form management |
| **Validation** | Zod | 3.x | Schema validation |
| **State** | Zustand | 4.x | Lightweight state management |
| **API** | Next.js API Routes | - | Serverless API endpoints |

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         Next.js Frontend                             │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │    │
│  │  │  Pages   │  │Components│  │  Hooks   │  │  State (Zustand) │    │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Next.js API Routes (/api)                         │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌─────────────┐   │    │
│  │  │   /auth    │  │ /students  │  │   /admin   │  │ /departments│   │    │
│  │  └────────────┘  └────────────┘  └────────────┘  └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                         Middleware                                   │    │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────────┐   │    │
│  │  │ Auth Guard  │  │ Rate Limiter │  │ Request Validation (Zod) │   │    │
│  │  └─────────────┘  └──────────────┘  └──────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATABASE LAYER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    MongoDB (Atlas / Self-hosted)                     │    │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌─────────────┐   │    │
│  │  │   Users    │  │  Students  │  │Departments │  │  AuditLogs  │   │    │
│  │  └────────────┘  └────────────┘  └────────────┘  └─────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Database Schema

### 3.1 Users Collection
```typescript
interface IUser {
  _id: ObjectId;
  email: string;                    // unique, indexed
  passwordHash: string;
  role: 'student' | 'faculty' | 'admin';
  studentProfile?: ObjectId;        // ref to Students
  facultyProfile?: ObjectId;        // ref to Faculty (future)
  emailVerified: boolean;
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
{ email: 1 }                        // unique
{ role: 1, isActive: 1 }
```

### 3.2 Students Collection
```typescript
interface IStudent {
  _id: ObjectId;
  userId: ObjectId;                 // ref to Users
  rollNumber: string;               // unique, indexed
  name: {
    first: string;
    last: string;
  };
  email: string;                    // college email
  phone?: string;
  avatar?: string;                  // URL to image
  department: ObjectId;             // ref to Departments
  batch: number;                    // admission year (e.g., 2022)
  semester: number;                 // current semester (1-8)
  section?: string;                 // e.g., "A", "B"
  skills: string[];                 // searchable array
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
  resumeUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Indexes
{ rollNumber: 1 }                   // unique
{ department: 1, batch: 1 }
{ "name.first": "text", "name.last": "text", skills: "text" }  // text search
{ skills: 1 }
{ isActive: 1 }
```

### 3.3 Departments Collection
```typescript
interface IDepartment {
  _id: ObjectId;
  name: string;                     // e.g., "Computer Science & Engineering"
  code: string;                     // e.g., "CSE", unique
  shortName: string;                // e.g., "CS"
  description?: string;
  color: string;                    // for UI badges
  headOfDepartment?: ObjectId;      // ref to Faculty
  establishedYear?: number;
  isActive: boolean;
  createdAt: Date;
}

// Indexes
{ code: 1 }                         // unique
```

### 3.4 AuditLogs Collection
```typescript
interface IAuditLog {
  _id: ObjectId;
  userId: ObjectId;                 // who performed action
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT';
  resource: 'student' | 'user' | 'department';
  resourceId?: ObjectId;
  details?: Record<string, any>;    // changed fields
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

// Indexes
{ userId: 1, timestamp: -1 }
{ resource: 1, action: 1, timestamp: -1 }
// TTL index to auto-delete after 90 days
{ timestamp: 1 }, { expireAfterSeconds: 7776000 }
```

---

## 4. API Endpoints

### 4.1 Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/logout` | User logout | Required |
| POST | `/api/auth/forgot-password` | Request password reset | Public |
| POST | `/api/auth/reset-password` | Reset password | Token |
| GET | `/api/auth/me` | Get current user | Required |

### 4.2 Students
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/students` | List students (paginated) | Required |
| GET | `/api/students/:id` | Get student by ID | Required |
| GET | `/api/students/search` | Search students | Required |
| POST | `/api/students` | Create student | Admin |
| PUT | `/api/students/:id` | Update student | Owner/Admin |
| DELETE | `/api/students/:id` | Delete student | Admin |
| POST | `/api/students/bulk-import` | Bulk import from CSV | Admin |
| GET | `/api/students/export` | Export to CSV | Faculty+ |

### 4.3 Departments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/departments` | List all departments | Required |
| GET | `/api/departments/:id` | Get department details | Required |
| POST | `/api/departments` | Create department | Admin |
| PUT | `/api/departments/:id` | Update department | Admin |
| DELETE | `/api/departments/:id` | Delete department | Admin |

### 4.4 Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/users` | List all users | Admin |
| PUT | `/api/admin/users/:id/role` | Change user role | Admin |
| PUT | `/api/admin/users/:id/status` | Activate/deactivate user | Admin |
| GET | `/api/admin/stats` | Dashboard statistics | Admin |
| GET | `/api/admin/audit-logs` | View audit logs | Admin |

---

## 5. Authentication Flow

### NextAuth.js Configuration
```typescript
// Using Credentials Provider + JWT Strategy

1. User submits email/password
2. Verify credentials against MongoDB
3. Generate JWT token with user info + role
4. Store session in cookie (httpOnly, secure)
5. Middleware validates JWT on protected routes
6. Role-based access control via middleware
```

### Role Permissions Matrix
| Action | Student | Faculty | Admin |
|--------|---------|---------|-------|
| View public directory | ✅ | ✅ | ✅ |
| View student details | ✅ | ✅ | ✅ |
| Edit own profile | ✅ | ✅ | ✅ |
| Edit any profile | ❌ | ❌ | ✅ |
| Export data | ❌ | ✅ | ✅ |
| Bulk import | ❌ | ❌ | ✅ |
| User management | ❌ | ❌ | ✅ |
| View audit logs | ❌ | ❌ | ✅ |

---

## 6. State Management

### Zustand Store Structure
```typescript
// stores/useDirectoryStore.ts
interface DirectoryState {
  // Search & Filters
  searchQuery: string;
  filters: {
    department: string | null;
    batch: number | null;
    skills: string[];
  };
  
  // View
  viewMode: 'grid' | 'list' | 'department';
  
  // Data
  students: Student[];
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  page: number;
  totalPages: number;
  totalStudents: number;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  setViewMode: (mode: 'grid' | 'list' | 'department') => void;
  fetchStudents: () => Promise<void>;
}

// stores/useAuthStore.ts
interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (credentials) => Promise<void>;
  logout: () => Promise<void>;
}
```

---

## 7. Caching Strategy

### Client-Side
- **React Query / SWR**: For API response caching
- **Stale-while-revalidate** pattern for student list
- **Optimistic updates** for profile edits

### Server-Side
- **MongoDB indexes** for fast queries
- **API response caching** headers for static data
- **ISR (Incremental Static Regeneration)** for department pages

### Cache Invalidation
| Event | Invalidate |
|-------|------------|
| Student updated | Individual student cache |
| Bulk import | Entire students list cache |
| Filter changed | Trigger fresh fetch |

---

## 8. Security Measures

### Authentication
- [x] Password hashing with bcrypt (12 rounds)
- [x] JWT tokens with expiration (7 days)
- [x] HTTP-only, secure, SameSite cookies
- [x] CSRF protection via NextAuth

### Authorization
- [x] Role-based middleware on API routes
- [x] Resource ownership validation
- [x] Admin-only routes protected

### Data Protection
- [x] Input sanitization (XSS prevention)
- [x] Rate limiting on auth endpoints (15 req/min)
- [x] Request validation with Zod schemas
- [x] SQL/NoSQL injection prevention

### Infrastructure
- [x] HTTPS enforcement
- [x] Secure headers (CSP, X-Frame-Options, etc.)
- [x] Environment variables for secrets
- [x] MongoDB connection with TLS

---

## 9. Error Handling

### API Error Response Format
```typescript
interface ApiError {
  success: false;
  error: {
    code: string;          // e.g., "VALIDATION_ERROR"
    message: string;       // User-friendly message
    details?: any;         // Additional info (validation errors)
  };
}

// HTTP Status Codes
400 - Bad Request (validation errors)
401 - Unauthorized (not logged in)
403 - Forbidden (insufficient permissions)
404 - Not Found
409 - Conflict (duplicate entry)
429 - Too Many Requests (rate limited)
500 - Internal Server Error
```

### Frontend Error Handling
- Toast notifications for user errors
- Error boundaries for component crashes
- Retry logic for network failures
- Graceful degradation for offline mode

---

## 10. Performance Optimization

### Database
- Compound indexes for common queries
- Pagination with cursor-based approach
- Projection to fetch only needed fields
- Text indexes for search

### Frontend
- Code splitting per route
- Image optimization with next/image
- Lazy loading for cards below fold
- Virtualization for large lists

### API
- Response compression (gzip)
- Minimal payload sizes
- Connection pooling for MongoDB

---

## 11. Deployment Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Vercel                                 │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Next.js App                           │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │ │
│  │  │ Static Gen  │  │  SSR Pages  │  │  API Routes     │  │ │
│  │  │   (ISR)     │  │             │  │  (Serverless)   │  │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────┬───────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────┐
│                     MongoDB Atlas                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │   M10 Cluster (Production) / M0 Free (Development)      │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Environment Configuration
```bash
# .env.local
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# Production (.env.production)
MONGODB_URI=mongodb+srv://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com
```

---

## 12. Testing Strategy

| Type | Tool | Coverage Target |
|------|------|-----------------|
| Unit Tests | Jest + React Testing Library | 80% |
| Integration Tests | Jest + Supertest | Critical paths |
| E2E Tests | Playwright | Happy paths |
| Visual Tests | Storybook | Components |

### Critical Test Scenarios
1. User registration and login flow
2. Student search and filtering
3. Profile update with validation
4. Admin bulk import
5. Role-based access restrictions

---

## 13. Monitoring & Logging

### Application Monitoring
- Vercel Analytics (performance)
- Sentry (error tracking)
- MongoDB Atlas monitoring

### Logging
- Console logs in development
- Structured JSON logs in production
- Audit logs stored in MongoDB

---

## 14. Future Considerations

### Scalability
- Redis caching layer for hot data
- CDN for static assets
- Database sharding if needed

### Features
- Real-time updates with WebSockets
- Push notifications
- Mobile app (React Native)
- Alumni module

### Integrations
- College SSO integration
- LMS integration
- Placement portal integration
