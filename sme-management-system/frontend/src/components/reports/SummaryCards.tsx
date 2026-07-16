import {
  DollarSign,
  Wallet,
  TrendingUp,
  Package,
} from "lucide-react";

interface Props {
  totalSales: number;
  totalExpenses: number;
  profit: number;
  stockValue: number;
}

export default function SummaryCards({
  totalSales,
  totalExpenses,
  profit,
  stockValue,
}: Props) {
  const cards = [
    {
      title: "Total Sales",
      value: totalSales,
      icon: DollarSign,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Expenses",
      value: totalExpenses,
      icon: Wallet,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Net Profit",
      value: profit,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Inventory Value",
      value: stockValue,
      icon: Package,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">

                  KES {card.value.toLocaleString()}

                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}