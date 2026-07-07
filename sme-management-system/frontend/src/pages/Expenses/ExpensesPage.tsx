import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../../services/expenseService";

interface Expense {
  id: string;
  category: string;
  title: string;
  amount: number;
  createdAt: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [form, setForm] = useState({
  title: "",
  category: "",
  amount: "",
});

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.category) {
      alert("Please select a category");
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {
      await createExpense({
  title: form.title,
  category: form.category,
  amount: Number(form.amount),
});

      setForm({
        category: "",
        title: "",
        amount: "",
      });

      loadExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const averageExpense =
    expenses.length > 0
      ? totalExpenses / expenses.length
      : 0;

  return (
    <AdminLayout>
      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Expense Management
        </h1>

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-blue-600 text-white rounded-lg p-5 shadow">
            <h2>Total Expenses</h2>

            <p className="text-3xl font-bold mt-2">
              KES {totalExpenses.toLocaleString()}
            </p>
          </div>

          <div className="bg-green-600 text-white rounded-lg p-5 shadow">
            <h2>Number of Expenses</h2>

            <p className="text-3xl font-bold mt-2">
              {expenses.length}
            </p>
          </div>

          <div className="bg-purple-600 text-white rounded-lg p-5 shadow">
            <h2>Average Expense</h2>

            <p className="text-3xl font-bold mt-2">
              KES {averageExpense.toFixed(2)}
            </p>
          </div>

        </div>

        {/* Form */}

        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-xl font-semibold mb-5">
            Add New Expense
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >

            <select
              className="border rounded-lg p-3"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option>Rent</option>
              <option>Utilities</option>
              <option>Electricity</option>
              <option>Water</option>
              <option>Internet</option>
              <option>Transport</option>
              <option>Fuel</option>
              <option>Salaries</option>
              <option>Marketing</option>
              <option>Maintenance</option>
              <option>Inventory Purchase</option>
              <option>Office Supplies</option>
              <option>Other</option>
            </select>

            <input
  type="text"
  placeholder="Expense Title"
  className="border rounded-lg p-3"
  value={form.title}
  onChange={(e) =>
    setForm({
      ...form,
      title: e.target.value,
    })
  }
/>

            <input
              type="number"
              placeholder="Amount"
              className="border rounded-lg p-3"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Add Expense
            </button>

          </form>

        </div>

        {/* Expense Table */}

        <div className="bg-white rounded-lg shadow overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center p-6 text-gray-500"
                  >
                    No expenses found.
                  </td>

                </tr>

              ) : (

                expenses.map((expense, index) => (

                  <tr
                    key={expense.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {expense.category}
                      </span>
                    </td>

                    <td className="p-3">
                      {expense.title}
                    </td>

                    <td className="p-3 font-semibold">
                      KES {expense.amount.toLocaleString()}
                    </td>

                    <td className="p-3">
                      {new Date(
                        expense.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          handleDelete(expense.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
    </AdminLayout>
  );
}