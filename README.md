# fin.sight — Finance Dashboard

A personal finance dashboard built with React. Track spending, view trends, and get quick insights — all in one place.

---

## What is this?

fin.sight lets you monitor your finances in a clean, fast interface. Browse transactions, spot spending patterns, export your data, and toggle between light and dark mode. Built to be responsive, so it works on phones too.

---

## Features

- **Summary cards** — Quick look at your balance, income, and expenses
- **Charts** — Line chart for balance trends, donut chart for spending by category
- **Transactions** — Filter by type/category, search, sort by any column, and export to CSV
- **Admin mode** — Role-based access to add or delete transactions
- **Insights** — Top spending categories, month-over-month changes, and savings rate
- **Dark / Light mode** — Toggles anytime, preference saved to localStorage
- **Responsive** — Works across all screen sizes, including small phones like iPhone SE

---

## How it's built

**Component structure** — The UI is split into logical folders: `Charts`, `Layout`, and `Dashboard`. Each piece is its own component, so it's easy to find, edit, or reuse things without touching unrelated code.

**State management** — Shared data (like transactions and user role) lives in a global `DashboardContext` via React's Context API. Local UI stuff like modal open/close stays inside the component that needs it.

**Performance** — Heavy components like charts and tables are wrapped in `React.memo` to skip unnecessary re-renders. `useMemo` and `useCallback` are used where recalculating on every render would be wasteful. The app also uses `React.lazy` + `Suspense` for code splitting, so only what's needed gets loaded.

**Theming** — A custom `ThemeContext` handles dark/light mode. It checks your system preference on first load, lets you override it manually, and remembers your choice in `localStorage`.

---

## Getting Started

You'll need **Node.js v16+** and **npm v7+**.

**1. Navigate to the project folder:**
```bash
cd Finance-Dashboard
```

**2. Install dependencies:**
```bash
npm install
```

**3. Install the charting library:**
```bash
npm install chart.js react-chartjs-2
```

**4. Run the dev server:**
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Build for Production
```bash
npm run build
```

Output goes into the `dist/` folder, ready to deploy.