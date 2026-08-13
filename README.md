# Project Documentation: ShopSphere - Modern E-Commerce Platform

**Project Name:** ShopSphere  
**Project Description:** A full-stack, enterprise-grade e-commerce application featuring a customer storefront, a merchant administration suite, third-party authentication, cloud media management, and online payment processing.  
**Business Problem Solved:** Provides businesses with a unified, end-to-end digital commerce solution enabling product catalog discovery, multi-variant shopping carts, loyalty points redemptions, coupon management, payment gateway integration, and order status fulfillment.  
**Target Users:** Online retail consumers, store managers, and system administrators.  
**Business Value:** Lowers time-to-market for digital retail, automates inventory and discount calculations, accelerates order processing, and delivers analytics for store operations.  
**Current Version:** 1.0.0  
**Last Updated:** August 2026  
**Repository Structure Summary:** Decoupled client-server architecture containing a Vite/React TypeScript single-page application (`client`) and an Express/Mongoose TypeScript REST API (`server`).  

```text
[INSERT_PROJECT_COVER_SCREENSHOT]
```

---

# Table of Contents

- [1 Executive Summary](#1-executive-summary)
- [2 Project Overview](#2-project-overview)
- [3 Technology Stack](#3-technology-stack)
- [4 System Architecture](#4-system-architecture)
- [5 Repository Structure](#5-repository-structure)
- [6 Features](#6-features)
- [7 UI Screenshots](#7-ui-screenshots)
- [8 Database Design](#8-database-design)
- [9 Entity Relationship Diagram](#9-entity-relationship-diagram)
- [10 Security](#10-security)
- [11 Authentication](#11-authentication)
- [12 API Documentation](#12-api-documentation)
- [13 Third-party Services](#13-third-party-services)
- [14 Environment Variables](#14-environment-variables)
- [15 Major Dependencies](#15-major-dependencies)
- [16 Installation Guide](#16-installation-guide)
- [17 Deployment](#17-deployment)
- [18 Request Lifecycle](#18-request-lifecycle)
- [19 Performance](#19-performance)
- [20 Security Review](#20-security-review)
- [21 Challenges & Engineering Decisions](#21-challenges--engineering-decisions)
- [22 Future Improvements](#22-future-improvements)
- [23 Developer Notes](#23-developer-notes)

---

# 1 Executive Summary

### Purpose
The platform delivers a production-ready digital commerce engine tailored for multi-category retail operations. It bridges direct customer shopping experiences with administrative merchant operations.

### Key Capabilities
- **Customer Storefront:** Responsive landing portal, multi-faceted product catalog filtering, real-time inventory tracking, persistent carts, wishlists, address books, promotional coupon engine, and dual checkout modes (Razorpay gateway & loyalty points).
- **Merchant Administration:** Secure role-gated admin portal, real-time sales aggregation metrics, product CRUD with multi-image Cloudinary uploads, category management, coupon configuration, banner updates, and full order lifecycle dispatching.

### Technology Summary
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Radix UI / shadcn/ui primitives, Zustand state management, and Clerk React SDK.
- **Backend:** Node.js, Express 5, TypeScript (`tsx` / `tsc`), Mongoose ODM, MongoDB, Multer, Cloudinary SDK, and Razorpay Node SDK.

### Architecture Summary
Client-server decoupled architecture communicating over HTTP REST with standardized API envelopes, token-based authentication via Clerk Bearer tokens, and MongoDB for persistence.

### Business Value
Automates retail workflows, reduces merchant administrative overhead through real-time order and inventory controls, and improves checkout conversion rates with promotional discounts and reward point incentives.

---

# 2 Project Overview

### Objective
To build a scalable, modular e-commerce ecosystem that separates client presentation from backend domain logic while maintaining strict type safety, secure authorization boundaries, and transactional consistency in checkout flows.

### Scope
- **Customer Domain:** Landing page with promotional banners, dynamic category navigation, faceted product filtering (by category, brand, size, color, and price), product details with variant selector, persistent cart & wishlist sync, multi-address management, coupon application, order placement via Razorpay or customer reward points, and order return management within a 7-day window.
- **Admin Domain:** Metrics dashboard (total products, categories, orders, returned orders, aggregate revenue), catalog management (create, update, filter products with Cloudinary image uploads), category taxonomy management, promotional coupon lifecycle management, order state dispatching (`placed` -> `shipped` -> `delivered` -> `returned`), and homepage hero banner configuration.

### Primary Modules
1. **Auth & Identity Sync Module:** Bridges Clerk identity tokens to MongoDB user records and role assignments.
2. **Product Catalog Module:** Manages category hierarchies, product variants, inventory levels, and faceted queries.
3. **Cart & Wishlist Module:** Manages user shopping carts and wishlists across sessions with stock-level validation.
4. **Checkout & Payment Module:** Orchestrates pricing calculations, promo discounts, Razorpay order creation, payment signature verification, and reward points balance redemption.
5. **Order Fulfillment Module:** Manages order records, delivery details, stock decrementing, and order return logic with point refunds.
6. **Admin Operations & Analytics Module:** Aggregates operational sales data and allows content/catalog updates.

### Target Audience
- **Shoppers:** Consumers searching for merchandise, filtering by attributes, managing carts/wishlists, and executing payments.
- **Merchants / Store Operators:** Business operators tracking sales, managing stock, dispatching orders, and executing promotions.

### Real-world Use Cases
- High-volume fashion and apparel retail with size/color variants.
- Loyalty-program-driven stores allowing customers to convert points directly into purchases.
- Promotional campaigns with coupon expiration windows and minimum spend thresholds.

---

# 3 Technology Stack

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| React | `^19.2.4` | UI component library |
| React DOM | `^19.2.4` | DOM renderer for React |
| TypeScript | `~5.9.3` | Static typing and interfaces |
| Vite | `^8.0.1` | Frontend build tool and development server |
| React Router DOM | `^7.13.2` | Client-side routing and route protection |
| Zustand | `^5.0.12` | Lightweight client state management |
| Axios | `^1.13.6` | HTTP client with request interceptors |
| Lucide React | `^1.7.0` | UI icon set |
| Sonner | `^2.0.7` | Toast notifications |
| Radix UI Primitives | `^1.4.3` | Accessible headless UI components |
| Vaul | `^1.1.2` | Drawer component primitive |
| Next Themes | `^0.4.6` | Theme management utilities |

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| Node.js | `>=18` | JavaScript runtime environment |
| Express | `^5.2.1` | HTTP web application framework |
| TypeScript | `^5.9.3` | Static typing and compiler |
| tsx | `^4.21.0` | TypeScript execution engine for development |
| nodemon | `^3.1.14` | Development auto-reload file watcher |
| Mongoose | `^9.3.1` | Object Data Modeling (ODM) for MongoDB |
| Multer | `^2.1.1` | In-memory multipart/form-data upload handling |
| Cloudinary SDK | `^2.9.0` | Cloud media storage and image upload transformations |
| Razorpay SDK | `^2.9.6` | Payment gateway order generation and payment verification |
| Streamifier | `^0.1.1` | Converts memory buffers into readable streams for Cloudinary |
| Morgan | `^1.10.1` | HTTP request logging middleware |
| Cors | `^2.8.6` | Cross-Origin Resource Sharing middleware |
| Dotenv | `^17.3.1` | Environment variable management |
| Zod | `^4.3.6` | Schema validation library |

### Database
| Technology | Purpose |
| :--- | :--- |
| MongoDB | Document-oriented NoSQL database |
| Mongoose ODM | Schema enforcement, document models, and indexing |

### Authentication
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| @clerk/express | `^2.0.6` | Backend middleware for JWT validation and user resolution |
| @clerk/react | `^6.1.3` | Frontend authentication widgets, session tokens, and hooks |

### Styling
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| Tailwind CSS | `^4.2.2` | Utility-first CSS framework |
| @tailwindcss/vite | `^4.2.2` | Vite plugin integration for Tailwind CSS v4 |
| Class Variance Authority | `^0.7.1` | Dynamic component variant styling |
| clsx / tailwind-merge | `^2.1.1` / `^3.5.0` | Safe class concatenation and conflict resolution |
| tw-animate-css | `^1.4.0` | Tailwind CSS animation extensions |

### Development & Build Tools
| Technology | Purpose |
| :--- | :--- |
| ESLint (`^9.39.4`) | Code quality analysis and linting |
| TypeScript Compiler (`tsc`) | Type checking and JavaScript build generation |

---

# 4 System Architecture

The application adopts a **Decoupled Client-Server Architecture**. The React frontend acts as a Single Page Application (SPA), while the Node.js/Express backend operates as a stateless REST API communicating with MongoDB and external service providers.

```text
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |                     React 19 SPA (Vite + TS)                      |  |
|  |  +---------------------+  +-----------------+  +---------------+  |  |
|  |  |  Customer Storefront |  | Admin Dashboard |  | Zustand Stores|  |  |
|  |  +----------+----------+  +--------+--------+  +-------+-------+  |  |
|  |             |                      |                   |          |  |
|  |  +----------v----------------------v-------------------v-------+  |  |
|  |  |                 Axios HTTP Client + Interceptors            |  |  |
|  |  |         (Attaches Clerk JWT Bearer Tokens to Requests)      |  |  |
|  |  +---------------------------------+---------------------------+  |  |
|  +------------------------------------|------------------------------+  |
+---------------------------------------|---------------------------------+
                                        | HTTPS / REST API
                                        v
+-------------------------------------------------------------------------+
|                              SERVER TIER                                |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |                     Express 5 Application Router                  |  |
|  |  +-------------------------------------------------------------+  |  |
|  |  | Middleware: CORS | Morgan | Clerk Auth | Multer Memory      |  |  |
|  |  +------------------------------+------------------------------+  |  |
|  |                                 |                                 |  |
|  |  +------------------------------v------------------------------+  |  |
|  |  | Route Handlers & Controllers                                 |  |  |
|  |  |  * /auth      * /customer/home     * /customer/products     |  |  |
|  |  |  * /customer/cart-wishlist         * /customer/checkout     |  |  |
|  |  |  * /customer/orders                * /customer/address      |  |  |
|  |  |  * /admin/dashboard                * /admin/products        |  |  |
|  |  |  * /admin/orders                   * /admin/promos          |  |  |
|  |  |  * /admin/settings                 * /admin/categories      |  |  |
|  |  +------------------------------+------------------------------+  |  |
|  |                                 |                                 |  |
|  |  +------------------------------v------------------------------+  |  |
|  |  | Standard Response Envelope / Global Error Handler           |  |  |
|  |  +-------------------------------------------------------------+  |  |
|  +---------------------------------+---------------------------------+  |
+------------------------------------|------------------------------------+
                                     |
      +------------------------------+------------------------------+
      |                              |                              |
      v                              v                              v
+------------+               +---------------+              +---------------+
|  MongoDB   |               |  Cloudinary   |              |   Razorpay    |
|  Database  |               | Media Storage |              | Payment Engine|
| (Mongoose) |               | (Stream Upload|              |  (Orders &    |
|            |               |  Transforms)  |              |  Signatures)  |
+------------+               +---------------+              +---------------+
```

---

# 5 Repository Structure

```text
Ecommerce-Store/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── common/              # Admin sidebar and layout navigation
│   │   │   │   ├── products/            # Admin product and category modals/tables
│   │   │   │   ├── promos/              # Admin promo creation and management
│   │   │   │   └── settings/            # Admin banner management tables
│   │   │   ├── auth/                    # Route protection & role guards
│   │   │   ├── common/                  # Reusable loaders and global widgets
│   │   │   ├── customer/
│   │   │   │   ├── cart-and-checkout/   # Cart drawer, items, and checkout flow
│   │   │   │   ├── common/              # Customer desktop & mobile navigation
│   │   │   │   ├── orders/              # Customer orders dialog
│   │   │   │   ├── products/            # Customer cards, facets, and detail gallery
│   │   │   │   ├── profile/             # Customer address book & profile dialog
│   │   │   │   └── wishlist/            # Customer wishlist dialog
│   │   │   ├── layout/                  # CustomerLayout and AdminLayout wrappers
│   │   │   └── ui/                      # Radix UI and shadcn UI component primitives
│   │   ├── features/
│   │   │   ├── admin/                   # Admin Zustand stores, types, and API callers
│   │   │   ├── auth/                    # Auth bootstrap hook, auth store, and sync logic
│   │   │   └── customer/                # Customer domain stores (cart, home, products, etc.)
│   │   ├── lib/
│   │   │   ├── api.ts                   # Axios client instance, token interceptor, helper methods
│   │   │   ├── env.ts                   # Client environment configuration
│   │   │   ├── types.ts                 # Shared envelope and user interfaces
│   │   │   └── utils.ts                 # Formatting helpers and Tailwind class mergers
│   │   ├── pages/
│   │   │   ├── admin/                   # Admin Dashboard, Orders, Products, Promos, Settings
│   │   │   ├── auth/                    # Sign-in and Sign-up page views
│   │   │   └── customer/                # Home, Collections, Collection Details, Order Success
│   │   ├── types/                       # Ambient type declarations (e.g., Razorpay window types)
│   │   ├── App.tsx                      # Root application router wrapper
│   │   ├── index.css                    # Tailwind CSS v4 design tokens and base styles
│   │   ├── main.tsx                     # React application entry point with ClerkProvider
│   │   └── router.tsx                   # React Router v7 route tree and layout mappings
│   ├── .env                             # Client environment variables
│   ├── components.json                  # shadcn/ui configuration
│   ├── eslint.config.js                 # ESLint flat configuration
│   ├── index.html                       # Application HTML template
│   ├── package.json                     # Client dependencies and scripts
│   ├── tsconfig.app.json                # TypeScript application configuration
│   ├── tsconfig.json                    # TypeScript root project references
│   └── vite.config.ts                   # Vite bundler configuration
│
└── server/
    ├── src/
    │   ├── middleware/
    │   │   ├── auth.ts                  # Clerk authentication and admin role enforcement
    │   │   ├── errorhandler.ts          # Global JSON error response handler
    │   │   └── notFound.ts              # 404 Not Found route fallback
    │   ├── models/
    │   │   ├── Banner.ts                # Mongoose schema for promotional banners
    │   │   ├── Cart.ts                  # Mongoose schema for user shopping carts
    │   │   ├── Category.ts              # Mongoose schema for product categories
    │   │   ├── Order.ts                 # Mongoose schema for orders and payment status
    │   │   ├── Product.ts               # Mongoose schema for product catalog items
    │   │   ├── Promo.ts                 # Mongoose schema for promotional discount codes
    │   │   ├── User.ts                  # Mongoose schema for users, addresses, and points
    │   │   └── Wishlist.ts              # Mongoose schema for user wishlists
    │   ├── routes/
    │   │   ├── admin/                   # Admin routes (Dashboard, Orders, Products, Promos, Settings)
    │   │   ├── auth/                    # User synchronization and session profile routes
    │   │   └── customer/                # Customer routes (Address, Cart, Checkout, Home, Orders, Products, Promo)
    │   ├── utils/
    │   │   ├── AppError.ts              # Custom operational error class
    │   │   ├── asyncHandler.ts          # Express asynchronous route exception wrapper
    │   │   ├── cloudinary.ts            # Cloudinary stream buffer upload utility
    │   │   ├── envelope.ts              # Standard success/error response envelope generators
    │   │   ├── helpers.ts               # Runtime validation and assertion helpers
    │   │   └── razorpay.ts              # Razorpay instance and currency converter utility
    │   ├── db.ts                        # MongoDB connection initializer
    │   └── server.ts                    # Express server bootstrap, middleware, and route mounting
    ├── .env                             # Server environment variables
    ├── package.json                     # Server dependencies and scripts
    └── tsconfig.json                    # Server TypeScript configuration
```

---

# 6 Features

### 1. User Synchronization & Role-Based Access Control
- **Purpose:** Automatically synchronizes identities authenticated via Clerk into the MongoDB database and assigns administrative privileges based on preconfigured email lists.
- **Business Value:** Eliminates separate user credential management, ensuring single sign-on security while protecting administrative functions.
- **Main Components:** [auth.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/auth/auth.routes.ts), [auth.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/middleware/auth.ts), [useBootstrapAuth.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/features/auth/useBootstrapAuth.ts), [RoleGuardLayout.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/auth/RoleGuardLayout.tsx).
- **Related APIs:** `POST /auth/sync`, `GET /auth/me`.
- **Dependencies:** `@clerk/express`, `@clerk/react`.

### 2. Customer Home Feed & Promotional Hero Banners
- **Purpose:** Renders dynamic hero promotional banners, category cards, new arrival carousels, and active discount coupon tags on the customer landing page.
- **Business Value:** Increases sales conversion and customer engagement by highlighting promotions and recently added catalog items.
- **Main Components:** [Home.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/customer/Home.tsx), [home.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/home.routes.ts), `useCustomerHomeStore`.
- **Related APIs:** `GET /customer/home`.
- **Dependencies:** Mongoose, Lucide React.

### 3. Faceted Product Discovery & Catalog Search
- **Purpose:** Allows shoppers to filter items across multiple dimensions (categories, brands, sizes `S`/`M`/`L`/`XL`, color swatches) and sort by recent or price order.
- **Business Value:** Streamlines product discovery and improves shopping experience across large inventories.
- **Main Components:** [Collections.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/customer/Collections.tsx), [customer-filters-panel.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/products/customer-filters-panel.tsx), [product.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/product.routes.ts).
- **Related APIs:** `GET /customer/products`, `GET /customer/categories`.
- **Dependencies:** Zustand, React Router.

### 4. Product Details & Related Items Recommendations
- **Purpose:** Displays product image galleries with cover-image selection, variant pickers (size, color), stock verification, detailed pricing, and same-category related items.
- **Business Value:** Provides full product transparency, reducing return rates and increasing average order value through cross-selling.
- **Main Components:** [Collection-Details.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/customer/Collection-Details.tsx), [customer-product-details-gallery.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/products/details/customer-product-details-gallery.tsx), [customer-product-details-summary.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/products/details/customer-product-details-summary.tsx).
- **Related APIs:** `GET /customer/products/:id`.
- **Dependencies:** Lucide React, Zustand.

### 5. Multi-Variant Shopping Cart & Wishlist Sync
- **Purpose:** Enables users to add specific size and color variants to their cart, increment/decrement quantities with stock limits, persist carts across sessions, and bookmark favorite items.
- **Business Value:** Prevents overselling with live stock bounds and increases repeat purchase rates via saved wishlists.
- **Main Components:** [customer-cart-and-checkout-drawer.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/cart-and-checkout/customer-cart-and-checkout-drawer.tsx), [customer-wishlist-dialog.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/wishlist/customer-wishlist-dialog.tsx), [cart-wishlist.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/cart-wishlist.routes.ts).
- **Related APIs:** `GET /customer/cart`, `POST /customer/cart/items`, `PATCH /customer/cart/items/:productId/increase`, `PATCH /customer/cart/items/:productId/decrease`, `DELETE /customer/cart/items/:productId`, `POST /customer/cart/sync`, `GET /customer/wishlist`, `POST /customer/wishlist/items`, `DELETE /customer/wishlist/items/:productId`.
- **Dependencies:** Mongoose, Zustand, Vaul.

### 6. Address Book Management
- **Purpose:** Allows customers to save multiple shipping addresses with default address designation.
- **Business Value:** Lowers checkout abandonment by pre-filling verified delivery information.
- **Main Components:** [customer-profile-dialog.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/profile/customer-profile-dialog.tsx), [address.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/address.routes.ts).
- **Related APIs:** `GET /customer/addresses`, `POST /customer/addresses`, `PATCH /customer/addresses/:addressId`, `DELETE /customer/addresses/:addressId`.
- **Dependencies:** Mongoose.

### 7. Promotional Coupon & Discount Validation Engine
- **Purpose:** Validates promotional coupon codes against active date ranges, available usage counts, and minimum order values, applying percentage deductions dynamically.
- **Business Value:** Enables promotional marketing campaigns that protect profit margins through threshold validation.
- **Main Components:** [promo.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/promo.routes.ts), [customer-cart-and-checkout-drawer.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/cart-and-checkout/customer-cart-and-checkout-drawer.tsx).
- **Related APIs:** `POST /customer/promos/apply`.
- **Dependencies:** Mongoose.

### 8. Razorpay Payment Gateway Integration
- **Purpose:** Creates cryptographic Razorpay orders in backend sub-units (paise/cents), presents the client checkout modal, verifies SHA256 HMAC signatures upon completion, decrements stock atomically, and clears carts.
- **Business Value:** Guarantees fraud-resistant, PCI-compliant payment collection with automated inventory adjustment.
- **Main Components:** [checkout.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/checkout.routes.ts), [razorpay.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/utils/razorpay.ts), `customer-cart-and-checkout-drawer.tsx`.
- **Related APIs:** `POST /customer/checkout/create-session`, `POST /customer/checkout/confirm`.
- **Dependencies:** `razorpay`, `crypto`.

### 9. Loyalty Reward Points Checkout
- **Purpose:** Allows customers with sufficient earned loyalty points to purchase their entire order using their points balance (1 point = 1 currency unit).
- **Business Value:** Incentivizes customer retention and repeat visits through loyalty gamification.
- **Main Components:** [checkout-with-points.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/checkout-with-points.routes.ts).
- **Related APIs:** `GET /customer/checkout/points`, `POST /customer/checkout/pay-with-points`.
- **Dependencies:** Mongoose.

### 10. Order Tracking & 7-Day Return Processing
- **Purpose:** Displays order history with status tracking (`placed`, `shipped`, `delivered`, `returned`). Delivers an automated 7-day return mechanism that restores inventory and refunds purchase amounts as loyalty points.
- **Business Value:** Provides transparent fulfillment tracking and friction-free customer returns while keeping funds within the store ecosystem as points.
- **Main Components:** [customer-orders-dialog.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/customer/orders/customer-orders-dialog.tsx), [Order-Sucess.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/customer/Order-Sucess.tsx), [orders.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/customer/orders.routes.ts).
- **Related APIs:** `GET /customer/orders`, `PATCH /customer/orders/:orderId/return`.
- **Dependencies:** Mongoose.

### 11. Admin Real-Time Metrics Dashboard
- **Purpose:** Computes operational aggregations for total active products, categories, overall orders, returned orders, and gross revenue from paid orders.
- **Business Value:** Gives store managers instant operational visibility to drive procurement and marketing decisions.
- **Main Components:** [Dashboard.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/admin/Dashboard.tsx), [dashboard.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/admin/dashboard.routes.ts).
- **Related APIs:** `GET /admin/dashboard/lite`.
- **Dependencies:** Mongoose Aggregation Pipeline.

### 12. Admin Product & Cloudinary Media Management
- **Purpose:** Full administrative CRUD for products with brand tagging, category allocation, size/color variant definitions, stock levels, sales percentages, and multipart image uploads directly to Cloudinary.
- **Business Value:** Eliminates manual image hosting and gives merchants full autonomy over product listings.
- **Main Components:** [Products.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/admin/Products.tsx), [product-dialog.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/admin/products/product-dialog.tsx), [image-picker.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/admin/products/image-picker.tsx), [product.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/admin/product.routes.ts).
- **Related APIs:** `GET /admin/products`, `GET /admin/products/:id`, `POST /admin/products`, `PUT /admin/products/:id`, `GET /admin/categories`, `POST /admin/categories`, `PUT /admin/categories/:id`.
- **Dependencies:** `multer`, `cloudinary`, `streamifier`.

### 13. Admin Promotional Coupon Lifecycle Management
- **Purpose:** Enables creation, modification, and deletion of promo codes with percentage discounts, usage quotas, minimum cart values, and validity schedules.
- **Business Value:** Empowers marketing teams to execute scheduled promotional sales.
- **Main Components:** [Promos.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/admin/Promos.tsx), [promo-dialog.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/admin/promos/promo-dialog.tsx), [promo.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/admin/promo.routes.ts).
- **Related APIs:** `GET /admin/promos`, `POST /admin/promos`, `PATCH /admin/promos/:promoId`, `DELETE /admin/promos/:promoId`.
- **Dependencies:** Mongoose.

### 14. Admin Order Lifecycle Dispatching
- **Purpose:** Allows administrators to view all store orders and transition fulfillment statuses between `placed`, `shipped`, `delivered`, and `returned`.
- **Business Value:** Maintains fulfillment transparency and synchronizes inventory when orders are returned by administrators.
- **Main Components:** [Orders.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/admin/Orders.tsx), [orders.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/admin/orders.routes.ts).
- **Related APIs:** `GET /admin/orders`, `PATCH /admin/orders/:orderId/status`.
- **Dependencies:** Mongoose.

### 15. Admin Storefront Banner Settings
- **Purpose:** Uploads and maintains responsive hero banners displayed on the customer home feed.
- **Business Value:** Allows instant storefront visual refreshes without code redeployment.
- **Main Components:** [Settings.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/admin/Settings.tsx), [admin-settings-banner-table.tsx](file:
