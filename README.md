# 🚀 CargoPilot — Enterprise Courier & Logistics Management Platform

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern, full-stack courier logistics and shipment management platform engineered for real-time parcel tracking, dynamic shipping rate calculation, and end-to-end logistics hub operations.

---

## 📌 Executive Summary

**CargoPilot** bridges the gap between customer-facing parcel tracking and backend operational logistics. Built with a unified full-stack architecture combining a reactive **React SPA** with a resilient **Express.js REST API**, the platform delivers instant shipment transparency for consumers and comprehensive operational control for logistics dispatchers and station managers.

---

## ⚡ Instant Demo & Testing Credentials

For evaluators and recruiters reviewing this repository:

| Portal | Role | Email | Password | Access Details |
|---|---|---|---|---|
| **Operations Console** | System Admin | `admin@cargopilot.com` | `admin123` | Full access to parcel dispatch, checkpoint management, and analytics |
| **Customer Tracking** | Public User | *No login needed* | *N/A* | Track sample ID: `IND-82914710` or `IND-90184712` |

> 💡 **Quick Demo Feature**: The login screen includes a **"1-Click Admin Demo Login"** button for instant access without manual typing.

---

## 🎯 Key Capabilities & Features

### 📦 1. Customer & Public Experience
- **Real-Time Parcel Tracking**: Track shipments using unique tracking IDs (`IND-XXXXXXXX`) with an interactive visual milestone timeline showing hub-to-hub movements.
- **Dynamic Shipping Rate Calculator**: Computes delivery quotes instantly based on weight, package volume, shipment category (documents, electronics, fragile goods, express cargo), and delivery type (Standard vs. Express Priority).
- **Consignment Overview**: Displays consignor/consignee metadata, origin, destination, estimated delivery date, and current transit status.
- **Responsive Navigation**: Mobile-first design with smooth transitions and dedicated informational portals (About, Services, Coverage, Contact).

### 🛠️ 2. Logistics Operations & Admin Console
- **Operations Dashboard**: Real-time KPI counters for active shipments, revenue metrics, delivered parcels, and monthly performance charts.
- **Shipment Creation & Waybill Generation**: Generate new consignments with automated tracking ID generation, cost calculation, and initial hub dispatch checkpoints.
- **Milestone & Checkpoint Logger**: Append physical transit checkpoints (e.g., *Arrived at Sorting Facility*, *Customs Cleared*, *Out for Delivery*) with station timestamps and operator signatures.
- **Shipment Status Management**: Progress orders across lifecycles (`arrived` ➔ `in_transit` ➔ `out_for_delivery` ➔ `delivered` / `returned`).
- **Comprehensive Search & Filtering**: Multi-parameter search by tracking ID, recipient, status, origin, destination, or date range.
- **Analytics & Revenue Reporting**: Weight distribution graphs, status breakdowns, and monthly parcel volume metrics.
- **Admin Access Control**: Provision secondary operators with role-based access control (RBAC).

---

## 🏗️ Architecture & System Design

CargoPilot uses an enterprise-grade full-stack architecture that combines client-side reactivity with server-side speed:

```
                                 ┌───────────────────────────┐
                                 │   Web Browser / Client    │
                                 │  (React 18 + Tailwind UI) │
                                 └─────────────┬─────────────┘
                                               │
                                 HTTP / REST   │  Port 3000
                                               ▼
                     ┌───────────────────────────────────────────────────┐
                     │            Express.js Application Server          │
                     │  ┌──────────────────────────────────────────────┐ │
                     │  │ Middleware: Helmet, CORS, Compression,       │ │
                     │  │ Morgan, Trust-Proxy, Rate Limiting (IP)      │ │
                     │  └──────────────────────┬───────────────────────┘ │
                     │                         │                         │
                     │  ┌──────────────────────┴───────────────────────┐ │
                     │  │            Route Handlers / API              │ │
                     │  │  • /api/auth       • /api/parcels            │ │
                     │  │  • /api/dashboard  • /api/analytics          │ │
                     │  └──────────────────────┬───────────────────────┘ │
                     └─────────────────────────┼─────────────────────────┘
                                               │
                       ┌───────────────────────┴───────────────────────┐
                       │                                               │
              [MONGO_URI Present]                             [Fallback Mode]
                       ▼                                               ▼
          ┌──────────────────────────┐                    ┌──────────────────────────┐
          │     MongoDB Database     │                    │  In-Memory Data Store    │
          │    (Mongoose ODM)        │                    │  (Zero-Setup Seed Data)  │
          └──────────────────────────┘                    └──────────────────────────┘
```

### 🧠 Resilient Dual-Database Architecture
To ensure zero deployment friction and 100% demo availability:
- **Primary**: Connects to MongoDB when `MONGO_URI` is provided in environment variables.
- **Failover / In-Memory Mock Engine**: If MongoDB is not configured or temporarily unreachable, the app seamlessly falls back to a high-fidelity in-memory transactional store seeded with realistic courier data, active shipments, and checkpoint histories.

---

## 💻 Tech Stack

### Frontend
- **React 18**: Component-driven UI architecture with custom hooks.
- **React Router v6 (v7 Future Flag Opt-in)**: Declarative routing with `v7_startTransition` and `v7_relativeSplatPath` enabled.
- **Tailwind CSS**: Utility-first responsive design system.
- **Lucide Icons**: Crisp, lightweight vector iconography.
- **Recharts**: Data visualization for delivery performance and revenue trends.
- **Sonner & Radix UI Primitives**: Accessible modal dialogs, tooltips, and toast notifications.
- **Vite 5**: Sub-millisecond HMR and lightning-fast ESBuild bundling.

### Backend
- **Node.js 22 & Express.js**: RESTful service layer with modular controller-service-repository patterns.
- **JWT (JSON Web Tokens)**: Stateless authorization headers (`Bearer <token>`) for protected admin endpoints.
- **Bcrypt.js**: Cryptographic password hashing for operator authentication.
- **Express-Rate-Limit**: Tiered rate limiters protecting against brute-force and DDoS vectors.
- **Helmet & CORS**: HTTP security headers and granular origin policy enforcement.
- **Swagger / OpenAPI**: Standardized API documentation.

---

## 🔒 Security & Reliability Engineering

1. **Reverse-Proxy Compatibility**: Configured `app.set("trust proxy", 1)` ensuring accurate IP resolution and rate-limiting behind Cloud Run, Nginx, or AWS ALB reverse proxies.
2. **Buffer-Free Database Resilience**: Mongoose `bufferCommands` set to `false` to fail fast and divert to memory store rather than hanging on cold network sockets.
3. **Password Security**: Salted bcrypt hashing with automatic validation middleware.
4. **Input Sanitization**: Request validation on all parcel creation and pricing calculation endpoints.

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Authenticates admin and returns JWT |
| `POST` | `/api/auth/register` | Protected (Admin) | Registers new staff/admin member |
| `GET` | `/api/parcels/track/:trackingId` | Public | Returns shipment details and checkpoint history |
| `POST` | `/api/parcels/calculate-cost` | Public | Computes real-time shipping estimate |
| `GET` | `/api/parcels` | Protected (Admin) | Lists parcels with pagination and filters |
| `POST` | `/api/parcels` | Protected (Admin) | Dispatches a new parcel shipment |
| `GET` | `/api/parcels/:id` | Protected (Admin) | Fetches single parcel details by MongoDB/Store ID |
| `PATCH`| `/api/parcels/:id/status` | Protected (Admin) | Updates shipment status |
| `POST` | `/api/parcels/:id/checkpoint` | Protected (Admin) | Appends transit hub checkpoint |
| `GET` | `/api/dashboard/stats` | Protected (Admin) | Aggregated operational KPI metrics |
| `GET` | `/api/analytics/summary` | Protected (Admin) | Summary data for charts and reporting |
| `GET` | `/health` | Public | Application health and readiness check |

---

## 📂 Project Structure

```
├── backend/
│   ├── config/              # Swagger & environment configuration
│   ├── controllers/         # Express request handlers
│   ├── db/                  # MongoDB connector & in-memory failover engine
│   ├── middlewares/         # JWT auth, rate limiters, error handlers
│   ├── models/              # Mongoose schemas (User, Parcel, Checkpoint)
│   ├── routes/              # Express API route modules
│   └── services/            # Business logic (pricing calculator, analytics)
├── src/
│   ├── components/          # Reusable UI components (Navbar, Footer, Modals)
│   ├── context/             # AuthContext & global state providers
│   ├── pages/               # Public & Admin views
│   │   ├── Home.jsx         # Customer landing portal
│   │   ├── TrackParcel.jsx  # Live milestone tracking page
│   │   ├── CostCalculator.jsx # Pricing calculation tool
│   │   ├── Login.jsx        # Admin sign-in screen
│   │   ├── Dashboard.jsx    # Metrics and operational overview
│   │   ├── CreateParcel.jsx # Consignment booking form
│   │   └── ManageParcels.jsx # Search, filter, and shipment controls
│   ├── App.jsx              # Main routing & layout configuration
│   └── main.jsx             # React DOM entry point
├── server.js                # Unified Express + Vite full-stack server
├── package.json             # Scripts & dependencies
└── README.md                # Project documentation
```

---

## 🛠️ Local Development & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- *(Optional)* **MongoDB**: Local or Atlas instance (works automatically out-of-the-box without it)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cargopilot.git
   cd cargopilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional)
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=super_secret_jwt_key_cargopilot_2026
   # MONGO_URI=mongodb://localhost:27017/cargopilot (Optional: falls back to in-memory store if omitted)
   ```

4. **Start the Application**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   - Access the platform at: `http://localhost:3000`
   - Access Swagger API Docs at: `http://localhost:3000/api/docs`

---

## 👨‍💻 Author & Engineering Highlights

Designed and developed with:
- **Clean Architecture Principles**: Separation of concerns between routing, controller validation, service business logic, and database persistence.
- **Production Defensive Programming**: Graceful degradation, fail-safe rate limiting, structured error envelopes, and automated seed states for rapid stakeholder review.

---

*CargoPilot — Precision Logistics, Delivered.*
