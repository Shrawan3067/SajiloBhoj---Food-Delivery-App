import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddressForm from "../components/AddressForm";
import "./Profile.css";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEdit,
  FaPlus,
  FaTrash,
  FaChevronRight,
  FaStar,
  FaShoppingBag,
  FaCog,
  FaShieldAlt,
  FaHeart,
  FaWallet,
  FaBell,
  FaQuestionCircle,
  FaTimes,
  FaBars,
  FaFilter,
  FaShoppingCart,
  FaList,
} from "react-icons/fa";
import { IoFastFood, IoRestaurant } from "react-icons/io5";

type Address = {
  id: number | string;
  type: string;
  name: string;
  address: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  isDefault?: boolean;
};

export default function Profile(): JSX.Element {
  const { user, logout } = useAuth() as any;
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "home",
      name: "Home",
      address: "123 Main Street, Apartment 4B",
      landmark: "Near Central Park",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "9876543210",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      name: "Work",
      address: "Tech Park Building, Floor 8",
      landmark: "Opposite Metro Station",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400002",
      phone: "9876543210",
      isDefault: false,
    },
  ]);

  const userStats = {
    totalOrders: 24,
    memberSince: "2023",
    favoriteCuisine: "Italian",
    loyaltyPoints: 1250,
    savedAmount: 840,
  };

  const menuItems = [
    {
      id: "profile",
      label: "Profile Information",
      icon: FaUser,
      color: "text-blue-500",
    },
    {
      id: "addresses",
      label: "Saved Addresses",
      icon: FaMapMarkerAlt,
      color: "text-green-500",
    },
    {
      id: "orders",
      label: "Order History",
      icon: FaClock,
      color: "text-orange-500",
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: FaHeart,
      color: "text-red-500",
    },
    {
      id: "payments",
      label: "Payment Methods",
      icon: FaWallet,
      color: "text-purple-500",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: FaBell,
      color: "text-yellow-500",
    },
    {
      id: "security",
      label: "Privacy & Security",
      icon: FaShieldAlt,
      color: "text-gray-500",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: FaQuestionCircle,
      color: "text-indigo-500",
    },
  ];

  const handleAddAddress = (newAddress: Address) => {
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...newAddress, id: editingAddress.id }
            : addr,
        ),
      );
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (addressId: number | string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== addressId));
    }
  };

  const setDefaultAddress = (addressId: number | string) => {
    setAddresses(
      addresses.map((addr) => ({ ...addr, isDefault: addr.id === addressId })),
    );
  };

  if (showAddressForm) {
    return (
      <AddressForm
        address={editingAddress as any}
        onSubmit={handleAddAddress}
        onCancel={() => {
          setShowAddressForm(false);
          setEditingAddress(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white md:py-12 py-6">
        <div className="max-w-6xl mx-auto md:px-4 px-3">
          <div className="flex md:items-center items-end justify-between">
            <div className="flex md:flex-row flex-col md:items-center items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                  <FaUser className="text-4xl text-white" />
                </div>
                <div className="absolute -bottom-2 -right-1 bg-green-500 text-white p-2 rounded-full">
                  <FaStar className="text-sm" />
                </div>
              </div>

              <div>
                <h1 className="md:text-4xl text-2xl font-bold mb-2">
                  {user?.name || "Food Lover"}
                </h1>
                <p className="text-orange-100 md:text-lg text-[15px] flex items-center md:gap-2 gap-1">
                  <IoFastFood />
                  BiteXpress Member since {userStats.memberSince}
                </p>
                <div className="flex items-center md:gap-4 gap-2 mt-3 text-orange-200">
                  <span className="flex md:text-lg text-[15px] items-center gap-1">
                    <FaShoppingBag />
                    {userStats.totalOrders} orders
                  </span>
                  <span className="flex md:text-lg text-[15px] items-center gap-1">
                    <FaStar className="text-yellow-300" />
                    {userStats.loyaltyPoints} points
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl md:p-4 p-2 text-center">
                <div className="md:text-2xl text-[18px] font-bold">
                  ₹{userStats.savedAmount}
                </div>
                <div className="text-orange-200 md:text-sm text-[13px]">
                  Total Savings
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-[80px] z-40">
        <div className="lg:hidden bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 w-full">
                <div className="flex items-center gap-2 text-gray-700 shrink-0">
                  <FaList className="text-orange-500 text-sm" />
                  <span className="font-semibold text-sm hidden xs:inline">
                    Menu:
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                    {menuItems.map((item) => {
                      const IconComponent = item.icon as any;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 font-semibold shrink-0 text-sm whitespace-nowrap ${activeTab === item.id ? "bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg" : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300"}`}
                        >
                          <IconComponent
                            className={`text-sm ${activeTab === item.id ? "text-white" : item.color}`}
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}

                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-300 font-semibold shrink-0 text-sm whitespace-nowrap"
                    >
                      <FaCog className="text-sm" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl flex md:flex-row mx-auto px-4 py-8 gap-6">
        <div className="hidden lg:block md:w-sm bg-white rounded-3xl shadow-xl p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon as any;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl flex items-center justify-between transition-all duration-300 group ${activeTab === item.id ? "bg-gradient-to-r from-orange-50 to-red-50 text-orange-600 border border-orange-200 shadow-md" : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"}`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${activeTab === item.id ? "bg-orange-500 text-white" : "bg-gray-100 group-hover:bg-orange-100"} transition-colors`}
                    >
                      <IconComponent
                        className={`text-lg ${activeTab === item.id ? "text-white" : item.color}`}
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <FaChevronRight
                    className={`text-gray-400 group-hover:text-orange-500 transition-colors ${activeTab === item.id ? "text-orange-500" : ""}`}
                  />
                </button>
              );
            })}
          </nav>

          <button
            onClick={logout}
            className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <FaCog />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="md:w-3xl w-full bg-white rounded-3xl shadow-xl md:p-8 p-4">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="md:text-2xl text-[18px] font-bold text-gray-900">
                      Profile Information
                    </h2>
                    <p className="text-gray-600 md:text-lg text-[16px]">
                      Manage your personal details and preferences
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white md:px-6 px-2 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all flex items-center md:gap-2 gap-1 md:text-lg text-sm shadow-lg hover:shadow-xl">
                    <FaEdit />
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FaUser className="text-blue-500" />
                        Personal Information
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name
                          </label>
                          <div className="p-3 bg-white rounded-lg border border-gray-200 font-semibold">
                            {user?.name || "Not provided"}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email Address
                          </label>
                          <div className="p-3 bg-white rounded-lg border border-gray-200">
                            {user?.email || "Not provided"}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Phone Number
                          </label>
                          <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center space-x-2">
                            <FaPhone className="text-gray-400" />
                            <span>{user?.phone || "Not provided"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <IoFastFood className="text-green-500" />
                        Food Preferences
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            Favorite Cuisine
                          </span>
                          <span className="font-semibold">
                            {userStats.favoriteCuisine}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">
                            Dietary Preference
                          </span>
                          <span className="font-semibold">Vegetarian</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Spice Level</span>
                          <span className="font-semibold">Medium</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        Loyalty Status
                      </h3>

                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {userStats.loyaltyPoints}
                        </div>
                        <div className="text-gray-600">Reward Points</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: "65%" }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          65% to Gold Status
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="md:w-3xl w-full bg-white rounded-3xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Saved Addresses
                    </h2>
                    <p className="text-gray-600">
                      Manage your delivery addresses
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FaPlus />
                    Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="relative group">
                      <div
                        className={`border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${address.isDefault ? "border-orange-300 bg-orange-50" : "border-gray-200 hover:border-orange-200"}`}
                      >
                        {address.isDefault && (
                          <span className="absolute -top-3 left-4 bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-semibold shadow-lg">
                            ⭐ Default
                          </span>
                        )}

                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${address.type === "home" ? "bg-green-100 text-green-600" : address.type === "work" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}
                            >
                              <FaMapMarkerAlt className="text-lg" />
                            </div>
                            <div>
                              <span className="font-semibold text-lg capitalize">
                                {address.name}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>
                                  {address.city}, {address.state}
                                </span>
                                <span>•</span>
                                <span>{address.pincode}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditAddress(address)}
                              className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Edit address"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(address.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete address"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-2 font-medium">
                          {address.address}
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                          Landmark: {address.landmark}
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            📞 {address.phone}
                          </span>
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="text-orange-500 text-sm font-semibold hover:underline flex items-center gap-1"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {addresses.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FaMapMarkerAlt className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">
                      No addresses saved yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Add your first address to get started with faster
                      deliveries
                    </p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Add Your First Address
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <div className="md:w-3xl w-full bg-white rounded-3xl shadow-xl p-8">
                <div className="text-center py-12">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FaShoppingBag className="text-5xl text-orange-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    Order History
                  </h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                    View and manage all your orders, track deliveries, and
                    reorder your favorites in one place
                  </p>
                  <Link
                    to="/order-history"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                  >
                    <FaClock />
                    View All Orders
                    <FaChevronRight className="text-sm" />
                  </Link>
                </div>
              </div>
            )}

            {!["profile", "addresses", "orders"].includes(activeTab) && (
              <div className="md:w-3xl w-full bg-white rounded-3xl shadow-xl p-8">
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {React.createElement(
                      menuItems.find((item) => item.id === activeTab)
                        ?.icon as any,
                      {
                        className: `text-4xl ${menuItems.find((item) => item.id === activeTab)?.color}`,
                      },
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {menuItems.find((item) => item.id === activeTab)?.label}
                  </h3>
                  <p className="text-gray-600">This feature is coming soon!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
