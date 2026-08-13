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
- **Main Components:** [Settings.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/pages/admin/Settings.tsx), [admin-settings-banner-table.tsx](file:///d:/MY-PROJECTS/Ecommerce-Store/client/src/components/admin/settings/admin-settings-banner-table.tsx), [settings.routes.ts](file:///d:/MY-PROJECTS/Ecommerce-Store/server/src/routes/admin/settings.routes.ts).
- **Related APIs:** `GET /admin/settings/banners`, `POST /admin/settings/banners`.
- **Dependencies:** `multer`, `cloudinary`.

---

# 7 UI Screenshots

```text
[INSERT_HOME_PAGE_SCREENSHOT]
```
*Customer Landing Page showing hero banners, categories, promo codes, and new arrivals.*

```text
[INSERT_COLLECTIONS_PAGE_SCREENSHOT]
```
*Customer Product Catalog with faceted filters (category, brand, size, color) and sorting.*

```text
[INSERT_COLLECTION_DETAILS_PAGE_SCREENSHOT]
```
*Product Details View displaying multi-image gallery, variant selectors, and related items.*

```text
[INSERT_SIGN_IN_PAGE_SCREENSHOT]
```
*Clerk-powered Customer Sign-In authentication page.*

```text
[INSERT_SIGN_UP_PAGE_SCREENSHOT]
```
*Clerk-powered Customer Sign-Up registration page.*

```text
[INSERT_ORDER_SUCCESS_PAGE_SCREENSHOT]
```
*Order Confirmation Page confirming transaction status and order reference identifier.*

```text
[INSERT_ADMIN_DASHBOARD_PAGE_SCREENSHOT]
```
*Admin Dashboard displaying revenue metrics, order totals, and product/category statistics.*

```text
[INSERT_ADMIN_PRODUCTS_PAGE_SCREENSHOT]
```
*Admin Product Inventory Management table with stock indicators and creation modal.*

```text
[INSERT_ADMIN_PROMOS_PAGE_SCREENSHOT]
```
*Admin Promotional Coupons table with scheduling and threshold configuration.*

```text
[INSERT_ADMIN_ORDERS_PAGE_SCREENSHOT]
```
*Admin Orders Dispatching view with fulfillment status transition triggers.*

```text
[INSERT_ADMIN_SETTINGS_PAGE_SCREENSHOT]
```
*Admin Banner Settings management interface for storefront hero image uploads.*

---

# 8 Database Design

The database layer is managed using Mongoose schemas on MongoDB. All collections utilize native ObjectId primary keys (`_id`) and timestamps (`createdAt`, `updatedAt`) unless otherwise specified.

### 1. Users Collection (`User`)
- **Purpose:** Stores authenticated user records, assigned roles, accumulated reward points, and embedded address books.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique document identifier.
  - `clerkUserId` (`String`, Required, Unique, Indexed): Foreign user identifier from Clerk.
  - `name` (`String`, Optional): Full name of the user.
  - `email` (`String`, Optional): Primary email address.
  - `role` (`String`, Enum: `["user", "admin"]`, Default: `"user"`): Access authorization level.
  - `points` (`Number`, Default: `0`, Min: `0`): Loyalty reward points balance.
  - `addresses` (`Array<AddressSubDocument>`, Default: `[]`): Embedded shipping address array.
    - `fullName` (`String`, Required)
    - `address` (`String`, Required)
    - `state` (`String`, Required)
    - `postalCode` (`String`, Required)
    - `isDefault` (`Boolean`, Default: `false`)
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

### 2. Products Collection (`Product`)
- **Purpose:** Stores merchandise items, inventory levels, pricing, discount percentages, and variant options.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique product identifier.
  - `title` (`String`, Required, Trim): Product title.
  - `description` (`String`, Required, Trim): Detailed markdown/text description.
  - `category` (`ObjectId`, FK -> `Category`, Required): Category reference.
  - `brand` (`String`, Required, Trim): Brand name.
  - `stock` (`Number`, Required, Min: `0`): Current available inventory count.
  - `images` (`Array<ImageSubDocument>`, Default: `[]`): Cloudinary image objects (`url`, `publicId`, `isCover`).
  - `colors` (`Array<String>`, Default: `[]`): Color variant list.
  - `sizes` (`Array<String>`, Enum: `["S", "M", "L", "XL"]`, Default: `[]`): Size variant list.
  - `price` (`Number`, Required): Regular base price in currency units.
  - `salePercentage` (`Number`, Default: `0`): Discount percentage (0-100).
  - `status` (`String`, Enum: `["active", "inactive"]`, Default: `"active"`): Visibility state.
  - `createdBy` (`ObjectId`, FK -> `User`, Required): Admin creator reference.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

### 3. Categories Collection (`Category`)
- **Purpose:** Defines product classifications for navigation and filtering.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique category identifier.
  - `name` (`String`, Required, Trim): Category name.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

### 4. Orders Collection (`Order`)
- **Purpose:** Records finalized customer purchases, items purchased, payment details, and fulfillment state.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique order identifier.
  - `user` (`ObjectId`, FK -> `User`, Required): Purchasing customer reference.
  - `customerName` (`String`, Default: `""`): Customer display name.
  - `customerEmail` (`String`, Default: `""`): Customer email address.
  - `items` (`Array<OrderItemSubDocument>`, Required): Purchased items array.
    - `product` (`ObjectId`, FK -> `Product`, Required): Purchased product reference.
    - `quantity` (`Number`, Required, Min: `1`): Number of units ordered.
  - `totalItems` (`Number`, Required, Min: `1`): Total unit count across all items.
  - `deliveryName` (`String`, Required): Name of recipient.
  - `deliveryAddress` (`String`, Required): Full concatenated shipping address.
  - `promoCode` (`String`, Default: `""`, Uppercase): Applied discount code if any.
  - `discountAmount` (`Number`, Default: `0`, Min: `0`): Monetary amount discounted.
  - `totalAmount` (`Number`, Required, Min: `0`): Final charged amount.
  - `paymentStatus` (`String`, Enum: `["pending", "paid", "failed"]`, Default: `"pending"`): Gateway payment status.
  - `orderStatus` (`String`, Enum: `["placed", "shipped", "delivered", "returned"]`, Default: `"placed"`): Logistics fulfillment state.
  - `razorpayOrderId` (`String`, Required): Razorpay order identifier or points transaction token.
  - `paymentId` (`String`, Default: `""`): Gateway payment identifier.
  - `paidAt` (`Date`, Nullable, Default: `null`): Payment confirmation timestamp.
  - `deliveredAt` (`Date`, Nullable, Default: `null`): Delivery timestamp.
  - `returnedAt` (`Date`, Nullable, Default: `null`): Return processing timestamp.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.
- **Indexes:**
  - `{ user: 1, createdAt: -1 }`
  - `{ orderStatus: 1, createdAt: -1 }`
  - `{ paymentStatus: 1, createdAt: -1 }`

### 5. Carts Collection (`Cart`)
- **Purpose:** Persists shopping cart contents per user.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique cart identifier.
  - `user` (`ObjectId`, FK -> `User`, Required, Unique): User cart owner reference.
  - `items` (`Array<CartItemSubDocument>`, Default: `[]`): Cart item array.
    - `product` (`ObjectId`, FK -> `Product`, Required): Product reference.
    - `quantity` (`Number`, Required, Min: `1`): Quantity requested.
    - `color` (`String`, Optional): Selected color variant.
    - `size` (`String`, Enum: `["S", "M", "L", "XL"]`, Optional): Selected size variant.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

### 6. Wishlists Collection (`Wishlist`)
- **Purpose:** Stores bookmarked products per user.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique wishlist identifier.
  - `user` (`ObjectId`, FK -> `User`, Required, Unique): User wishlist owner reference.
  - `products` (`Array<ObjectId>`, Refs -> `Product`, Default: `[]`): Array of product references.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

### 7. Promos Collection (`Promo`)
- **Purpose:** Defines discount rules, validity dates, quota counts, and spend thresholds.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique promo identifier.
  - `code` (`String`, Required, Unique, Uppercase, Trim): Coupon code string.
  - `percentage` (`Number`, Required, Min: `1`, Max: `100`): Percentage discount.
  - `count` (`Number`, Required, Min: `1`): Remaining redemption count.
  - `minimumOrderValue` (`Number`, Required, Min: `0`): Minimum cart subtotal required.
  - `startsAt` (`Date`, Required): Activation timestamp.
  - `endsAt` (`Date`, Required): Expiration timestamp.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

### 8. Banners Collection (`Banner`)
- **Purpose:** Stores promotional hero banner image metadata for storefront display.
- **Fields:**
  - `_id` (`ObjectId`, PK): Unique banner identifier.
  - `imageUrl` (`String`, Required, Trim): Cloudinary image URL.
  - `imagePublicId` (`String`, Required, Trim): Cloudinary public identifier.
  - `createdBy` (`ObjectId`, FK -> `User`, Required): Admin creator reference.
  - `createdAt` / `updatedAt` (`Date`): Managed timestamps.

---

# 9 Entity Relationship Diagram

```text
+-----------------------+                    +-------------------------+
|         Users         | 1                N |         Orders          |
+-----------------------+--------------------+-------------------------+
| _id (PK)              |                    | _id (PK)                |
| clerkUserId (Unique)  |                    | user (FK -> Users)      |
| name                  |                    | customerName            |
| email                 |                    | customerEmail           |
| role [user | admin]   |                    | deliveryName            |
| points                |                    | deliveryAddress         |
| addresses [Embedded]  |                    | totalAmount             |
| createdAt / updatedAt |                    | paymentStatus           |
+-----------+-----------+                    | orderStatus             |
            |                                | razorpayOrderId         |
            | 1                              | items [Embedded Product]|
            |                                +-------------------------+
            | 1
            +--------------------+
            |                    |
            v 1                  v 1
+-----------------------+  +-----------------------+
|         Carts         |  |       Wishlists       |
+-----------------------+  +-----------------------+
| _id (PK)              |  | _id (PK)              |
| user (FK -> Users, UQ)|  | user (FK -> Users, UQ)|
| items: [              |  | products: [           |
|   product (FK->Prod)  |  |   product (FK->Prod)  |
|   quantity            |  | ]                     |
|   color, size         |  +-----------------------+
| ]                     |
+-----------------------+
            |
            | references
            v
+-----------------------+ 1                N +-------------------------+
|      Categories       |<-------------------+        Products         |
+-----------------------+                    +-------------------------+
| _id (PK)              |                    | _id (PK)                |
| name                  |                    | title, description      |
| createdAt / updatedAt |                    | category (FK -> Categ)  |
+-----------------------+                    | brand, stock, price     |
                                             | salePercentage, status  |
                                             | colors, sizes           |
                                             | images [Embedded]       |
                                             | createdBy (FK -> Users) |
                                             +------------+------------+
                                                          |
                                                          | references
+-----------------------+                                 |
|        Banners        |                                 v
+-----------------------+                    +-------------------------+
| _id (PK)              |                    |         Promos          |
| imageUrl              |                    +-------------------------+
| imagePublicId         |                    | _id (PK)                |
| createdBy (FK->Users) |                    | code (Unique)           |
+-----------------------+                    | percentage, count       |
                                             | minimumOrderValue       |
                                             | startsAt, endsAt        |
                                             +-------------------------+
```

---

# 10 Security

### Implemented Security Mechanisms
- **Authentication:** Verified via Clerk's Express SDK (`clerkMiddleware` and `requireAuth`), validating JWT tokens extracted from the HTTP `Authorization: Bearer <token>` header.
- **Authorization & Role Guards:** Server middleware (`requireAdmin`) resolves the database user via `clerkUserId` and enforces `role === "admin"` on all `/admin/*` routes. Client routing uses `RoleGuardLayout` to prevent unauthorized client rendering.
- **Cryptographic Payment Signature Verification:** Razorpay order confirmations require validating a cryptographic HMAC SHA256 signature generated with `RAZORPAY_KEY_SECRET` against `${razorpay_order_id}|${razorpay_payment_id}`.
- **CORS Configuration:** Configurable origins list (`CORS_ORIGINS`) with credential support enabled on the Express server.
- **Input Sanitization & Type Coercion:** Mandatory parameters, numeric constraints, and presence checks are strictly enforced via runtime assertion utilities (`requireText`, `requireNumber`, `requireFound`).
- **Memory-Bounded Uploads:** Multer file uploads are strictly limited to in-memory buffers with a `5MB` field size cap and a maximum of `10` files per request.

### Absent / Missing Security Controls
- No server-level IP rate limiting (`express-rate-limit` is not installed).
- No automated HTTP security response headers (`helmet` is not installed).
- No CSRF token exchange (mitigated by stateless Bearer token authorization instead of ambient cookies).

---

# 11 Authentication

### Authentication Provider & Architecture
Authentication is powered by **Clerk**. Clerk handles password hashing, OAuth identity providers, MFA, session lifecycle, and JSON Web Token (JWT) issuance.

### Token Strategy & Protected Requests
1. The client acquires a JWT session token via the Clerk React SDK (`useAuth().getToken()`).
2. An Axios request interceptor (`client/src/lib/api.ts`) injects the token into outgoing HTTP requests: `Authorization: Bearer <token>`.
3. The Express backend invokes `clerkMiddleware()` to parse incoming tokens into request context (`getAuth(req)`).
4. The custom `requireAuth` middleware verifies that `userId` exists, returning a `401 Unauthorized` response if absent.
5. The `getDbUserFromReq` utility queries the MongoDB `User` collection using `clerkUserId: userId` to attach database attributes (such as permissions and reward points).

### Authentication Flow Diagram

```text
+----------+                     +-----------+               +------------+              +------------+
|  Client  |                     |   Clerk   |               |   Server   |              |  MongoDB   |
+----+-----+                     +-----+-----+               +-----+------+              +-----+------+
     |                                 |                           |                           |
     | 1. Sign In (Credentials / OAuth)|                           |                           |
     +-------------------------------->|                           |                           |
     |                                 |                           |                           |
     | 2. Issue Session JWT Token      |                           |                           |
     |<--------------------------------+                           |                           |
     |                                                             |                           |
     | 3. POST /auth/sync (Bearer <token>)                         |                           |
     +------------------------------------------------------------>|                           |
     |                                                             | 4. Validate Token Context |
     |                                                             |    Extract userId         |
     |                                                             |                           |
     |                                                             | 5. Upsert User by ClerkID |
     |                                                             |    Set Role (Admin check) |
     |                                                             +-------------------------->|
     |                                                             |                           |
     |                                                             | 6. Return DB User Object  |
     |                                                             |<--------------------------+
     | 7. Return 200 OK (User Profile + Role)                      |                           |
     |<------------------------------------------------------------+                           |
     |                                                             |                           |
     | 8. Subsequent API Request (Bearer <token>)                  |                           |
     +------------------------------------------------------------>|                           |
     |                                                             | 9. requireAuth / Admin    |
     |                                                             |    Validate permissions   |
     |                                                             +-------------------------->|
```

---

# 12 API Documentation

### Summary Table

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | None | Service health status check |
| `POST` | `/auth/sync` | User | Synchronize Clerk user identity into MongoDB |
| `GET` | `/auth/me` | User | Retrieve current authenticated user profile |
| `GET` | `/customer/home` | None | Fetch storefront home feed (banners, categories, new arrivals, coupons) |
| `GET` | `/customer/categories` | None | Fetch active product categories |
| `GET` | `/customer/products` | None | Search and filter active products with facets and sorting |
| `GET` | `/customer/products/:id` | None | Fetch product details and related category products |
| `GET` | `/customer/addresses` | User | Retrieve customer address book |
| `POST` | `/customer/addresses` | User | Create a new customer shipping address |
| `PATCH` | `/customer/addresses/:addressId` | User | Update an existing customer shipping address |
| `DELETE` | `/customer/addresses/:addressId` | User | Delete a customer shipping address |
| `GET` | `/customer/cart` | User | Retrieve current user's shopping cart |
| `POST` | `/customer/cart/items` | User | Add an item with selected variants to cart |
| `PATCH` | `/customer/cart/items/:productId/increase` | User | Increment cart item quantity |
| `PATCH` | `/customer/cart/items/:productId/decrease` | User | Decrement cart item quantity |
| `DELETE` | `/customer/cart/items/:productId` | User | Remove item from cart |
| `POST` | `/customer/cart/sync` | User | Bulk synchronize local items into persistent cart |
| `GET` | `/customer/wishlist` | User | Retrieve user wishlist items |
| `POST` | `/customer/wishlist/items` | User | Add a product to user wishlist |
| `DELETE` | `/customer/wishlist/items/:productId` | User | Remove a product from wishlist |
| `POST` | `/customer/promos/apply` | User | Validate and apply promo code discount |
| `POST` | `/customer/checkout/create-session` | User | Create Razorpay order session and pending store order |
| `POST` | `/customer/checkout/confirm` | User | Verify payment signature, decrement stock, and finalize order |
| `GET` | `/customer/checkout/points` | User | Retrieve user's available reward points balance |
| `POST` | `/customer/checkout/pay-with-points` | User | Execute complete order checkout using reward points balance |
| `GET` | `/customer/orders` | User | Fetch authenticated user's order history |
| `PATCH` | `/customer/orders/:orderId/return` | User | Initiate customer order return (7-day window) and refund points |
| `GET` | `/admin/dashboard/lite` | Admin | Retrieve administrative sales and inventory metrics |
| `GET` | `/admin/categories` | Admin | List all product categories |
| `POST` | `/admin/categories` | Admin | Create a new product category |
| `PUT` | `/admin/categories/:id` | Admin | Update an existing product category |
| `GET` | `/admin/products` | Admin | Search and list all products for administration |
| `GET` | `/admin/products/:id` | Admin | Fetch product by ID for editing |
| `POST` | `/admin/products` | Admin | Create product with multipart image uploads |
| `PUT` | `/admin/products/:id` | Admin | Update product details and upload additional images |
| `GET` | `/admin/promos` | Admin | List all promotional coupon codes |
| `POST` | `/admin/promos` | Admin | Create a new promotional coupon code |
| `PATCH` | `/admin/promos/:promoId` | Admin | Update an existing promotional coupon code |
| `DELETE` | `/admin/promos/:promoId` | Admin | Delete a promotional coupon code |
| `GET` | `/admin/orders` | Admin | Retrieve all customer orders for fulfillment |
| `PATCH` | `/admin/orders/:orderId/status` | Admin | Update order fulfillment status |
| `GET` | `/admin/settings/banners` | Admin | Retrieve storefront hero banners |
| `POST` | `/admin/settings/banners` | Admin | Upload new storefront hero banners |

---

### Detailed Endpoint Specifications

#### Standard Response Format
All API responses follow the standard envelope format:
```json
{
  "status": "success",
  "data": {},
  "errors": []
}
```

#### Error Response Format
```json
{
  "status": "error",
  "data": null,
  "errors": [
    {
      "message": "Error description"
    }
  ]
}
```

---

#### `POST /auth/sync`
- **Purpose:** Synchronizes authenticated Clerk user identity into the database and resolves admin permissions.
- **Authentication:** Required (User).
- **Request Body:** None (Identity extracted from token context).
- **Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "60d5ec49f1b2c8b1f8e4e1a1",
      "clerkUserId": "user_2N0XYZ...",
      "email": "customer@example.com",
      "name": "Jane Doe",
      "role": "user"
    }
  },
  "errors": []
}
```

---

#### `POST /customer/checkout/create-session`
- **Purpose:** Creates a Razorpay payment order and generates an initial `pending` order in the store database.
- **Authentication:** Required (User).
- **Request Body:**
```json
{
  "addressId": "60d5ec49f1b2c8b1f8e4e1b2",
  "promoCode": "SUMMER20"
}
```
- **Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "razorpay": {
      "keyId": "rzp_test_...",
      "orderId": "order_EKmXYZ123",
      "amount": 160000,
      "currency": "INR"
    },
    "order": {
      "_id": "60d5ec49f1b2c8b1f8e4e1c3",
      "totalItems": 2,
      "discountAmount": 400,
      "totalAmount": 1600
    }
  },
  "errors": []
}
```

---

#### `POST /customer/checkout/confirm`
- **Purpose:** Cryptographically verifies Razorpay payment completion, decrements product inventory, clears the user's cart, and marks the order as `paid`.
- **Authentication:** Required (User).
- **Request Body:**
```json
{
  "orderId": "60d5ec49f1b2c8b1f8e4e1c3",
  "razorpay_order_id": "order_EKmXYZ123",
  "razorpay_payment_id": "pay_EKmABC456",
  "razorpay_signature": "e5b8d2..."
}
```
- **Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "_id": "60d5ec49f1b2c8b1f8e4e1c3"
  },
  "errors": []
}
```

---

#### `POST /customer/checkout/pay-with-points`
- **Purpose:** Executes a complete order payment using the customer's accumulated reward points balance.
- **Authentication:** Required (User).
- **Request Body:**
```json
{
  "addressId": "60d5ec49f1b2c8b1f8e4e1b2",
  "promoCode": "SUMMER20"
}
```
- **Response (200 OK):**
```json
{
  "status": "success",
  "data": {
    "_id": "60d5ec49f1b2c8b1f8e4e1c3",
    "totalPoints": 450
  },
  "errors": []
}
```

---

#### `POST /admin/products`
- **Purpose:** Creates a new product catalog item with multi-file image uploads to Cloudinary.
- **Authentication:** Required (Admin).
- **Content-Type:** `multipart/form-data`
- **Form Fields:**
  - `title`: Product title string
  - `description`: Detailed description string
  - `category`: Category ObjectId string
  - `brand`: Brand name string
  - `price`: Numeric base price
  - `salePercentage`: Numeric discount percentage
  - `stock`: Numeric available stock count
  - `status`: `"active"` or `"inactive"`
  - `colors`: Array of color strings
  - `sizes`: Array of size strings (`"S"`, `"M"`, `"L"`, `"XL"`)
  - `images`: 1 to 10 binary image files
- **Response (201 Created):** Returns the populated created product document.

---

# 13 Third-party Services

### 1. Clerk Authentication
- **Purpose:** Manages user identity, session tokens, login/signup widgets, and token validation.
- **Integration Points:** `@clerk/react` in frontend root and `@clerk/express` in backend middleware.

### 2. Cloudinary
- **Purpose:** Provides cloud media storage, hosting, and asset transformations for product and storefront banner images.
- **Integration Points:** Backend streaming utility (`server/src/utils/cloudinary.ts`) using `streamifier` to stream Multer memory buffers directly to Cloudinary folder endpoints.

### 3. Razorpay Payment Gateway
- **Purpose:** Provides payment processing, order currency subunit conversions (INR paise), checkout UI widgets, and HMAC-SHA256 signature verification.
- **Integration Points:** `server/src/utils/razorpay.ts` and checkout endpoints (`server/src/routes/customer/checkout.routes.ts`).

### 4. MongoDB Atlas / Local MongoDB
- **Purpose:** Document database persistence engine.
- **Integration Points:** Mongoose connection in `server/src/db.ts`.

---

# 14 Environment Variables

### Backend (`server/.env`)
| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `PORT` | Optional | Express server port (Defaults to `5000`) |
| `CORS_ORIGINS` | Required | Comma-separated list of allowed frontend origins (e.g. `http://localhost:5173,http://localhost:3000`) |
| `MONGO_URI` | Required | MongoDB connection connection string |
| `CLERK_PUBLISHABLE_KEY` | Required | Clerk public identifier for auth client initialization |
| `CLERK_SECRET_KEY` | Required | Clerk private API secret key for token validation |
| `ADMIN_EMAILS` | Required | Comma-separated list of email addresses granted automatic `admin` role upon sync |
| `CLOUDINARY_CLOUD_NAME` | Required | Cloudinary account cloud identifier |
| `CLOUDINARY_API_KEY` | Required | Cloudinary API access key |
| `CLOUDINARY_API_SECRET` | Required | Cloudinary API secret signature key |
| `RAZORPAY_KEY_ID` | Required | Razorpay public key identifier for checkout modal initialization |
| `RAZORPAY_KEY_SECRET` | Required | Razorpay private secret key for HMAC SHA256 payment signature verification |

### Frontend (`client/.env`)
| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `VITE_CLERK_PUBLISHABLE_KEY`| Required | Clerk publishable key for client SDK initialization |
| `VITE_BACKEND_URL` | Required | Root backend HTTP API URL (Defaults to `http://localhost:5000`) |

---

# 15 Major Dependencies

### Runtime Dependencies
- **`express` (`^5.2.1`):** Core HTTP web server framework delivering request routing and middleware chains.
- **`mongoose` (`^9.3.1`):** MongoDB Object Data Modeling (ODM) library providing schema validation, typed documents, and aggregation helpers.
- **`@clerk/express` & `@clerk/react`:** Authentication engine for JWT extraction, session management, and auth UI components.
- **`cloudinary` (`^2.9.0`):** Handles image uploads and asset delivery.
- **`razorpay` (`^2.9.6`):** Official SDK for creating payment orders and verifying signatures.
- **`multer` (`^2.1.1`):** Parses multipart/form-data requests for in-memory file uploads.
- **`zustand` (`^5.0.12`):** State management across customer and administrative features.
- **`axios` (`^1.13.6`):** Promise-based HTTP client managing token interceptors and response transformations.
- **`react-router-dom` (`^7.13.2`):** Client-side navigation, nested layout trees, and route guards.
- **`radix-ui` & `lucide-react`:** Accessible UI primitives and iconography.

---

# 16 Installation Guide

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** Active MongoDB Atlas instance or local MongoDB server
- **Third-Party Accounts:** Active accounts with Clerk, Cloudinary, and Razorpay

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Ecommerce-Store
```

### 2. Install Dependencies
Install dependencies for both server and client applications:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables
Create `.env` files in both `server/` and `client/` directories based on the configurations listed in [14 Environment Variables](#14-environment-variables).

### 4. Run Development Servers
Start the backend and frontend development servers in separate terminals:

```bash
# Terminal 1: Start Backend (Runs on http://localhost:5000)
cd server
npm run dev

# Terminal 2: Start Frontend (Runs on http://localhost:5173)
cd client
npm run dev
```

### 5. Production Build
```bash
# Build backend TypeScript
cd server
npm run build

# Start production backend server
npm start

# Build frontend production bundle
cd ../client
npm run build
```

---

# 17 Deployment

### Deployment Architecture

```text
+-------------------------------------------------------------------------+
|                              DEPLOYMENT                                 |
|                                                                         |
|  +-------------------------+                 +-----------------------+  |
|  |     Frontend Hosting    |                 |    Backend Hosting    |  |
|  | (Vercel / Netlify / S3) |                 | (Render / Railway /   |  |
|  |                         |                 |   AWS ECS / VPS)      |  |
|  |  * Static Vite SPA Dist |                 |  * Node.js + Express  |  |
|  |  * HTTPS / CDN Cached   |                 |  * TypeScript Output  |  |
|  +------------+------------+                 +-----------+-----------+  |
|               |                                          |              |
|               +--------------------+---------------------+              |
|                                    |                                    |
|                                    v                                    |
|                      +---------------------------+                      |
|                      |  Managed Database & Cloud |                      |
|                      |  * MongoDB Atlas Cluster  |                      |
|                      |  * Cloudinary Media CDN   |                      |
|                      |  * Razorpay API Gateway   |                      |
|                      |  * Clerk Identity Cloud   |                      |
|                      +---------------------------+                      |
+-------------------------------------------------------------------------+
```

- **Frontend Hosting:** The Vite React SPA builds into static HTML/CSS/JS assets (`client/dist`) suitable for deployment on Vercel, Netlify, AWS S3/CloudFront, or Cloudflare Pages.
- **Backend Hosting:** The Express backend builds to JavaScript (`server/dist`) and can be containerized or deployed to platform-as-a-service providers such as Render, Railway, AWS App Runner, or a standalone Node.js VPS.
- **Database:** MongoDB Atlas multi-region cluster with automated backups.

---

# 18 Request Lifecycle

```text
Incoming HTTP Request
       |
       v
[ Express Server Instance ]
       |
       +---> [ CORS Middleware ] (Validates origin from CORS_ORIGINS)
       |
       +---> [ express.json() ] (Parses JSON request payloads)
       |
       +---> [ morgan("dev") ] (Logs HTTP method, path, status, latency)
       |
       +---> [ clerkMiddleware() ] (Validates JWT Bearer tokens)
       |
       v
[ Route Matcher ]
       |
       +---> [ Multer Memory Storage ] (Optional: If multipart/form-data upload)
       |
       +---> [ requireAuth Middleware ] (Verifies active Clerk userId)
       |
       +---> [ requireAdmin Middleware ] (Queries DB to verify role === "admin")
       |
       v
[ Controller / Route Handler (asyncHandler) ]
       |
       +---> Input Validation & Parameter Assertion (requireText, requireNumber)
       |
       +---> Business Logic & Database Operation (Mongoose queries / transactions)
       |
       +---> External API Calls (Cloudinary buffer upload / Razorpay order creation)
       |
       v
[ Standard Response Envelope ]
       |
       +---> Success: res.status(200/201).json(ok(data))
       |
       v
[ Global Error Handler (errorHandler) ] (Invoked on uncaught exceptions or AppError)
       |
       +---> Error: res.status(statusCode).json(fail(message))
       |
       v
Client Receives Standardized JSON Response
```

---

# 19 Performance

### Implemented Optimizations
- **Mongoose `.lean()` Queries:** Read-only queries in high-throughput endpoints (`customer/home`, `customer/checkout`, `customer/orders`) execute with `.lean()` to bypass Mongoose hydration overhead and return raw JavaScript objects.
- **Selective Field Projections:** Database queries explicitly specify `.select("title brand price salePercentage images")` to minimize memory usage and payload transfer size.
- **Compound Database Indexing:** Dedicated compound indexes on the `Order` schema (`{ user: 1, createdAt: -1 }`, `{ orderStatus: 1, createdAt: -1 }`, `{ paymentStatus: 1, createdAt: -1 }`) ensure fast sorting and querying.
- **In-Memory Streaming Media Uploads:** Images uploaded via Multer are held in memory buffers and streamed directly to Cloudinary without temporary disk I/O.
- **Vite Bundler Code-Splitting:** Modern ES module bundling with dynamic chunk generation.

### Potential Bottlenecks
- **Unbounded Bulk Queries:** Endpoints such as `GET /admin/products` and `GET /admin/orders` return unpaginated datasets, which will increase latency as data grows.
- **Sequential Variant Updates:** Stock decrements in checkout loops execute sequentially rather than using bulk write operations (`bulkWrite`).

### Scalability Considerations
- Implement cursor-based or limit/offset pagination on product and order listings.
- Introduce Redis caching for category taxonomies and promotional banner configurations.

---

# 20 Security Review

### Current Security Strengths
- **Decoupled Auth Management:** Zero user password storage in the local database; all authentication is delegated to Clerk.
- **Cryptographic Signature Verification:** Razorpay webhook/confirm payloads are validated against cryptographic HMAC SHA256 hashes before stock is decremented or orders are marked as paid.
- **Role Verification via Database Query:** Admin routes query MongoDB (`role === "admin"`) on every request rather than trusting client-supplied claims.

### Current Risks & Recommended Improvements
- **Missing Rate Limiting:** Absence of rate limiting on endpoints like `/customer/promos/apply` exposes the application to brute-force coupon enumeration.
  - *Recommendation:* Introduce `express-rate-limit` on all public and customer routes.
- **Missing Security Headers:** Absence of Helmet middleware means response headers do not enforce Content Security Policy (CSP) or frame options.
  - *Recommendation:* Install and configure `helmet`.

---

# 21 Challenges & Engineering Decisions

### 1. Dual Checkout Modality (Gateway vs. Loyalty Points)
- **Decision:** Separate checkout flows were created for online credit/debit gateway transactions (`/checkout/create-session` + `/checkout/confirm`) versus loyalty points checkout (`/checkout/pay-with-points`).
- **Rationale:** Allows points-based orders to execute synchronously in a single atomic transaction without requiring third-party payment gateway callbacks, while ensuring stock is checked and decremented consistently across both paths.

### 2. Stream Buffer Uploads for Media Management
- **Decision:** Multer memory storage was combined with `streamifier` and Cloudinary upload streams.
- **Rationale:** Avoids writing temporary files to server disks, making the backend completely stateless and compatible with ephemeral cloud hosting environments (such as Render or AWS Lambda containers).

### 3. Standardized API Response Envelopes
- **Decision:** All routes wrap their output in helper envelopes (`ok()` and `fail()`).
- **Rationale:** Provides the frontend Axios interceptors with a consistent schema (`status`, `data`, `errors`), simplifying error handling across all Zustand stores.

---

# 22 Future Improvements

- **Pagination & Infinite Scrolling:** Add page and limit parameters to `/customer/products`, `/admin/products`, and `/admin/orders`.
- **Bulk Write Inventory Operations:** Refactor checkout stock decrement loops to use MongoDB `bulkWrite` for better transactional performance.
- **Automated Testing Suite:** Introduce unit and integration tests using Vitest for the frontend and Supertest/Jest for Express route testing.
- **Email Notifications:** Integrate a transactional email service (such as Resend or SendGrid) to dispatch order confirmation receipts and tracking updates.

---

# 23 Developer Notes

### Maintainability
- Code is cleanly divided by domain responsibility (`customer`, `admin`, `auth`) across both client and server codebases.
- TypeScript interfaces are maintained across models, stores, and API payload definitions.

### Code Consistency
- Async route handlers are consistently wrapped in `asyncHandler` to ensure all runtime rejections are caught by the global error handler middleware.
- Response payloads consistently use the `{ status, data, errors }` envelope structure.

---
Written by Yash Lagare
