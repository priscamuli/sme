interface Product {
  id: string;
  name: string;
  quantity: number;
  buyingPrice: number;
  sellingPrice: number;
}

interface Expense {
  title: string;
  amount: number;
  category: string;
}

interface Sale {
  total: number;
  user: {
    name: string;
  };
  createdAt: string;
}

interface Props {
  products: Product[];
  expenses: Expense[];
  sales: Sale[];
}

export default function InsightsSection({
  products,
  expenses,
  sales,
}: Props) {

  const lowStock = products
    .filter((p) => p.quantity <= 5)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 5);

  const topProducts = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const recentSales = [...sales]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* Low Stock */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          ⚠ Low Stock Alerts
        </h2>

        {lowStock.length === 0 ? (
          <p className="text-green-600">
            All products are sufficiently stocked.
          </p>
        ) : (
          lowStock.map((product) => (
            <div
              key={product.id}
              className="flex justify-between py-3 border-b last:border-0"
            >
              <span>{product.name}</span>

              <span className="text-red-600 font-bold">
                {product.quantity} left
              </span>
            </div>
          ))
        )}

      </div>

      {/* Inventory Value */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          📦 Top Inventory Value
        </h2>

        {topProducts.map((product) => (

          <div
            key={product.id}
            className="flex justify-between py-3 border-b last:border-0"
          >
            <span>{product.name}</span>

            <span className="font-semibold">
              KES {(product.buyingPrice * product.quantity).toLocaleString()}
            </span>

          </div>

        ))}

      </div>

      {/* Highest Expenses */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          💸 Highest Expenses
        </h2>

        {topExpenses.map((expense, index) => (

          <div
            key={index}
            className="flex justify-between py-3 border-b last:border-0"
          >
            <div>

              <p className="font-medium">
                {expense.title}
              </p>

              <p className="text-sm text-gray-500">
                {expense.category}
              </p>

            </div>

            <span className="font-semibold text-red-600">
              KES {expense.amount.toLocaleString()}
            </span>

          </div>

        ))}

      </div>

      {/* Recent Sales */}

      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-5">
          🧾 Recent Sales
        </h2>

        {recentSales.map((sale, index) => (

          <div
            key={index}
            className="flex justify-between py-3 border-b last:border-0"
          >
            <div>

              <p className="font-medium">
                {sale.user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(sale.createdAt).toLocaleString()}
              </p>

            </div>

            <span className="font-semibold text-green-700">
              KES {sale.total.toLocaleString()}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}