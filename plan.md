# Implementation Plan - CobblerConnect Marketplace

CobblerConnect is a modern digital marketplace connecting local cobblers with customers. This plan covers the frontend implementation of the marketplace, including customer, cobbler, and admin interfaces, using a simulated data approach (localStorage) as per the session constraints (No Supabase/Server-side DB).

## Scope Summary
- **User Roles:** Customer, Cobbler (Vendor), Administrator.
- **Key Features:** Product browsing/search, repair service requests, shopping cart, checkout (simulated), real-time chat (simulated), dashboards for all roles.
- **Tech Stack:** React (Vite), TypeScript, Tailwind CSS, Lucide Icons, UI components from `src/components/ui`.
- **Data Layer:** LocalStorage for persistence, JSON-based initial mock data.

## Non-Goals
- Real backend implementation (Node.js/Express/PostgreSQL).
- Actual payment gateway integration (Paystack/Flutterwave) - will be simulated.
- Real-time WebSockets - will be simulated via state/localStorage polling.
- Production deployment to Vercel/Railway.
- Actual Google OAuth (will use simulated login).

## Assumptions & Open Questions
- **Assumption:** Since no backend is allowed, all "state" (orders, products, messages) will reside in `localStorage`.
- **Question:** Should we include the "AI-powered repair cost estimation" as a simple rule-based mock? (Yes, included as a bonus UI feature).

## Affected Areas
- **Frontend:** Complete UI rewrite of `src/App.tsx`.
- **Components:** New shared layouts, role-specific dashboards, and product/service cards.
- **State Management:** Context API for Auth and Cart.

---

## Phases

### Phase 1: Foundation & Shared Utilities
- **Goal:** Set up routing, theme, and authentication context.
- **Deliverables:**
    - `src/context/AuthContext.tsx`: Role-based auth simulation.
    - `src/context/CartContext.tsx`: Cart management.
    - `src/hooks/useLocalStorage.ts`: Persistence helper.
    - `src/types/index.ts`: TypeScript interfaces for Products, Services, Orders, Users.
- **Owner:** `frontend_engineer`

### Phase 2: Design System & Mock Data
- **Goal:** Define the "Leather Craftsmanship" visual style and seed data.
- **Deliverables:**
    - Update `src/index.css` with brown/gold/black theme colors.
    - `src/data/mockData.ts`: Initial listings for cobblers, products, and services.
- **Owner:** `quick_fix_engineer`

### Phase 3: Customer Experience (Public & Private)
- **Goal:** Landing page, product catalog, and search.
- **Deliverables:**
    - `src/pages/LandingPage.tsx`: Hero, Featured Cobblers, Categories.
    - `src/pages/Marketplace.tsx`: Filterable product/service grid.
    - `src/pages/CobblerProfile.tsx`: Individual storefront view.
    - `src/pages/Cart.tsx` & `src/pages/Checkout.tsx`.
- **Owner:** `frontend_engineer`

### Phase 4: Repair Service System
- **Goal:** Allow customers to request repairs with image uploads (simulated).
- **Deliverables:**
    - `src/components/repair/RepairRequestForm.tsx`: Image upload UI and description.
    - `src/components/repair/CostEstimator.tsx`: AI-mockup estimation UI.
- **Owner:** `frontend_engineer`

### Phase 5: Role-Based Dashboards
- **Goal:** Internal views for Customers, Cobblers, and Admins.
- **Deliverables:**
    - `src/pages/dashboards/CustomerDashboard.tsx`: Order history, repair status.
    - `src/pages/dashboards/CobblerDashboard.tsx`: Inventory, order management, analytics.
    - `src/pages/dashboards/AdminDashboard.tsx`: User verification, platform metrics.
- **Owner:** `frontend_engineer`

### Phase 6: Messaging & Interactions
- **Goal:** Chat interface and Reviews.
- **Deliverables:**
    - `src/components/chat/ChatWindow.tsx`: Simulated real-time messaging.
    - `src/components/reviews/ReviewList.tsx`: Ratings and feedback UI.
- **Owner:** `frontend_engineer`

---

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. quick_fix_engineer — Theme and mock data setup.
2. frontend_engineer — Core application structure, routing, and all functional pages.

**Per-agent instructions:**

### 1. quick_fix_engineer
- **Phases:** Phase 2
- **Scope:** Update Tailwind/CSS variables to match "Leather Craftsmanship" (Browns, Golds, Deep Blacks). Create the initial `mockData.ts` with diverse products (shoes, belts) and cobbler profiles.
- **Files:** `src/index.css`, `src/data/mockData.ts`
- **Depends on:** none
- **Acceptance criteria:** Theme reflects a premium leather brand; Mock data provides enough content for 5+ cobblers and 20+ products.

### 2. frontend_engineer
- **Phases:** 1, 3, 4, 5, 6
- **Scope:** Build the entire React application architecture. Use `react-router-dom` for navigation. Implement role-based access control in `AuthContext`. Build out the Marketplace, Repair Request system, and the three distinct dashboards.
- **Files:** `src/App.tsx`, `src/context/*`, `src/pages/*`, `src/components/*`
- **Depends on:** Phase 2 (for styling/data)
- **Acceptance criteria:** Users can "login" as any of the 3 roles; Customers can add to cart and request repairs; Cobblers can see new orders; All data persists in localStorage.

**Do not dispatch:**
- No `supabase_engineer` (Database is out of scope for this session).
