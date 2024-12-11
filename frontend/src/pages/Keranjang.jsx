import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [debouncedQuantity, setDebouncedQuantity] = useState({});
  const navigate = useNavigate();

  // Fungsi untuk memfetch data cart
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartData = response.data.data.cart.cartItems.map((cartItem) => ({
          id: cartItem.id, // Gunakan ID unik
          name: cartItem.item.name,
          price: cartItem.item.price,
          quantity: cartItem.qty,
          image: `http://localhost:3000/${cartItem.item.images[0]?.url}`,
        }));

        setCartItems(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  // Fungsi untuk mengupdate quantity di server dengan debounce
  const updateQuantity = async (id, quantity) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:3000/api/cart/update",
        {
          qty: quantity,
          cartItemId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // fungsi untuk menghapus item dari keranjang
  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/cart/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Fungsi untuk menunda request update quantity
  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      )
    );

    // Jika quantity sudah ada di debouncedQuantity, clear timeout lama dan atur timeout baru
    if (debouncedQuantity[id]) {
      clearTimeout(debouncedQuantity[id]);
    }

    // Menunggu 2 detik sebelum melakukan update ke server
    const timeoutId = setTimeout(() => {
      const updatedItem = cartItems.find((item) => item.id === id);
      if (updatedItem) {
        const newQuantity = updatedItem.quantity + delta;
        updateQuantity(id, newQuantity);
      }
    }, 500); // Jeda 2 detik

    // Set debounced timeout ID untuk id cartItem
    setDebouncedQuantity((prev) => ({
      ...prev,
      [id]: timeoutId,
    }));
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedItems((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length > 0) {
      const selectedProducts = cartItems.filter((item) =>
        selectedItems.includes(item.id)
      );
      navigate("/pengiriman", {
        state: { selectedProducts, totalBelanja: totalPrice },
      });
    } else {
      alert("Pilih item terlebih dahulu!");
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto p-4 mt-20 min-h-screen">
        <h2 className="text-2xl pb-4 font-bold">Keranjang</h2>
        <hr className="mb-4" />
        <div className="flex space-x-4">
          <div className="w-2/3">
            <div className="border p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <label className="font-bold">Pilih semua</label>
                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
              </div>
              {cartItems.map((item) => (
                <div key={item.id} className="border p-4 mb-4 cart-item">
                  <div className="flex items-center">
                    <img
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                      src={item.image}
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                          <p className="font-bold item-price">
                            Rp. {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <button
                          className="p-2 border rounded-md h-10 delete-btn"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <i className="fas fa-trash-alt text-gray-500"></i>
                        </button>
                        <div className="flex items-center border rounded-md h-10">
                          <button
                            className="p-2"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <input
                            className="w-12 text-center"
                            type="text"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="p-2"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/3 border mb-96 p-4">
            <h3 className="font-bold mb-4">Ringkasan belanja Anda</h3>
            <div className="flex justify-between mb-4">
              <p>Total yang harus dibayar</p>
              <p className="font-bold total-price">
                Rp. {totalPrice.toLocaleString()}
              </p>
            </div>
            <button
              className={`w-full ${
                selectedItems.length > 0
                  ? "bg-red-600 text-white cursor-pointer"
                  : "bg-red-200 text-white cursor-not-allowed"
              } p-2 rounded-md`}
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
            >
              Detail Pengiriman
            </button>
          </div>
        </div>
      </main>
      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Keranjang;
