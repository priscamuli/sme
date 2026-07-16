import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface Sale {
  total: number;
  createdAt: string;
}

interface Expense {
  amount: number;
  category: string;
}

interface Props {
  sales: Sale[];
  expenses: Expense[];
  profit: number;
}

export default function ChartsSection({
  sales,
  expenses,
  profit,
}: Props) {

  // Last 7 sales
  const salesData = sales
    .slice(-7)
    .map((sale) => ({
      date: new Date(sale.createdAt).toLocaleDateString("en-KE", {
        day: "numeric",
        month: "short",
      }),
      sales: sale.total,
    }));

  // Expense categories
  const expenseMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    expenseMap[expense.category] =
      (expenseMap[expense.category] || 0) + expense.amount;
  });

  const expenseData = Object.entries(expenseMap).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  const profitData = [
    {
      name: "Sales",
      amount: sales.reduce((s, x) => s + x.total, 0),
    },
    {
      name: "Expenses",
      amount: expenses.reduce((s, x) => s + x.amount, 0),
    },
    {
      name: "Profit",
      amount: profit,
    },
  ];

  const COLORS = [
    "#16a34a",
    "#2563eb",
    "#ea580c",
    "#9333ea",
    "#dc2626",
    "#0891b2",
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Sales Trend */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-xl font-semibold mb-5">
          📈 Sales Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#16a34a"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Expense Pie */}

      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-xl font-semibold mb-5">
          🥧 Expense Categories
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {expenseData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Profit */}

      <div className="bg-white rounded-2xl shadow-sm border p-6 lg:col-span-2">

        <h2 className="text-xl font-semibold mb-5">
          📊 Business Performance
        </h2>

        <ResponsiveContainer width="100%" height={320}>

          <BarChart data={profitData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="amount"
              fill="#2563eb"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}