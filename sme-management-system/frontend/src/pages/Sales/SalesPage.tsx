import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getProducts } from "../../services/productService";
import { createSale } from "../../services/salesService";

interface Product {
  id: string;
  name: string;
  sku: string;
  sellingPrice: number;
  quantity: number;
}

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export default function SalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const addToCart = (product: Product) => {
    if (product.quantity <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const existing = cart.find(
      (item) => item.productId === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          name: product.name,
          quantity: 1,
          price: product.sellingPrice,
        },
      ]);
    }
  };

  const increaseQty = (id: string) => {
    setCart(
      cart.map((item) =>
        item.productId === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (id: string) => {
    setCart(
      cart
        .map((item) =>
          item.productId === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item) => item.productId !== id));
  };

  const clearCart = () => {
    if (window.confirm("Clear the cart?")) {
      setCart([]);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleSale = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login first.");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      await createSale({
        userId: user.id,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      alert("Sale completed successfully!");

      setCart([]);

      loadProducts();

    } catch (error: any) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
    };

  return (
  <AdminLayout>
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Point of Sale
          </h1>

          <p className="text-gray-500">
            MGhetto Retailer Sales
          </p>
        </div>

        <button
          onClick={clearCart}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
        >
          Clear Cart
        </button>

      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}

        <div className="lg:col-span-2">

          <div className="bg-white rounded-xl shadow p-5">

            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border rounded-lg p-3 mb-5"
            />

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

              {filteredProducts.map((product) => (

                <div
                  key={product.id}
                  className="border rounded-xl p-4 hover:shadow-lg transition"
                >

                  <h3 className="font-bold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-gray-500">
                    SKU: {product.sku}
                  </p>

                  <p className="mt-2 font-semibold">
                    KES {product.sellingPrice}
                  </p>

                  <p className="text-sm mt-1">
                    Stock:{" "}
                    <span
                      className={
                        product.quantity <= 5
                          ? "text-red-600 font-bold"
                          : "text-green-600"
                      }
                    >
                      {product.quantity}
                    </span>
                  </p>

                  <button
                    disabled={product.quantity === 0}
                    onClick={() =>
                      addToCart(product)
                    }
                    className={`mt-4 w-full py-2 rounded-lg text-white ${
                      product.quantity === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {product.quantity === 0
                      ? "Out Of Stock"
                      : "Add To Cart"}
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          <div className="bg-white rounded-xl shadow p-5 sticky top-6">

            <h2 className="text-xl font-bold mb-4">
              Shopping Cart
            </h2>

            {cart.length === 0 ? (

              <div className="text-center text-gray-500 py-10">
                Cart is empty
              </div>

            ) : (

              <div className="space-y-4">

                {cart.map((item) => (

                  <div
                    key={item.productId}
                    className="border rounded-lg p-3"
                  >

                    <div className="flex justify-between">

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <button
                        onClick={() =>
                          removeItem(item.productId)
                        }
                        className="text-red-600"
                      >
                        ✕
                      </button>

                    </div>

                    <p className="text-gray-500">
                      KES {item.price}
                    </p>

                    <div className="flex justify-between items-center mt-3">

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            decreaseQty(
                              item.productId
                            )
                          }
                          className="bg-gray-200 px-3 py-1 rounded"
                        >
                          -
                        </button>

                        <span className="font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(
                              item.productId
                            )
                          }
                          className="bg-gray-200 px-3 py-1 rounded"
                        >
                          +
                        </button>

                      </div>

                      <strong>
                        KES{" "}
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString()}
                      </strong>

                    </div>

                  </div>

                ))}

                <hr />

                <div className="space-y-2">

                  <div className="flex justify-between">

                    <span>Total Items</span>

                    <strong>
                      {totalItems}
                    </strong>

                  </div>

                  <div className="flex justify-between text-xl font-bold">

                    <span>Total</span>

                    <span>
                      KES{" "}
                      {total.toLocaleString()}
                    </span>

                  </div>

                </div>

                <button
                  onClick={handleSale}
                  disabled={cart.length === 0}
                  className={`w-full py-3 rounded-lg text-white font-semibold ${
                    cart.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  Complete Sale
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

       </div>
  </AdminLayout>
);
}