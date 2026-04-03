# Zoorvyn — Finance Dashboard

A premium, production-quality finance dashboard SPA built with a **Dark Editorial Luxury** aesthetic. Designed for internship evaluation, demonstrating exceptional design judgment, clean architecture, and thoughtful UX.

## Tech Stack

| Technology | Purpose | Reasoning |
|---|---|---|
| **Next.js 16** | Framework | App Router, file-based routing, SSR/SSG, zero-config TypeScript |
| **React 19** | UI Library | Component-based architecture with hooks |
| **TypeScript** | Type Safety | Zero `any` types, proper interfaces throughout |
| **Tailwind CSS v4** | Styling | Utility-first with CSS variables, `@theme` directive |
| **shadcn/ui** | UI Components | Accessible, customizable, Radix primitives |
| **Zustand** | State Management | Lightweight, no boilerplate, built-in persist middleware |
| **Recharts** | Data Visualization | Composable charts, smooth animations, responsive containers |
| **Framer Motion** | Animations | Spring-based physics, layout animations, staggered reveals |
| **Lucide React** | Icons | Consistent, accessible, tree-shakeable icon set |
| **date-fns** | Date Utilities | Lightweight date formatting and manipulation |

## Setup

```bash
cd zoorvyn
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Features

### 📊 Dashboard
- **4 Summary Cards** — Total Balance, Monthly Income, Monthly Expenses, Savings Rate with animated number counters and trend badges
- **Balance Trend Chart** — 6-month area chart with gold gradient fill
- **Spending Breakdown** — Donut chart by category with interactive legend
- **Quick Stats** — Average daily spend, top merchant, largest transaction

### 💳 Transactions
- **Sortable Table** — Click column headers to sort by date, merchant, category, type, or amount
- **Advanced Filtering** — Search by text, filter by category (multi-select), type toggle (all/income/expense), date range picker
- **Pagination** — 10 items per page with smooth page navigation
- **RBAC Controls** — Admin-only: Add (FAB button), Edit (row hover), Delete actions
- **CSV Export** — Export filtered transactions as CSV (admin only)

### 📈 Insights
- **Top Spending Category** — Identifies highest expense category with percentage
- **Income vs Expense Ratio** — Progress bar visualization
- **Budget Alert** — Dynamic warning when expenses exceed 80% of income
- **Monthly Comparison Chart** — Side-by-side bar chart of income vs expenses
- **Top 3 Merchants** — Ranked by total spend with animated bars
- **Savings Trend** — 6-month area chart of monthly savings

### 🔐 Role-Based Access Control (RBAC)

Switch between **Admin** and **Viewer** roles via the dropdown in the top bar.

| Feature | Viewer | Admin |
|---|---|---|
| View all pages | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit/Delete transactions | ❌ | ✅ |
| Export CSV | ❌ | ✅ |

- Role is **persisted in localStorage** under key `zoorvyn-role`
- Default role: `viewer`
- UI updates instantly on role switch — no page reload needed

### 🌓 Dark/Light Mode
- Toggle via moon/sun icon in the top bar
- Persisted in localStorage under key `zoorvyn-theme`
- Smooth CSS transition on theme switch
- Both themes maintain the premium editorial aesthetic

### 📱 Responsive Layout
- **Desktop**: 4-column card grid, expanded sidebar with labels
- **Tablet**: 2-column card grid, collapsible sidebar
- **Mobile**: Stacked cards, bottom navigation bar, horizontally scrollable table

## State Management

Three Zustand stores with clear separation of concerns:

```
store/
├── useTransactionStore.ts  →  transactions[], add/edit/delete
├── useRoleStore.ts         →  role state, persisted to localStorage
└── useFilterStore.ts       →  search, categories, type, dateRange, sort, page
```

**Why Zustand over Redux/Context?**
- Zero boilerplate — no providers, reducers, or action types
- Built-in `persist` middleware for localStorage
- Selective re-renders by default (no unnecessary component updates)
- Tiny bundle size (~1KB gzipped)

## Design Decisions

### Aesthetic: "Dark Editorial Luxury"

| Choice | Reasoning |
|---|---|
| **Charcoal `#0C0F14`** background | Warm dark, not cold pure black — feels premium |
| **Amber Gold `#D4A853`** accent | Conveys wealth, trust — distinct from generic fintech blue |
| **Playfair Display** (serif) for numbers | Editorial authority — like a financial publication |
| **Outfit** (sans-serif) for UI | Clean, geometric — modern without being generic like Inter |
| **Glassmorphic cards** | Subtle depth with `backdrop-blur` — avoids flat card fatigue |
| **Teal `#2DD4A8`** for positive | Natural complement to gold — income/growth indicators |
| **Rose `#F43F5E`** for negative | Clear danger signal — expenses/losses/alerts |

### Architecture Principles
- **Component modularity** — Each component under 150 lines
- **No magic numbers** — All values in types/constants
- **No placeholder text** — All content uses realistic Indian merchants and data
- **Type safety** — Zero `any` types across the entire codebase
- **Consistent naming** — PascalCase components, camelCase functions, kebab-case files

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              (Root layout with fonts + providers)
│   ├── page.tsx                (Dashboard page)
│   ├── transactions/page.tsx   (Transactions page)
│   ├── insights/page.tsx       (Insights page)
│   └── globals.css             (Design tokens + animations)
├── components/
│   ├── layout/                 (Sidebar, Topbar, PageWrapper)
│   ├── dashboard/              (SummaryCard, BalanceTrendChart, SpendingPieChart, QuickStats)
│   ├── transactions/           (TransactionTable, FilterBar, TransactionModal)
│   ├── insights/               (InsightCard, MonthlyComparisonChart, SpendingAlert, TopMerchants, SavingsTrendChart)
│   └── shared/                 (RoleSwitcher, EmptyState, LoadingState, AnimatedNumber, ThemeToggle)
├── store/                      (Zustand stores)
├── data/mockData.ts            (60 realistic transactions)
├── types/index.ts              (All TypeScript interfaces)
└── utils/formatters.ts         (Currency, date, category helpers)
```

## Mock Data

60 realistic transactions spanning **October 2025 — March 2026** with:
- 10 categories: Food, Transport, Shopping, Utilities, Salary, Freelance, Entertainment, Healthcare, Rent, Investment
- Indian merchants: Swiggy, Ola, Amazon, Myntra, Zerodha, BigBasket, Zomato, Housing Society, etc.
- Mix of income (salary, freelance, dividends) and expenses
- INR (₹) currency formatting

## Known Limitations / Future Improvements

- **No backend** — Uses client-side state only; would integrate with REST/GraphQL API in production
- **No authentication** — Role switching is a UI demo, not security
- **Chart SSR warnings** — Recharts requires DOM dimensions, produces harmless console warnings during static generation
- **Limited date range** — 6 months of data; production would support custom ranges
- **No i18n** — Currently English/INR only; could add multi-currency support

---

Built with ❤️. Every pixel matters.
