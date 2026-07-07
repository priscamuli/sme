import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import DashboardCard from "../../components/DashboardCard";
import SalesChart from "../../components/SalesChart";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState({
    totalProducts:0,
    todaySales: 0,
    todayExpenses: 0,
    profit: 0,
    lowStockCount: 0,
    weeklySales: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("https://sme-higt.onrender.com/dashboard");
      const data = await res.json();

      setDashboard(data);
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  return (
    <AdminLayout>

      <div className="space-y-8">

  <h1 className="text-4xl font-bold">
    Welcome Back 👋
  </h1>

  <p className="text-gray-500">
    Here's what's happening in your shop today.
  </p>

  <div className="grid md:grid-cols-4 gap-6">

    <DashboardCard
      title="Today's Sales"
      value={`KES ${dashboard.todaySales.toLocaleString()}`}
      color="bg-green-100"
      icon={<span className="text-3xl">💰</span>}
    />

    <DashboardCard
      title="Today's Expenses"
      value={`KES ${dashboard.todayExpenses.toLocaleString()}`}
      color="bg-red-100"
      icon={<span className="text-3xl">💸</span>}
    />

    <DashboardCard
      title="Profit"
      value={`KES ${dashboard.profit.toLocaleString()}`}
      color="bg-blue-100"
      icon={<span className="text-3xl">📈</span>}
    />

    <DashboardCard
      title="Low Stock"
      value={dashboard.lowStockCount}
      color="bg-yellow-100"
      icon={<span className="text-3xl">📦</span>}
    />

  </div>

  <div className="grid lg:grid-cols-3 gap-6">

    <div className="lg:col-span-2">
      <SalesChart
          data={dashboard.weeklySales}
          />
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-4">
        Inventory Summary
      </h2>

      <div className="space-y-5">

       <div className="flex justify-between">
  <span>Total Products</span>
  <strong>{dashboard.totalProducts}</strong>
</div>

        <div className="flex justify-between">
          <span>Low Stock</span>
          <strong>{dashboard.lowStockCount}</strong>
        </div>

        <div className="flex justify-between">
          <span>Today's Profit</span>
          <strong>
            KES {dashboard.profit.toLocaleString()}
          </strong>
        </div>

      </div>

    </div>

  </div>

      </div>
    </AdminLayout>
  );
}