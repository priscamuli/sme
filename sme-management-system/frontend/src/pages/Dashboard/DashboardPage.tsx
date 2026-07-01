import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState({
    todaySales: 0,
    todayExpenses: 0,
    profit: 0,
    lowStockCount: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch("https://miniature-goggles-pj7996pr75v9377g4-3000.app.github.dev/dashboard");
      const data = await res.json();

      setDashboard(data);
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Sales */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Today's Sales</h3>
          <p className="text-2xl font-bold">
            KES {dashboard.todaySales}
          </p>
        </div>

        {/* Expenses */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Today's Expenses</h3>
          <p className="text-2xl font-bold">
            KES {dashboard.todayExpenses}
          </p>
        </div>

        {/* Profit */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Profit</h3>
          <p className={`text-2xl font-bold ${dashboard.profit < 0 ? "text-red-500" : "text-green-600"}`}>
            KES {dashboard.profit}
          </p>
        </div>

        {/* Products / Low Stock */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Low Stock Products</h3>
          <p className="text-2xl font-bold">
            {dashboard.lowStockCount}
          </p>
        </div>

      </div>
    </AdminLayout>
  );
}