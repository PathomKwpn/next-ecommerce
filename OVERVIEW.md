# Project Overview

Create a modern premium sneaker ecommerce web application called "PATH".

The goal is not to build a simple CRUD ecommerce website. PATH should showcase production-grade frontend engineering suitable for a Mid-Level Frontend Developer portfolio while being structured as a real full-stack Next.js product that can grow into a database-backed application.

The experience should feel like a combination of Nike, Apple Store, On Running, and Nothing.tech.

Focus heavily on:

- User Experience (UX)
- Responsive Design
- Performance
- Reusable Component Architecture
- Modern Animations
- SEO
- Accessibility
- Full-stack architecture
- Database readiness

---

# Product Direction

PATH should be built as a premium ecommerce experience first. The frontend must feel polished, modern, and high-end, but the codebase should not be frontend-only.

Next.js should be used as both:

- Frontend application framework
- Backend application layer

The first implementation can use mock data, but the architecture must be ready to connect to a real database later without rewriting pages and UI components.

---

# Tech Stack

Use:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Framer Motion

Future database options:

- PostgreSQL with Prisma
- PostgreSQL with Drizzle
- Supabase
- Neon
- PlanetScale
- SQLite for local prototyping

Next.js does not include a built-in database. It provides the application, rendering, backend routes, and server execution model. The database must be added as a separate dependency later.

---

# Full-Stack Scope

## Frontend Responsibilities

- App Router pages and layouts
- Product discovery flows
- Product detail experience
- Cart and wishlist interfaces
- Responsive mobile-first UI
- Form UX and validation feedback
- Smooth transitions and micro interactions
- SEO-friendly rendering
- Accessible semantic markup

## Backend Responsibilities

- Route Handlers under `src/app/api`
- Server Actions under `src/actions`
- Request validation with Zod
- Server-side product fetching
- Newsletter submission handling
- Product, cart, wishlist, review, and recommendation service logic
- Repository layer for mock data now and database data later

## Database Boundary

Database access must be isolated behind repositories or data-access modules.

UI components must not import mock data directly. Pages and API routes should call services. Services should call repositories. Repositories should be swappable between mock data and a real database implementation.

Target flow:

```txt
UI / Page
  -> Feature component
  -> Service
  -> Repository
  -> Mock data now
  -> Database later
```

---

# Design Style

Visual direction:

- Premium
- Minimal
- Clean
- Modern
- High-end fashion brand

Reference brands:

- Nike
- Adidas
- On Running
- Apple
- Nothing.tech

Use:

- Large product photography
- Generous spacing
- Smooth micro interactions
- Subtle animations
- Sticky CTA sections
- Strong product-first composition

Avoid:

- Dashboard-like UI
- Bootstrap appearance
- Generic ecommerce templates
- Overly decorative layouts that distract from products

---

# Core Pages

## Home Page

Sections:

- Hero Banner
- Featured Collection
- New Arrivals
- Trending Products
- Brand Story
- Newsletter

## Product Listing Page

Features:

- Search
- Filter by Category
- Filter by Gender
- Filter by Size
- Filter by Color
- Sort Options
- Pagination
- Responsive mobile filter drawer

## Product Detail Page

Features:

- Product Gallery
- Color Selector
- Size Selector
- Product Information
- Reviews
- Recommended Products
- Sticky Add To Cart
- Recently viewed tracking

Must be mobile-first.

## Cart Page

Features:

- Quantity Adjustment
- Remove Item
- Price Summary
- Promo Code
- Empty Cart State

## Wishlist Page

Features:

- Saved products
- Remove from wishlist
- Move to cart
- Empty wishlist state

## Product Comparison Page

Features:

- Compare selected products
- Compare price, category, gender, color, sizes, materials, and rating
- Remove product from comparison

---

# Advanced Features

Implement:

- Skeleton Loading
- Empty States
- Error States
- Recently Viewed Products
- Product Comparison
- Smooth Page Transitions
- Optimistic UI Updates
- Responsive mobile drawers
- Accessible interactive controls

---

# SEO Requirements

Implement:

- Dynamic Metadata
- Open Graph
- Sitemap
- Robots.txt
- Canonical URLs
- Product-specific metadata
- Semantic product content

---

# Performance Requirements

Implement:

- Next Image Optimization
- Dynamic Imports
- Lazy Loading
- Route-based Code Splitting
- Server Components where appropriate
- Client Components only when interactivity is required
- Avoid unnecessary client-side JavaScript

Target Lighthouse score above 90.

---

# Accessibility Requirements

Implement:

- Keyboard Navigation
- ARIA Labels where needed
- Visible Focus States
- Semantic HTML
- Accessible buttons and links
- Form labels and validation messages
- Motion that respects reduced-motion preferences

---

# Folder Structure

Use a scalable feature-based architecture:

```txt
src/
  app/
    api/
    cart/
    products/
    wishlist/
    compare/
    layout.tsx
    page.tsx
    sitemap.ts
    robots.ts
  actions/
  components/
    layout/
    motion/
    seo/
    ui/
  constants/
  features/
    cart/
    checkout/
    comparison/
    home/
    products/
    reviews/
    wishlist/
  hooks/
  lib/
    db.ts
    utils.ts
    validations/
  repositories/
    products/
    reviews/
    newsletter/
  services/
    products/
    reviews/
    newsletter/
  store/
  types/
```

---

# Route Structure

Frontend routes:

- `/`
- `/products`
- `/products/[slug]`
- `/cart`
- `/wishlist`
- `/compare`

Backend routes:

- `GET /api/products`
- `GET /api/products/[slug]`
- `GET /api/products/recommended`
- `GET /api/reviews`
- `POST /api/newsletter`

Future backend routes:

- `POST /api/cart`
- `PATCH /api/cart`
- `DELETE /api/cart`
- `POST /api/wishlist`
- `DELETE /api/wishlist`
- `POST /api/checkout`

---

# Data Models

Core models:

- `Product`
- `ProductVariant`
- `ProductImage`
- `ProductReview`
- `Category`
- `CartItem`
- `WishlistItem`
- `ComparisonItem`
- `RecentlyViewedItem`
- `NewsletterSignup`

Product data should include:

- `id`
- `slug`
- `name`
- `brand`
- `description`
- `price`
- `compareAtPrice`
- `category`
- `gender`
- `colors`
- `sizes`
- `images`
- `rating`
- `reviewCount`
- `isNew`
- `isTrending`
- `isFeatured`
- `createdAt`
- `updatedAt`

---

# State Management Strategy

Use server state and client state separately.

TanStack Query:

- Product list queries
- Product detail queries
- Reviews
- Recommended products
- Newsletter mutation
- Future server-backed wishlist/cart sync

Zustand:

- Cart local state
- Wishlist local state
- Product comparison state
- Recently viewed products
- UI state that must persist across routes

React Hook Form and Zod:

- Newsletter form
- Promo code form
- Future checkout forms
- Server Action and Route Handler validation schemas

---

# Backend and Database Strategy

Initial phase:

- Use TypeScript seed data
- Implement repositories that read from mock data
- Implement services that call repositories
- Make API routes call services
- Make pages call services directly where server rendering is better

Future database phase:

- Add database client in `src/lib/db.ts`
- Add Prisma or Drizzle schema
- Replace mock repositories with database repositories
- Keep service and UI contracts stable
- Add environment variables for database connection
- Add seed script for development data

Expected future database files:

```txt
src/lib/db.ts
prisma/schema.prisma
prisma/seed.ts
```

or:

```txt
src/lib/db.ts
src/db/schema.ts
src/db/seed.ts
```

---

# Component Hierarchy

Global components:

- `SiteHeader`
- `SiteFooter`
- `MobileNavigation`
- `PageTransition`
- `NewsletterForm`
- `OptimizedImage`

Product components:

- `ProductCard`
- `ProductGrid`
- `ProductGallery`
- `ProductFilters`
- `ProductSort`
- `ProductSearch`
- `ProductRecommendations`
- `ProductReviews`
- `SizeSelector`
- `ColorSelector`
- `StickyAddToCart`

Cart and commerce components:

- `CartLineItem`
- `CartSummary`
- `PromoCodeForm`
- `WishlistGrid`
- `ComparisonTable`

State components:

- `ProductCardSkeleton`
- `ProductGridSkeleton`
- `EmptyState`
- `ErrorState`

---

# Implementation Roadmap

## Phase 1: Foundation

- [x] Scaffold Next.js app
- [x] Install required dependencies
- [x] Configure Tailwind CSS and shadcn
- [x] Set project metadata
- [ ] Establish complete base layout and design tokens
- [x] Verify lint and production build

## Phase 2: Architecture Skeleton

- [x] Create feature-based folders
- [x] Define shared TypeScript models
- [x] Create mock product seed data
- [x] Create repository interfaces
- [x] Create mock repositories
- [x] Create product services
- [x] Add validation schemas

## Phase 3: Backend Readiness

- [x] Add product API routes
- [x] Add newsletter API route
- [x] Add service-level Zod validation
- [x] Add `src/lib/db.ts` placeholder for future database client
- [x] Document mock-to-database replacement path

## Phase 4: Core Frontend

- [ ] Build global layout
- [ ] Build home page sections
- [ ] Build product listing page
- [ ] Build filters, sorting, search, and pagination
- [ ] Build product detail page
- [ ] Build responsive mobile filter drawer

## Phase 5: Commerce State

- [ ] Implement Zustand cart store
- [ ] Implement wishlist store
- [ ] Implement recently viewed store
- [ ] Implement comparison store
- [ ] Add optimistic UI behavior
- [ ] Add empty, loading, and error states

## Phase 6: SEO, Performance, Accessibility

- [ ] Implement dynamic metadata
- [ ] Add sitemap and robots
- [ ] Add Open Graph metadata
- [ ] Use optimized images
- [ ] Audit keyboard navigation
- [ ] Add reduced-motion support
- [ ] Run build and Lighthouse-oriented checks

## Phase 7: Future Database Integration

- [ ] Choose PostgreSQL provider
- [ ] Add Prisma or Drizzle
- [ ] Create schema from existing TypeScript models
- [ ] Add migrations
- [ ] Add seed data
- [ ] Replace mock repositories with database repositories
- [ ] Keep UI and services unchanged where possible

---

# Initial Implementation Plan

Start with architecture before feature UI:

1. Create folder skeleton under `src`
2. Define domain types in `src/types`
3. Add mock product data in a repository-safe location
4. Create product repository interface and mock implementation
5. Create product service functions
6. Add product API routes that call services
7. Add home and product routes using services
8. Build UI components after data contracts are stable

This keeps the project portfolio-friendly on the frontend while still proving that the codebase can support real backend and database work later.
