import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { api } from "../../api/axios";

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  const filteredProducts = data.products.filter((product: any) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Business Insights
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-6">

        <div className="bg-blue-600 text-white rounded-xl p-5 shadow">
          <h3>Total Stock Cost</h3>
          <p className="text-2xl font-bold mt-2">
            KES {data.totalStockCost.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-600 text-white rounded-xl p-5 shadow">
          <h3>Stock Value</h3>
          <p className="text-2xl font-bold mt-2">
            KES {data.totalStockValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-purple-600 text-white rounded-xl p-5 shadow">
          <h3>Expected Profit</h3>
          <p className="text-2xl font-bold mt-2">
            KES {data.expectedProfit.toLocaleString()}
          </p>
        </div>

        <div className="bg-red-600 text-white rounded-xl p-5 shadow">
          <h3>Low Stock Items</h3>
          <p className="text-2xl font-bold mt-2">
            {data.lowStockItems}
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search product..."
          className="border rounded-lg p-3 w-full md:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Product</th>

              <th className="p-3 text-left">Buying</th>

              <th className="p-3 text-left">Selling</th>

              <th className="p-3 text-left">Profit/Unit</th>

              <th className="p-3 text-left">Stock</th>

              <th className="p-3 text-left">Stock Cost</th>

              <th className="p-3 text-left">Stock Value</th>

              <th className="p-3 text-left">Expected Profit</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product: any) => (

              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3 font-semibold">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.buyingPrice}
                </td>

                <td className="p-3">
                  {product.sellingPrice}
                </td>

                <td className="p-3 text-green-600 font-bold">
                  {product.profitPerUnit}
                </td>

                <td className="p-3">
                  {product.quantity}
                </td>

                <td className="p-3">
                  {product.stockCost}
                </td>

                <td className="p-3">
                  {product.stockValue}
                </td>

                <td className="p-3 text-blue-700 font-bold">
                  {product.totalProfit}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}