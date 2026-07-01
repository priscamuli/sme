import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white">
      <div className="p-4 text-xl font-bold border-b border-slate-700">
        SME System
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/dashboard"
          className="block p-2 rounded hover:bg-slate-700"
        >
          Dashboard
        </Link>

        <Link
          to="/products"
          className="block p-2 rounded hover:bg-slate-700"
        >
          Products
        </Link>

        <Link
          to="/sales"
          className="block p-2 rounded hover:bg-slate-700"
        >
          Sales
        </Link>

        <Link
          to="/expenses"
          className="block p-2 rounded hover:bg-slate-700"
        >
          Expenses
        </Link>
      </nav>
    </aside>
  );
}