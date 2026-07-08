import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { type Product } from "../../types/product";
import {
  getProducts,
  deleteProduct,
  createProduct,
} from "../../services/productService";
import { api } from "../../api/axios";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    buyingPrice: "",
    sellingPrice: "",
    quantity: "",
    reorderLevel: 5,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditing(null);
    setForm({
      name: "",
      sku: "",
      buyingPrice: "",
      sellingPrice: "",
      quantity: "",
      reorderLevel: 5,
    });
    setShowModal(true);
  };

  const openEditModal = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      sku: p.sku,
      buyingPrice: p.buyingPrice.toString(),
      sellingPrice: p.sellingPrice.toString(),
      quantity: p.quantity.toString(),
      reorderLevel: p.reorderLevel,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editing) {
        await api.put(`/products/${editing.id}`, {
          ...form,
          buyingPrice: Number(form.buyingPrice),
          sellingPrice: Number(form.sellingPrice),
          quantity: Number(form.quantity),
          reorderLevel: Number(form.reorderLevel),
          });
        toast.success("Product updated");
      } else {
        await createProduct({
          ...form,
          buyingPrice: Number(form.buyingPrice),
          sellingPrice: Number(form.sellingPrice),
          quantity: Number(form.quantity),
          reorderLevel: Number(form.reorderLevel),
          });
        toast.success("Product created");
      }

      setShowModal(false);
      setEditing(null);
      loadProducts();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete product?")) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      loadProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

          {/* SEARCH */}
          <div className="w-full md:w-1/2">
            <input
              placeholder="Search products..."
              className="border p-2 rounded w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* ADD BUTTON */}
          <button
            onClick={openAddModal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {loading ? (
            <div className="p-6">Loading products...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">

                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Selling</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50">

                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3">KES {p.sellingPrice}</td>
                      <td className="p-3 font-bold">{p.quantity}</td>

                      <td className="p-3">
                        {p.quantity <= p.reorderLevel ? (
                          <span className="text-red-600 font-semibold">
                            Low Stock
                          </span>
                        ) : (
                          <span className="text-green-600">
                            In Stock
                          </span>
                        )}
                      </td>

                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editing ? "Edit Product" : "Add Product"}
                </h2>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-xl"
                >
                  ✕
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">

  <div>
    <label className="block text-sm font-medium mb-1">
      Product Name
    </label>
    <input
      placeholder="Name"
      className="border p-2 rounded w-full"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Product SKU
    </label>
    <input
      placeholder="SKU"
      className="border p-2 rounded w-full"
      value={form.sku}
      onChange={(e) => setForm({ ...form, sku: e.target.value })}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Buying Price (KES)
    </label>
    <input
      type="number"
      className="border p-2 rounded w-full"
      value={form.buyingPrice}
      onChange={(e) =>
        setForm({
        ...form,
        buyingPrice: e.target.value,
    })
  }
/>
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Selling Price (KES)
    </label>
    <input
      type="number"
      className="border p-2 rounded w-full"
      value={form.sellingPrice}
      onChange={(e) =>
        setForm({
        ...form,
        sellingPrice: e.target.value,
    })
  }
/>
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Quantity in Stock
    </label>
    <input
      type="number"
      className="border p-2 rounded w-full"
      value={form.quantity}
      onChange={(e) =>
        setForm({
        ...form,
        quantity: e.target.value,
    })
  }
/>
</div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Reorder Level
    </label>
    <input
      type="number"
      placeholder="Reorder Level"
      className="border p-2 rounded w-full"
      value={form.reorderLevel}
      onChange={(e) =>
        setForm({ ...form, reorderLevel: Number(e.target.value) })
      }
    />
  </div>

  <div className="md:col-span-2 flex justify-end gap-2 mt-2">
    <button
      type="button"
      onClick={() => setShowModal(false)}
      className="px-4 py-2 border rounded"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      {editing ? "Update" : "Save"}
    </button>
  </div>

</form>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}