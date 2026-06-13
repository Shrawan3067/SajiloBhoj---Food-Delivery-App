import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiTag,
  FiClock,
  FiShoppingBag,
  FiPercent,
  FiGift,
  FiCopy,
  FiTrendingUp,
  FiCheckCircle,
  FiZap,
  FiAward,
  FiHeart,
  FiShare2,
  FiInfo,
} from "react-icons/fi";
import { BsLightningCharge, BsStars } from "react-icons/bs";
import { TbSalad, TbDiscount2 } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { MdCheckCircle, MdLocalOffer } from "react-icons/md";
import { FaFire, FaLeaf, FaRegClock } from "react-icons/fa";

// Types
interface Offer {
  id: number;
  title: string;
  description: string;
  code?: string;
  validity: string;
  terms: string;
  category: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  expired?: boolean;
  discountValue?: string;
  minOrder?: string;
  usageLimit?: number;
  isNew?: boolean;
  isTrending?: boolean;
}

interface Category {
  id: number;
  title: string;
  icon: React.ReactNode;
  count: number;
  active: boolean;
  filter: string;
  color?: string;
}

// Enhanced offers data
const ALL_OFFERS: Offer[] = [
  {
    id: 1,
    title: "FLAT ₹100 OFF",
    description: "On orders above ₹299",
    code: "BITE100",
    validity: "Valid till 31 Dec 2024",
    terms: "Valid on prepaid orders only",
    category: "promo",
    discountValue: "₹100 OFF",
    minOrder: "₹299",
    isNew: true,
    bgColor: "from-orange-400 to-orange-600",
    icon: <FiPercent />,
  },
  {
    id: 2,
    title: "FIRST ORDER OFFER",
    description: "50% OFF up to ₹150",
    code: "TRYNEW",
    validity: "For new users only",
    terms: "Min order ₹199",
    category: "exclusive",
    discountValue: "50% OFF",
    minOrder: "₹199",
    isTrending: true,
    bgColor: "from-purple-500 to-pink-600",
    icon: <BsLightningCharge />,
  },
  {
    id: 3,
    title: "FREE DELIVERY",
    description: "On all grocery orders",
    code: "FREEDEL",
    validity: "Valid till 25 Dec 2024",
    terms: "Above ₹299 on Xpress Mart",
    category: "freebies",
    discountValue: "Free Delivery",
    minOrder: "₹299",
    bgColor: "from-green-500 to-emerald-600",
    icon: <FiShoppingBag />,
  },
  {
    id: 4,
    title: "UPTO 60% OFF",
    description: "At top restaurants",
    code: "",
    validity: "Limited time offer",
    terms: "Select restaurants only",
    category: "all",
    discountValue: "60% OFF",
    isTrending: true,
    bgColor: "from-blue-500 to-cyan-600",
    icon: <FiTag />,
  },
  {
    id: 5,
    title: "HDFC BANK OFFER",
    description: "15% Cashback",
    code: "HDFC15",
    validity: "Valid till 20 Dec 2024",
    terms: "Max cashback ₹200",
    category: "bank",
    discountValue: "15% Cashback",
    bgColor: "from-red-500 to-red-600",
    icon: <GiMoneyStack />,
  },
  {
    id: 6,
    title: "HEALTHY CHOICE",
    description: "30% OFF on salads",
    code: "HEALTH30",
    validity: "Valid till 30 Dec 2024",
    terms: "Min order ₹249",
    category: "healthy",
    discountValue: "30% OFF",
    minOrder: "₹249",
    bgColor: "from-lime-500 to-green-600",
    icon: <TbSalad />,
  },
  {
    id: 7,
    title: "ICICI BANK OFFER",
    description: "20% OFF up to ₹100",
    code: "ICICI20",
    validity: "Valid till 28 Dec 2024",
    terms: "Valid on ICICI cards",
    category: "bank",
    discountValue: "20% OFF",
    bgColor: "from-indigo-500 to-indigo-600",
    icon: <GiMoneyStack />,
  },
  {
    id: 8,
    title: "FLAT ₹75 OFF",
    description: "On all food orders",
    code: "FOOD75",
    validity: "Valid till 15 Jan 2025",
    terms: "Min order ₹399",
    category: "promo",
    discountValue: "₹75 OFF",
    minOrder: "₹399",
    bgColor: "from-amber-500 to-amber-600",
    icon: <FiPercent />,
  },
  {
    id: 9,
    title: "FREE DESSERT",
    description: "With orders above ₹499",
    code: "SWEET",
    validity: "Valid till 10 Dec 2024",
    terms: "Select restaurants only",
    category: "freebies",
    discountValue: "Free Dessert",
    minOrder: "₹499",
    bgColor: "from-pink-500 to-rose-600",
    icon: <FiGift />,
  },
  {
    id: 10,
    title: "PREMIUM MEMBER",
    description: "Extra 10% OFF always",
    code: "PREMIUM10",
    validity: "For premium members",
    terms: "On all prepaid orders",
    category: "exclusive",
    discountValue: "10% OFF",
    bgColor: "from-violet-500 to-violet-600",
    icon: <BsStars />,
  },
  {
    id: 11,
    title: "SBI BANK OFFER",
    description: "Flat ₹50 Cashback",
    code: "SBI50",
    validity: "Valid till 31 Dec 2024",
    terms: "Min transaction ₹299",
    category: "bank",
    discountValue: "₹50 Cashback",
    minOrder: "₹299",
    bgColor: "from-blue-500 to-blue-600",
    icon: <GiMoneyStack />,
  },
  {
    id: 12,
    title: "SMOOTHIE SPECIAL",
    description: "Buy 1 Get 1 Free",
    code: "SMOOTHIEBOGO",
    validity: "Valid till 5 Dec 2024",
    terms: "On fresh juices & smoothies",
    category: "healthy",
    discountValue: "BOGO",
    bgColor: "from-teal-500 to-teal-600",
    icon: <TbSalad />,
  },
];

const EXPIRED_OFFERS: Offer[] = [
  {
    id: 13,
    title: "FLAT ₹50 OFF",
    description: "On orders above ₹199",
    code: "WEEKEND50",
    validity: "Expired on 15 Nov 2024",
    terms: "Valid on weekends only",
    expired: true,
    category: "promo",
    discountValue: "₹50 OFF",
    bgColor: "from-gray-400 to-gray-500",
    icon: <FiPercent />,
  },
  {
    id: 14,
    title: "20% CASHBACK",
    description: "On first 3 orders",
    code: "WELCOME20",
    validity: "Expired on 10 Nov 2024",
    terms: "For new users only",
    expired: true,
    category: "exclusive",
    discountValue: "20% Cashback",
    bgColor: "from-gray-400 to-gray-500",
    icon: <BsLightningCharge />,
  },
];

// Category data with icons
const CATEGORIES: Category[] = [
  { id: 1, title: "All Offers", icon: <FiTag />, count: 0, active: true, filter: "all", color: "from-orange-500 to-orange-600" },
  { id: 2, title: "Bank Offers", icon: <GiMoneyStack />, count: 0, active: false, filter: "bank", color: "from-blue-500 to-blue-600" },
  { id: 3, title: "Promo Codes", icon: <FiPercent />, count: 0, active: false, filter: "promo", color: "from-purple-500 to-purple-600" },
  { id: 4, title: "Freebies", icon: <FiGift />, count: 0, active: false, filter: "freebies", color: "from-green-500 to-green-600" },
  { id: 5, title: "Exclusive", icon: <BsLightningCharge />, count: 0, active: false, filter: "exclusive", color: "from-pink-500 to-pink-600" },
  { id: 6, title: "Healthy", icon: <TbSalad />, count: 0, active: false, filter: "healthy", color: "from-lime-500 to-lime-600" },
];

// Offer Card Component
const OfferCard: React.FC<{
  offer: Offer;
  onCopyCode: (code: string, id: number) => void;
  copiedCodeId: number | null;
}> = ({ offer, onCopyCode, copiedCodeId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Card Header with Gradient */}
        <div className={`bg-gradient-to-br ${offer.bgColor || 'from-orange-500 to-orange-600'} text-white p-6 relative overflow-hidden`}>
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '0%' : '-100%' }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {offer.isNew && (
                    <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {offer.isTrending && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <FaFire className="text-xs" />
                      TRENDING
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-1">{offer.title}</h3>
                <p className="text-white/90 text-sm">{offer.description}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <div className="text-2xl">{offer.icon}</div>
              </div>
            </div>

            {offer.code && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block cursor-pointer"
                onClick={() => onCopyCode(offer.code!, offer.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg tracking-wider">
                    {offer.code}
                  </span>
                  {copiedCodeId === offer.id ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-sm flex items-center gap-1"
                    >
                      <FiCheckCircle /> Copied!
                    </motion.span>
                  ) : (
                    <span className="text-sm opacity-90 flex items-center gap-1">
                      <FiCopy className="text-xs" /> Tap to copy
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-gray-600">
              <FiClock className="text-orange-500 flex-shrink-0" />
              <span className="text-sm">{offer.validity}</span>
            </div>
            {offer.minOrder && (
              <div className="flex items-center gap-2 text-gray-600">
                <FiShoppingBag className="text-orange-500 flex-shrink-0" />
                <span className="text-sm">Minimum Order: {offer.minOrder}</span>
              </div>
            )}
            <div className="text-gray-600 text-sm">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <FiInfo className="text-xs" />
                <span className="text-xs">Terms & Conditions</span>
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-gray-500 text-xs leading-relaxed"
                  >
                    {offer.terms}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Button */}
          {offer.code ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCopyCode(offer.code!, offer.id)}
              className={`mt-6 w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                copiedCodeId === offer.id
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg"
              }`}
            >
              {copiedCodeId === offer.id ? (
                <>
                  <FiCheckCircle /> COPIED SUCCESSFULLY
                </>
              ) : (
                <>
                  <FiCopy /> COPY CODE & APPLY
                </>
              )}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            >
              VIEW OFFER
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Category Button Component
const CategoryButton: React.FC<{
  category: Category;
  isActive: boolean;
  onClick: () => void;
}> = ({ category, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
        isActive
          ? `bg-gradient-to-r ${category.color} text-white shadow-md`
          : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
      }`}
    >
      <span className="text-lg">{category.icon}</span>
      <span className="font-medium">{category.title}</span>
      <span
        className={`ml-2 px-2 py-1 rounded-full text-xs ${
          isActive
            ? "bg-white/30 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
      >
        {category.count}
      </span>
    </motion.button>
  );
};

// How It Works Component
const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Choose Your Offer",
      description: "Browse available offers and tap to copy the promo code",
      icon: <FiTag />,
    },
    {
      number: 2,
      title: "Apply at Checkout",
      description: "Paste the code in the promo code section during checkout",
      icon: <FiShoppingBag />,
    },
    {
      number: 3,
      title: "Enjoy Savings",
      description: "See the discount applied to your order total instantly",
      icon: <FiCheckCircle />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-md"
    >
      <h3 className="text-2xl font-bold mb-6 text-center">How to Use Offers</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-xl font-bold">{step.number}</span>
            </div>
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2">
                {step.icon}
                {step.title}
              </h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Component
export default function Offers(): JSX.Element {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate category counts
  useEffect(() => {
    const updatedCategories = categories.map((cat) => {
      if (cat.filter === "all") {
        return { ...cat, count: ALL_OFFERS.length };
      }
      const count = ALL_OFFERS.filter(
        (offer) => offer.category === cat.filter
      ).length;
      return { ...cat, count };
    });
    setCategories(updatedCategories);
    setIsLoading(false);
  }, []);

  // Filter offers based on active category
  const filteredOffers = useMemo(() => {
    if (activeFilter === "all") return ALL_OFFERS;
    return ALL_OFFERS.filter((offer) => offer.category === activeFilter);
  }, [activeFilter]);

  const getActiveCount = useMemo(() => {
    return filteredOffers.length;
  }, [filteredOffers]);

  const handleCategoryClick = useCallback((filter: string) => {
    setActiveFilter(filter);
    setCategories((prev) =>
      prev.map((c) => ({ ...c, active: c.filter === filter }))
    );
  }, []);

  const handleCopyCode = useCallback((code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>
        
        <div className="relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
                >
                  <MdLocalOffer className="text-white" />
                  <span className="text-white text-sm font-semibold">Limited Time Deals</span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                  Offers For You
                </h1>
                <p className="text-orange-100 text-lg">
                  Explore amazing deals and discounts from your favorite restaurants
                </p>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {getActiveCount}
                  </span>
                  <span className="text-white/90">Active Offers</span>
                </div>
                {activeFilter !== "all" && (
                  <p className="text-white/80 text-sm mt-1">
                    in {categories.find(c => c.filter === activeFilter)?.title}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Browse by Category</h2>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <FiTrendingUp /> Trending offers
            </span>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeFilter === category.filter}
                onClick={() => handleCategoryClick(category.filter)}
              />
            ))}
          </div>
        </motion.div>

        {/* Offers Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeFilter === "all"
                ? "All Active Offers"
                : `${categories.find(c => c.filter === activeFilter)?.title}`}
            </h2>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <FiCopy className="text-xs" />
              Tap to copy code & apply
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-64"></div>
                </div>
              ))}
            </div>
          ) : filteredOffers.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onCopyCode={handleCopyCode}
                  copiedCodeId={copiedCodeId}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-2xl shadow-sm"
            >
              <div className="text-gray-400 mb-4">
                <FiTag className="text-6xl mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                No offers found
              </h3>
              <p className="text-gray-500 mb-4">
                There are no offers available in this category at the moment.
              </p>
              <button
                onClick={() => handleCategoryClick("all")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                View All Offers
              </button>
            </motion.div>
          )}
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <HowItWorks />
        </div>

        {/* Expired Offers Section */}
        {EXPIRED_OFFERS.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Expired Offers</h2>
            <div className="space-y-4">
              {EXPIRED_OFFERS.map((offer) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 opacity-75 hover:opacity-100 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-gray-400">{offer.icon}</div>
                        <h3 className="text-xl font-bold text-gray-400">
                          {offer.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 mb-2">{offer.description}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        {offer.code && (
                          <span className="font-mono text-gray-400 bg-gray-100 px-3 py-1 rounded text-sm">
                            {offer.code}
                          </span>
                        )}
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <FaRegClock /> {offer.validity}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">
                      Expired
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FiInfo className="text-orange-500" />
            Terms & Conditions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Offers are valid for a limited period only",
              "Each offer can be used once per user unless specified",
              "Offers cannot be combined with other promotions",
              "BiteMitra reserves the right to modify or cancel offers",
              "Valid on select restaurants and items only",
              "In case of any dispute, BiteMitra's decision will be final",
            ].map((term, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-gray-600 text-sm"
              >
                <span className="text-orange-500 mt-1">•</span>
                <span>{term}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 py-12 mt-8"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Need Help with Offers?
          </h3>
          <p className="text-orange-100 mb-6">
            Contact our customer support for any offer-related queries
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Contact Support
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}