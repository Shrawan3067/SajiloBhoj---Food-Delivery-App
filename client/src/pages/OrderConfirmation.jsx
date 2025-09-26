// src/pages/OrderConfirmation.jsx
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Order Not Found</h1>
          <Link to="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <FaCheckCircle className="text-3xl text-green-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
              <p className="text-gray-600">Your order has been placed successfully</p>
            </div>
          </div>
        </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
          <p className="text-gray-600 mb-4">Your food is being prepared and will be delivered soon</p>
          
          <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-semibold text-lg">{order.id}</p>
            <p className="text-sm text-gray-500 mt-1">Estimated delivery: 25-35 minutes</p>
          </div>

          {/* Order Summary */}
          <div className="max-w-md mx-auto text-left mb-8">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.quantity} × {item.name}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 max-w-md mx-auto">
            <button
              onClick={() => navigate(`/track-order/${order.id}`)}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Track Your Order
            </button>
            
            <Link
              to="/order-history"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors block"
            >
              View Order History
            </Link>
            
            <Link
              to="/"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <FaClock className="text-orange-500 text-2xl mx-auto mb-2" />
            <h4 className="font-semibold">Delivery Time</h4>
            <p className="text-sm text-gray-600">25-35 minutes</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <FaShoppingBag className="text-orange-500 text-2xl mx-auto mb-2" />
            <h4 className="font-semibold">Order Status</h4>
            <p className="text-sm text-gray-600">Being Prepared</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <FaMapMarkerAlt className="text-orange-500 text-2xl mx-auto mb-2" />
            <h4 className="font-semibold">Delivery</h4>
            <p className="text-sm text-gray-600">On the way soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}