import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { api } from "../../api/axios";
import ReportHeader from "../../components/reports/ReportHeader";
import SummaryCards from "../../components/reports/SummaryCards";
import ChartsSection from "../../components/reports/ChartsSection";
import InsightsSection from "../../components/reports/InsightsSection";
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
  const [, setLoading] = useState(true);

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
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg text-gray-500">Loading reports...</p>
      </div>
  <div className="space-y-6">

    <ReportHeader />

    <SummaryCards
      totalSales={totalSales}
      totalExpenses={totalExpenses}
      profit={profit}
      stockValue={stockValue}
    />

    <ChartsSection
      sales={sales}
      expenses={expenses}
      profit={profit}
    />

    <InsightsSection
      products={products}
      expenses={expenses}
      sales={sales}
    />

    {/* Charts will go here in Part 2 */}

  </div>
</AdminLayout>
  );
}