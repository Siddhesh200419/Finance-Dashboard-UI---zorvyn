# fin.sight — Finance Dashboard

A structured and optimized React-based finance dashboard.

## Overview of Approach

The core objective was to transform a single-file HTML dashboard into a modern, scalable, and performant React application. 

### Key Architectural Decisions:
- **Component-Based Architecture**: Broken down the UI into logical, reusable components (Charts, Layout, Dashboard sections) to improve maintainability.
- **State Management**: Implemented a global `DashboardContext` using React's Context API to manage shared data like transactions and user roles, while keeping local UI state (like modal visibility) within relevant components.
- **Performance Optimization**: 
    - Used **Lazy Loading** (`React.lazy` and `Suspense`) to split the application into chunks, loading only what the user needs.
    - Applied **Memoization** (`React.memo`, `useMemo`, `useCallback`) to prevent unnecessary re-renders of heavy components like charts and tables.
- **Theme Management**: Integrated a custom `ThemeContext` that supports system-preference detection, manual toggling, and persistence via `localStorage`.

## Features

- **Overview Section**: Real-time summary cards, balance trends (Line Chart), and spending distribution (Doughnut Chart).
- **Transactions Section**: 
    - Full list of all financial records with advanced filtering (Type, Category).
    - Search functionality and multi-column sorting.
    - CSV Export capability for data portability.
    - **Admin Mode**: Special role-based access to add or remove transactions.
- **Insights Section**: Automated financial analysis including top spending categories, month-over-month trends, and savings rate evaluations.
- **Dynamic Dark/Light Mode**: A modern pill-style toggle for seamless switching between themes.
- **Responsive Design**: Optimized for all screen sizes, including specialized fixes for small devices like the iPhone SE.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (v7 or higher)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project folder:
   ```bash
   cd finance-Dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install specialized chart libraries**:
   ```bash
   npm install chart.js react-chartjs-2
   ```

### Running the Project

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the application**:
   The terminal will provide a local URL (typically `http://localhost:5173`). Open this in your browser to view the dashboard.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be generated in the `dist/` directory.
