import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getProducts } from "../../services/productService";
import { createSale } from "../../services/salesService";

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export default function SalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSale = async () => {
  try {

    await createSale({
      userId: "REPLACE_WITH_LOGGED_IN_USER",
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    alert("Sale completed");

    setCart([]);

    loadProducts();

  } catch (error) {
    console.error(error);
  }
};

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const addToCart = () => {
    const product = products.find(
      (p) => p.id === selectedProduct
    );

    if (!product) return;

    setCart([
      ...cart,
      {
        productId: product.id,
        name: product.name,
        quantity,
        price: product.sellingPrice,
      },
    ]);

    setQuantity(1);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">
        Sales
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6">

        <div className="grid md:grid-cols-3 gap-4">

          <select
            className="border p-2 rounded"
            value={selectedProduct}
            onChange={(e) =>
              setSelectedProduct(
                e.target.value
              )
            }
          >
            <option value="">
              Select Product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border p-2 rounded"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }
          />

          <button
            onClick={addToCart}
            className="bg-blue-600 text-white rounded p-2"
          >
            Add To Cart
          </button>

        </div>
      </div>

      <div className="bg-white rounded shadow">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Total
              </th>
            </tr>
          </thead>

          <tbody>

            {cart.map((item, index) => (
              <tr key={index}>
                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  {item.price}
                </td>

                <td className="p-3">
                  {item.price *
                    item.quantity}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 flex justify-end">

        <div className="bg-white p-4 rounded shadow">

          <h2 className="font-bold">
            Total:
          </h2>

          <p className="text-2xl">
            KES {total}
          </p>

        </div>

        <button
        onClick={handleSale}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
        Complete Sale
         </button>

      </div>

    </AdminLayout>
  );
}