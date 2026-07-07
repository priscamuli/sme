import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { api } from "../../api/axios";

interface Sale {
  id: string;
  total: number;
  createdAt: string;
  user: {
    name: string;
  };
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

interface Product {
  id: string;
  name: string;
  quantity: number;
  buyingPrice: number;
  sellingPrice: number;
}

export default function ReportsPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const [salesRes, expenseRes, productRes] =
        await Promise.all([
          api.get("/sales"),
          api.get("/expenses"),
          api.get("/products"),
        ]);

      setSales(salesRes.data);
      setExpenses(expenseRes.data);
      setProducts(productRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalSales = sales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const profit = totalSales - totalExpenses;

  const stockValue = products.reduce(
    (sum, product) =>
      sum + product.buyingPrice * product.quantity,
    0
  );

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Reports
          </h1>

          <p className="text-gray-500">
            MGhetto Retailer Business Reports
          </p>
        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-4 gap-5">

          <div className="bg-green-600 text-white rounded-xl p-5 shadow">
            <p>Total Sales</p>
            <h2 className="text-3xl font-bold mt-2">
              KES {totalSales.toLocaleString()}
            </h2>
          </div>

          <div className="bg-red-600 text-white rounded-xl p-5 shadow">
            <p>Total Expenses</p>
            <h2 className="text-3xl font-bold mt-2">
              KES {totalExpenses.toLocaleString()}
            </h2>
          </div>

          <div className="bg-blue-600 text-white rounded-xl p-5 shadow">
            <p>Net Profit</p>
            <h2 className="text-3xl font-bold mt-2">
              KES {profit.toLocaleString()}
            </h2>
          </div>

          <div className="bg-purple-600 text-white rounded-xl p-5 shadow">
            <p>Inventory Value</p>
            <h2 className="text-3xl font-bold mt-2">
              KES {stockValue.toLocaleString()}
            </h2>
          </div>

        </div>

        {/* SALES */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              Sales Report
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Cashier</th>
                <th className="p-3 text-left">Amount</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={3}
                    className="text-center p-6"
                  >
                    Loading...
                  </td>
                </tr>

              ) : sales.length === 0 ? (

                <tr>
                  <td
                    colSpan={3}
                    className="text-center p-6"
                  >
                    No Sales Found
                  </td>
                </tr>

              ) : (

                sales.map((sale) => (

                  <tr
                    key={sale.id}
                    className="border-t"
                  >

                    <td className="p-3">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {sale.user?.name}
                    </td>

                    <td className="p-3 font-semibold">
                      KES {sale.total}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* EXPENSES */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              Expense Report
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">
                  Date
                </th>

                <th className="p-3 text-left">
                  Title
                </th>

                <th className="p-3 text-left">
                  Category
                </th>

                <th className="p-3 text-left">
                  Amount
                </th>
              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {new Date(
                      expense.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {expense.title}
                  </td>

                  <td className="p-3">
                    {expense.category}
                  </td>

                  <td className="p-3">
                    KES {expense.amount}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* INVENTORY */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">
              Inventory Report
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-3 text-left">
                  Product
                </th>

                <th className="p-3 text-left">
                  Buying
                </th>

                <th className="p-3 text-left">
                  Selling
                </th>

                <th className="p-3 text-left">
                  Stock
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {product.name}
                  </td>

                  <td className="p-3">
                    KES {product.buyingPrice}
                  </td>

                  <td className="p-3">
                    KES {product.sellingPrice}
                  </td>

                  <td
                    className={`p-3 font-semibold ${
                      product.quantity <= 5
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.quantity}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}