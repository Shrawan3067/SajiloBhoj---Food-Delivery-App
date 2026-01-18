import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
  FaCreditCard,
  FaTag,
  FaShippingFast,
  FaShieldAlt,
} from "react-icons/fa";
import { IoFastFood, IoRestaurant } from "react-icons/io5";

export default function CartPage(): JSX.Element {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const navigate = useNavigate();
  const [removingItem, setRemovingItem] = useState<string | number | null>(
    null,
  );

  const handleCheckout = () => {
    if ((cart || []).length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  const handleQuantityChange = (item: any, change: number) => {
    const newQuantity = (item.qty || 1) + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, item.restaurantId, newQuantity);
    } else {
      setRemovingItem(item.id);
      setTimeout(() => {
        removeFromCart(item.id, item.restaurantId);
        setRemovingItem(null);
      }, 300);
    }
  };

  const handleRemoveItem = (item: any) => {
    setRemovingItem(item.id);
    setTimeout(() => {
      removeFromCart(item.id, item.restaurantId);
      setRemovingItem(null);
    }, 300);
  };

  const groupedCart = (cart || []).reduce((groups: any, item: any) => {
    const restaurantId = item.restaurantId || "unknown";
    if (!groups[restaurantId]) groups[restaurantId] = [];
    groups[restaurantId].push(item);
    return groups;
  }, {});

  const deliveryFee = totalPrice > 299 ? 0 : 40;
  const tax = totalPrice * 0.05;
  const finalTotal = totalPrice + deliveryFee + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors p-2 rounded-lg hover:bg-white"
          >
            <FaArrowLeft />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-3 rounded-2xl text-white">
              <FaShoppingBag className="text-xl md:text-2xl" />
            </div>
            <div>
              <h1 className="md:text-2xl text-xl font-bold text-gray-900">
                Your Cart
              </h1>
              <p className="text-gray-600 md:text-[18px] text-[16px] flex items-center gap-2">
                <IoFastFood />
                {totalItems} {totalItems === 1 ? "item" : "items"} • From{" "}
                {Object.keys(groupedCart).length} restaurant
              </p>
            </div>
          </div>
        </div>

        {!cart || cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              Your cart feels lonely
            </h2>
            <p className="text-gray-500 mb-6">
              Add some delicious food to get started!
            </p>
            <button
              onClick={() => navigate("/restaurant-list")}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div className="grid max-w-3xl grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(groupedCart).map(([restaurantId, items]: any) => (
                <div
                  key={restaurantId}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b">
                    <div className="flex items-center gap-3">
                      <IoRestaurant className="text-orange-500 text-xl" />
                      <div>
                        <h3 className="font-bold text-gray-900">
                          Restaurant #{restaurantId}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Free delivery above ₹299
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {items.map((item: any) => (
                      <div
                        key={`${item.restaurantId}-${item.id}`}
                        className={`p-4 transition-all duration-300 ${removingItem === item.id ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                              <span className="text-2xl">🍕</span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-900 truncate">
                                {item.name}
                              </h3>
                              <span className="font-bold text-orange-600">
                                ₹{item.price}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1">
                                <button
                                  onClick={() => handleQuantityChange(item, -1)}
                                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
                                >
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="font-bold text-gray-900 min-w-[20px] text-center">
                                  {item.qty || 1}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item, 1)}
                                  className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-colors"
                                >
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="Remove item"
                              >
                                <FaTrash className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="w-full py-3 border-2 border-red-200 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <FaTrash />
                Clear Entire Cart
              </button>
            </div>

            <div className="lg:col-span-1">
              <div className="w-[350px] bg-white rounded-3xl shadow-lg sticky top-24 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaCreditCard /> Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <FaShippingFast />
                      Delivery Fee
                      {deliveryFee === 0 && (
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                          FREE
                        </span>
                      )}
                    </span>
                    <span
                      className={
                        deliveryFee === 0 ? "text-green-600 font-bold" : ""
                      }
                    >
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-2">
                      <FaShieldAlt />
                      Tax (5%)
                    </span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {deliveryFee > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <FaTag />
                      <span className="text-sm font-semibold">
                        Add ₹{(299 - totalPrice).toFixed(2)} more for FREE
                        delivery!
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <FaCreditCard /> Proceed to Checkout{" "}
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                    ₹{finalTotal.toFixed(2)}
                  </span>
                </button>

                <div className="text-center mt-4">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <FaShieldAlt className="text-green-500" />
                    Your payment is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {cart && cart.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
            <h3 className="font-bold text-lg mb-2">🎉 Special Offer!</h3>
            <p className="text-sm opacity-90">
              Order now and get 20% off on your next purchase. Use code:{" "}
              <strong>EXPRESS20</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
