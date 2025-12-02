// Offers.jsx
import React, { useState, useEffect } from "react";
import { FiTag, FiClock, FiShoppingBag, FiPercent, FiGift, FiCopy } from "react-icons/fi";
import { BsLightningCharge } from "react-icons/bs";
import { TbSalad } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { MdCheckCircle } from "react-icons/md";

const Offers = () => {
  // State for offer categories
  const [offerCategories, setOfferCategories] = useState([
    {
      id: 1,
      title: "All Offers",
      icon: <FiTag className="text-xl" />,
      count: 12,
      active: true,
      filter: "all"
    },
    {
      id: 2,
      title: "Bank Offers",
      icon: <GiMoneyStack className="text-xl" />,
      count: 5,
      active: false,
      filter: "bank"
    },
    {
      id: 3,
      title: "Promo Codes",
      icon: <FiPercent className="text-xl" />,
      count: 8,
      active: false,
      filter: "promo"
    },
    {
      id: 4,
      title: "Freebies",
      icon: <FiGift className="text-xl" />,
      count: 3,
      active: false,
      filter: "freebies"
    },
    {
      id: 5,
      title: "Exclusive",
      icon: <BsLightningCharge className="text-xl" />,
      count: 7,
      active: false,
      filter: "exclusive"
    },
    {
      id: 6,
      title: "Healthy",
      icon: <TbSalad className="text-xl" />,
      count: 4,
      active: false,
      filter: "healthy"
    },
  ]);

  // State for copying feedback
  const [copiedCode, setCopiedCode] = useState(null);
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState("all");

  // All offers data
  const allOffers = [
    {
      id: 1,
      title: "FLAT ₹100 OFF",
      description: "On orders above ₹299",
      code: "SAJILO100",
      validity: "Valid till 31 Dec 2024",
      terms: "Valid on prepaid orders only",
      category: "promo",
      icon: <FiPercent className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-orange-400 to-orange-500",
      textColor: "text-white",
    },
    {
      id: 2,
      title: "FIRST ORDER OFFER",
      description: "50% OFF up to ₹150",
      code: "TRYNEW",
      validity: "For new users only",
      terms: "Min order ₹199",
      category: "exclusive",
      icon: <BsLightningCharge className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
      textColor: "text-white",
    },
    {
      id: 3,
      title: "FREE DELIVERY",
      description: "On all grocery orders",
      code: "FREEDEL",
      validity: "Valid till 25 Dec 2024",
      terms: "Above ₹299 on Sajilo Mart",
      category: "freebies",
      icon: <FiShoppingBag className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-green-400 to-emerald-500",
      textColor: "text-white",
    },
    {
      id: 4,
      title: "UPTO 60% OFF",
      description: "At top restaurants",
      code: "",
      validity: "Limited time offer",
      terms: "Select restaurants only",
      category: "all",
      icon: <FiTag className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-blue-400 to-cyan-500",
      textColor: "text-white",
    },
    {
      id: 5,
      title: "HDFC BANK OFFER",
      description: "15% Cashback",
      code: "HDFC15",
      validity: "Valid till 20 Dec 2024",
      terms: "Max cashback ₹200",
      category: "bank",
      icon: <GiMoneyStack className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-red-400 to-red-500",
      textColor: "text-white",
    },
    {
      id: 6,
      title: "HEALTHY CHOICE",
      description: "30% OFF on salads",
      code: "HEALTH30",
      validity: "Valid till 30 Dec 2024",
      terms: "Min order ₹249",
      category: "healthy",
      icon: <TbSalad className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-lime-400 to-green-500",
      textColor: "text-white",
    },
    {
      id: 7,
      title: "ICICI BANK OFFER",
      description: "20% OFF up to ₹100",
      code: "ICICI20",
      validity: "Valid till 28 Dec 2024",
      terms: "Valid on ICICI cards",
      category: "bank",
      icon: <GiMoneyStack className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-indigo-400 to-indigo-500",
      textColor: "text-white",
    },
    {
      id: 8,
      title: "FLAT ₹75 OFF",
      description: "On all food orders",
      code: "FOOD75",
      validity: "Valid till 15 Jan 2025",
      terms: "Min order ₹399",
      category: "promo",
      icon: <FiPercent className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-amber-400 to-amber-500",
      textColor: "text-white",
    },
    {
      id: 9,
      title: "FREE DESSERT",
      description: "With orders above ₹499",
      code: "SWEET",
      validity: "Valid till 10 Dec 2024",
      terms: "Select restaurants only",
      category: "freebies",
      icon: <FiGift className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-pink-400 to-rose-500",
      textColor: "text-white",
    },
    {
      id: 10,
      title: "PREMIUM MEMBER",
      description: "Extra 10% OFF always",
      code: "PREMIUM10",
      validity: "For premium members",
      terms: "On all prepaid orders",
      category: "exclusive",
      icon: <BsLightningCharge className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-violet-400 to-violet-500",
      textColor: "text-white",
    },
    {
      id: 11,
      title: "SBI BANK OFFER",
      description: "Flat ₹50 Cashback",
      code: "SBI50",
      validity: "Valid till 31 Dec 2024",
      terms: "Min transaction ₹299",
      category: "bank",
      icon: <GiMoneyStack className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-blue-400 to-blue-500",
      textColor: "text-white",
    },
    {
      id: 12,
      title: "SMOOTHIE SPECIAL",
      description: "Buy 1 Get 1 Free",
      code: "SMOOTHIEBOGO",
      validity: "Valid till 5 Dec 2024",
      terms: "On fresh juices & smoothies",
      category: "healthy",
      icon: <TbSalad className="text-3xl" />,
      bgColor: "bg-gradient-to-br from-teal-400 to-teal-500",
      textColor: "text-white",
    },
  ];

  // Expired offers data
  const expiredOffers = [
    {
      id: 13,
      title: "FLAT ₹50 OFF",
      description: "On orders above ₹199",
      code: "WEEKEND50",
      validity: "Expired on 15 Nov 2024",
      terms: "Valid on weekends only",
      expired: true,
      category: "promo"
    },
    {
      id: 14,
      title: "20% CASHBACK",
      description: "On first 3 orders",
      code: "WELCOME20",
      validity: "Expired on 10 Nov 2024",
      terms: "For new users only",
      expired: true,
      category: "exclusive"
    },
  ];

  // Filter offers based on active filter
  const filteredOffers = activeFilter === "all" 
    ? allOffers 
    : allOffers.filter(offer => offer.category === activeFilter);

  // Update counts based on actual data
  useEffect(() => {
    const updatedCategories = offerCategories.map(cat => {
      if (cat.filter === "all") {
        return { ...cat, count: allOffers.length };
      } else {
        const count = allOffers.filter(offer => offer.category === cat.filter).length;
        return { ...cat, count };
      }
    });
    setOfferCategories(updatedCategories);
  }, []);

  // Handle category filter click
  const handleCategoryClick = (filter) => {
    setActiveFilter(filter);
    
    // Update active state for categories
    const updatedCategories = offerCategories.map(cat => ({
      ...cat,
      active: cat.filter === filter
    }));
    setOfferCategories(updatedCategories);
  };

  // Handle copy code
  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // Get active offers count for header
  const getActiveOffersCount = () => {
    return activeFilter === "all" ? allOffers.length : filteredOffers.length;
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Offers Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Offers For You
              </h1>
              <p className="text-orange-100 text-lg">
                Explore amazing deals and discounts
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white font-semibold">
                <span className="text-2xl">{getActiveOffersCount()}</span> Active Offers
                {activeFilter !== "all" && (
                  <span className="text-sm block mt-1">
                    in {offerCategories.find(c => c.filter === activeFilter)?.title}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Categories Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Browse by Category</h2>
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {offerCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.filter)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                  category.active
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.title}</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    category.active
                      ? "bg-white/30"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Offers Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {activeFilter === "all" ? "All Active Offers" : `${offerCategories.find(c => c.filter === activeFilter)?.title}`}
            </h2>
            <span className="text-sm text-gray-500">
              Tap to copy code & apply
            </span>
          </div>

          {filteredOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  {/* Offer Header with Color */}
                  <div
                    className={`${offer.bgColor} ${offer.textColor} p-6 relative`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                        <p className="font-medium opacity-90">{offer.description}</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        {offer.icon}
                      </div>
                    </div>
                    
                    {/* Promo Code Badge */}
                    {offer.code && (
                      <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold">{offer.code}</span>
                          {copiedCode === offer.id ? (
                            <span className="text-sm opacity-90 flex items-center gap-1">
                              <MdCheckCircle /> Copied!
                            </span>
                          ) : (
                            <span className="text-sm opacity-90">(Tap to copy)</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Offer Details */}
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FiClock className="text-orange-500" />
                        <span className="text-sm">{offer.validity}</span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <p>{offer.terms}</p>
                      </div>
                    </div>

                    {offer.code ? (
                      <button 
                        onClick={() => handleCopyCode(offer.code, offer.id)}
                        className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        {copiedCode === offer.id ? (
                          <>
                            <MdCheckCircle /> COPIED SUCCESSFULLY
                          </>
                        ) : (
                          <>
                            <FiCopy /> COPY CODE & APPLY
                          </>
                        )}
                      </button>
                    ) : (
                      <button className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200">
                        VIEW OFFER
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <div className="text-gray-400 mb-4">
                <FiTag className="text-5xl mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                No offers found
              </h3>
              <p className="text-gray-500">
                There are no offers available in this category at the moment.
              </p>
              <button 
                onClick={() => handleCategoryClick("all")}
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-600 transition-colors"
              >
                View All Offers
              </button>
            </div>
          )}
        </div>

        {/* How to Use Offers */}
        <div className="bg-white rounded-2xl p-6 mb-12 shadow-md">
          <h2 className="text-2xl font-bold mb-6">How to Use Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 text-orange-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">1</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Choose Your Offer</h3>
                <p className="text-gray-600">
                  Browse available offers and tap to copy the promo code
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 text-orange-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">2</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Apply at Checkout</h3>
                <p className="text-gray-600">
                  Paste the code in the promo code section during checkout
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 text-orange-500 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold">3</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Enjoy Savings</h3>
                <p className="text-gray-600">
                  See the discount applied to your order total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expired Offers Section - Always show all expired */}
        {expiredOffers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Expired Offers</h2>
            <div className="space-y-4">
              {expiredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 opacity-75"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-400">
                        {offer.title}
                      </h3>
                      <p className="text-gray-500">{offer.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        {offer.code && (
                          <span className="font-mono text-gray-400 bg-gray-100 px-3 py-1 rounded">
                            {offer.code}
                          </span>
                        )}
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <FiClock /> {offer.validity}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                      Expired
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Terms & Conditions</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Offers are valid for a limited period only</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Each offer can be used once per user unless specified</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>Offers cannot be combined with other promotions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>SajiloBhoj reserves the right to modify or cancel offers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <span>In case of any dispute, SajiloBhoj's decision will be final</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Need Help Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">Need Help with Offers?</h3>
          <p className="text-gray-600 mb-4">
            Contact our customer support for any offer-related queries
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;