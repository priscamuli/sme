import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CubeIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  ChartBarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

import logo from "../assets/logo.jpg";

const menu = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Products",
    path: "/products",
    icon: CubeIcon,
  },
  {
    name: "Sales",
    path: "/sales",
    icon: ShoppingCartIcon,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: BanknotesIcon,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: ChartBarIcon,
  },
  {
    name: "Business Insights",
    path: "/analytics",
    icon: ChartPieIcon,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Cog6ToothIcon,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 text-white min-h-screen shadow-xl">

      {/* Logo */}

      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-700">

        <img
          src={logo}
          alt="MGhetto Retailer"
          className="w-12 h-12 rounded-lg"
        />

        <div>

          <h1 className="text-xl font-bold">
            MGHETTO RETAILER
          </h1>

          <p className="text-sm text-slate-400">
            Retail Management
          </p>

        </div>

      </div>

      <nav className="mt-8 px-4">

        {menu.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >

              <Icon className="w-6 h-6" />

              <span>{item.name}</span>

            </NavLink>

          );

        })}

      </nav>

    </aside>
  );
}