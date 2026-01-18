import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaUtensils,
  FaMotorcycle,
  FaTimesCircle,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";

type Order = any;

export default function OrderCard({ order }: { order: Order }): JSX.Element {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "preparing":
        return <FaUtensils className="text-orange-500" />;
      case "on_the_way":
        return <FaMotorcycle className="text-blue-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "on_the_way":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "preparing":
        return "Being Prepared";
      case "on_the_way":
        return "On the Way";
      case "cancelled":
        return "Cancelled";
      default:
        return "Processing";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-3 lg:mb-0">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              {getStatusIcon(order.status)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {order.restaurant.name}
              </h3>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
              <p className="text-xs text-gray-400">
                {order.restaurant.cuisine}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-end space-y-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
            >
              {getStatusText(order.status)}
            </span>
            <p className="text-sm text-gray-500">
              {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Items Ordered</h4>
            <div className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="font-medium">₹{item.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Delivery Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                <span className="text-sm text-gray-600">
                  {order.deliveryAddress}
                </span>
              </div>
              {order.deliveryPartner && (
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Delivery by {order.deliveryPartner}
                  </span>
                </div>
              )}
              {order.deliveryDate && (
                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Delivered on {formatDate(order.deliveryDate)} at{" "}
                    {formatTime(order.deliveryDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
            <div className="space-y-3">
              <Link
                to={`/track-order/${order.id}`}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors block text-center"
              >
                Track Order
              </Link>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Reorder
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                View Invoice
              </button>

              {order.status === "delivered" && !order.rating && (
                <button className="w-full border border-orange-300 text-orange-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2">
                  <FaStar />
                  <span>Rate Order</span>
                </button>
              )}

              {order.rating && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < order.rating ? "text-yellow-400" : "text-gray-300"
                        }
                        size={12}
                      />
                    ))}
                  </div>
                  <span>Rated</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {order.status === "cancelled" && order.cancellationReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              <strong>Cancellation Reason:</strong> {order.cancellationReason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
