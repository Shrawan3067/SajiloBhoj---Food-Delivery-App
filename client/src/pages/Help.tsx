import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FiSearch,
  FiHelpCircle,
  FiUser,
  FiPackage,
  FiCreditCard,
  FiShield,
  FiTruck,
  FiStar,
  FiMessageSquare,
  FiChevronRight,
  FiClock,
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
  FiFileText,
  FiTrendingUp,
  FiAward,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";
import {
  MdOutlineRestaurant,
  MdOutlineLocalOffer,
  MdOutlineAccountCircle,
  MdChat,
  MdCall,
  MdEmail,
  MdAccessTime,
} from "react-icons/md";
import { BsQuestionCircle, BsChatDots, BsStars } from "react-icons/bs";
import { RiCustomerService2Line, RiRefundLine, RiSecurePaymentLine } from "react-icons/ri";

// Types
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPopular?: boolean;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  faqs: FAQ[];
}

interface PopularIssue {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: string;
}

interface ContactOption {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  color: string;
  link?: string;
}

// Enhanced FAQ Data
const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "account",
    title: "Account & Profile",
    icon: <FiUser />,
    color: "text-blue-600",
    bgColor: "from-blue-500 to-blue-600",
    faqs: [
      {
        id: "acc1",
        question: "How do I create a BiteMitra account?",
        answer: "You can create a BiteMitra account using your mobile number or email address. Simply download the app, enter your details, and verify with OTP. The process takes less than 2 minutes.",
        category: "account",
        isPopular: true,
      },
      {
        id: "acc2",
        question: "How to reset my password?",
        answer: "Go to Profile → Settings → Change Password. Enter your current password and set a new one. If you forgot your password, use the 'Forgot Password' option on the login screen. You'll receive a reset link via email/SMS.",
        category: "account",
      },
      {
        id: "acc3",
        question: "How to update my delivery address?",
        answer: "Navigate to Profile → My Addresses → Add New Address or edit existing ones. You can save multiple addresses for quick selection. Make sure to set a default address for faster checkout.",
        category: "account",
        isPopular: true,
      },
      {
        id: "acc4",
        question: "Can I delete my account?",
        answer: "Yes, you can delete your account by going to Profile → Settings → Delete Account. Please note this action is irreversible and all your data will be permanently removed.",
        category: "account",
      },
    ],
  },
  {
    id: "orders",
    title: "Orders & Delivery",
    icon: <FiPackage />,
    color: "text-green-600",
    bgColor: "from-green-500 to-emerald-600",
    faqs: [
      {
        id: "ord1",
        question: "How can I track my order?",
        answer: "Go to My Orders → Select the ongoing order → View Live Tracking. You can see the real-time status, driver location, and estimated delivery time. You'll also receive SMS updates at each stage.",
        category: "orders",
        isPopular: true,
      },
      {
        id: "ord2",
        question: "What is the delivery time?",
        answer: "Delivery time varies from 20-45 minutes depending on restaurant preparation time, distance, and traffic conditions. You can see the estimated time before placing your order. Express delivery options are available for select restaurants.",
        category: "orders",
      },
      {
        id: "ord3",
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel your order within 1 minute of placing it. After that, please contact the restaurant directly via the app. Cancellation charges may apply based on restaurant policy.",
        category: "orders",
        isPopular: true,
      },
      {
        id: "ord4",
        question: "What if my order is delayed?",
        answer: "If your order is delayed beyond the estimated time, you'll receive a compensation coupon. Contact support if the delay exceeds 15 minutes for immediate assistance.",
        category: "orders",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Refunds",
    icon: <FiCreditCard />,
    color: "text-purple-600",
    bgColor: "from-purple-500 to-pink-600",
    faqs: [
      {
        id: "pay1",
        question: "What payment methods are accepted?",
        answer: "We accept credit/debit cards (Visa, Mastercard, RuPay), net banking (all major banks), UPI (Google Pay, PhonePe, Paytm), wallets, and cash on delivery. All payments are secure and encrypted.",
        category: "payments",
        isPopular: true,
      },
      {
        id: "pay2",
        question: "How long do refunds take?",
        answer: "Refunds to bank accounts take 5-7 business days. UPI refunds are processed within 24 hours. Wallet refunds are instant. The timeline depends on your payment method and bank processing time.",
        category: "payments",
      },
      {
        id: "pay3",
        question: "Why was my payment declined?",
        answer: "Payment may decline due to insufficient funds, incorrect details, bank server issues, security restrictions, or exceeded transaction limits. Try another payment method or contact your bank for assistance.",
        category: "payments",
        isPopular: true,
      },
    ],
  },
  {
    id: "safety",
    title: "Safety & Hygiene",
    icon: <FiShield />,
    color: "text-red-600",
    bgColor: "from-red-500 to-rose-600",
    faqs: [
      {
        id: "safe1",
        question: "What safety measures are taken during delivery?",
        answer: "All delivery partners wear masks, use hand sanitizers, maintain social distancing, and follow contactless delivery protocols. Temperature checks are conducted daily for all delivery partners.",
        category: "safety",
        isPopular: true,
      },
      {
        id: "safe2",
        question: "How are restaurants ensuring food safety?",
        answer: "Partner restaurants follow strict hygiene protocols, regular health checks for staff, temperature monitoring, and HACCP guidelines. We conduct regular audits to ensure compliance.",
        category: "safety",
      },
    ],
  },
  {
    id: "restaurants",
    title: "Restaurant Partners",
    icon: <MdOutlineRestaurant />,
    color: "text-orange-600",
    bgColor: "from-orange-500 to-red-600",
    faqs: [
      {
        id: "res1",
        question: "How to become a restaurant partner?",
        answer: "Visit our website and click 'Partner with Us' → Restaurant Partner → Fill the form. Our team will contact you within 48 hours with onboarding details. No upfront costs required.",
        category: "restaurants",
        isPopular: true,
      },
      {
        id: "res2",
        question: "What are the commission charges?",
        answer: "Commission varies based on location, restaurant type, and services opted. Our partnership team will provide detailed pricing during onboarding with complete transparency.",
        category: "restaurants",
      },
    ],
  },
  {
    id: "offers",
    title: "Offers & Promotions",
    icon: <MdOutlineLocalOffer />,
    color: "text-pink-600",
    bgColor: "from-pink-500 to-rose-600",
    faqs: [
      {
        id: "off1",
        question: "How to apply promo codes?",
        answer: "Add items to cart → Proceed to checkout → Apply Promo Code section → Enter code → Apply. Discount will be reflected in total. You can use only one promo code per order.",
        category: "offers",
        isPopular: true,
      },
      {
        id: "off2",
        question: "Why is my promo code not working?",
        answer: "Check if the code has expired, meets minimum order value, is valid for the restaurant, hasn't exceeded usage limit, or if you've already used it. Some codes are valid only for first-time users.",
        category: "offers",
      },
    ],
  },
];

const POPULAR_ISSUES: PopularIssue[] = [
  {
    id: 1,
    title: "Track Order",
    description: "Real-time tracking of your delivery",
    icon: <FiTruck />,
    color: "from-blue-500 to-blue-600",
    action: "Track Now",
  },
  {
    id: 2,
    title: "Cancel Order",
    description: "Quick cancellation assistance",
    icon: <FiPackage />,
    color: "from-red-500 to-red-600",
    action: "Cancel Order",
  },
  {
    id: 3,
    title: "Payment Issues",
    description: "Payment failed or refund status",
    icon: <FiCreditCard />,
    color: "from-purple-500 to-purple-600",
    action: "Resolve Now",
  },
  {
    id: 4,
    title: "Refund Status",
    description: "Check refund timeline",
    icon: <RiRefundLine />,
    color: "from-green-500 to-emerald-600",
    action: "Check Status",
  },
  {
    id: 5,
    title: "Account Issues",
    description: "Login or profile help",
    icon: <MdOutlineAccountCircle />,
    color: "from-orange-500 to-orange-600",
    action: "Fix Issue",
  },
  {
    id: 6,
    title: "Report Issues",
    description: "Order or delivery problems",
    icon: <FiAlertCircle />,
    color: "from-pink-500 to-rose-600",
    action: "Report Now",
  },
];

const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: 1,
    title: "Live Chat",
    description: "Instant response, 24/7",
    icon: <BsChatDots />,
    action: "Start Chat",
    color: "from-green-500 to-emerald-600",
    link: "#chat",
  },
  {
    id: 2,
    title: "Call Support",
    description: "10 AM - 10 PM",
    icon: <FiPhone />,
    action: "Call Now",
    color: "from-blue-500 to-blue-600",
    link: "tel:18001234567",
  },
  {
    id: 3,
    title: "Email Support",
    description: "Response within 24h",
    icon: <FiMail />,
    action: "Send Email",
    color: "from-purple-500 to-purple-600",
    link: "mailto:support@bitemitra.com",
  },
];

// FAQ Accordion Component
const FAQAccordion: React.FC<{ faq: FAQ; isOpen: boolean; onToggle: () => void }> = ({ 
  faq, isOpen, onToggle 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-100 rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 pb-4"
          >
            <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Category Card Component
const CategoryCard: React.FC<{
  category: FAQCategory;
  onViewMore: (categoryId: string) => void;
}> = ({ category, onViewMore }) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${category.bgColor} p-4 text-white`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">{category.icon}</div>
          <h3 className="font-bold text-lg">{category.title}</h3>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {category.faqs.slice(0, 3).map((faq) => (
          <FAQAccordion
            key={faq.id}
            faq={faq}
            isOpen={expandedFAQ === faq.id}
            onToggle={() => toggleFAQ(faq.id)}
          />
        ))}
        
        {category.faqs.length > 3 && (
          <button
            onClick={() => onViewMore(category.id)}
            className="mt-3 text-orange-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all {category.faqs.length} questions
            <FiChevronRight className="text-sm" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

// Search Results Component
const SearchResults: React.FC<{ 
  results: FAQ[]; 
  onClose: () => void;
  onFAQClick: (faq: FAQ) => void;
}> = ({ results, onClose, onFAQClick }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mt-4 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">
          Found {results.length} results
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          ×
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {results.map((faq) => (
          <div key={faq.id} className="border-b border-gray-50 last:border-0">
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{faq.question}</span>
                <FiChevronDown
                  className={`text-gray-400 transition-transform ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </div>
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2"
                  >
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                    <button
                      onClick={() => onFAQClick(faq)}
                      className="mt-2 text-orange-500 text-sm font-medium flex items-center gap-1"
                    >
                      View full details
                      <FiArrowRight className="text-xs" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Component
const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [activeSection, setActiveSection] = useState<"popular" | "all">("popular");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const results: FAQ[] = [];
    
    FAQ_CATEGORIES.forEach(category => {
      category.faqs.forEach(faq => {
        if (faq.question.toLowerCase().includes(query) || 
            faq.answer.toLowerCase().includes(query)) {
          results.push({ ...faq, category: category.title });
        }
      });
    });
    
    return results;
  }, [searchQuery]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSearchResults(false);
    searchInputRef.current?.focus();
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <FiHelpCircle className="text-3xl text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Help & Support
                </h1>
              </div>
              <p className="text-orange-100 text-lg mb-8 max-w-2xl">
                Find answers, get support, or contact our team. We're here to help 24/7.
              </p>

              {/* Search Bar */}
              <div className="max-w-3xl mx-auto relative">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="What can we help you with? Search for questions..."
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Search Results */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <SearchResults
                      results={searchResults}
                      onClose={() => setShowSearchResults(false)}
                      onFAQClick={(faq) => {
                        setShowSearchResults(false);
                        setSearchQuery("");
                        scrollToSection(faq.category.toLowerCase());
                      }}
                    />
                  )}
                </AnimatePresence>

                {searchQuery && searchResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-white/80"
                  >
                    No results found for "{searchQuery}". Try different keywords.
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Popular Issues Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Popular Issues
              </h2>
              <p className="text-gray-500 mt-1">Most commonly asked questions</p>
            </div>
            <button className="text-orange-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <FiChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POPULAR_ISSUES.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`bg-gradient-to-br ${issue.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white text-2xl">{issue.icon}</div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{issue.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{issue.description}</p>
                <button className="text-orange-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  {issue.action} <FiChevronRight className="text-sm" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Categories Section */}
        <section id="faq" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 mt-1">Quick answers to common questions</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSection("popular")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === "popular"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveSection("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === "all"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                All FAQs
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FAQ_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onViewMore={(id) => scrollToSection(id)}
              />
            ))}
          </div>
        </section>

        {/* Help Topics Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Browse Help Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: "Getting Started",
                items: ["Create Account", "Verify Mobile Number", "Set Delivery Location", "Browse Restaurants"],
                icon: <BsStars />,
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Ordering",
                items: ["Place Order", "Track Order", "Modify Order", "Cancel Order", "Reorder"],
                icon: <FiPackage />,
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "Payments",
                items: ["Payment Methods", "Apply Coupons", "Cashback Offers", "Refund Policy"],
                icon: <RiSecurePaymentLine />,
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Account",
                items: ["Profile Settings", "Address Management", "Order History", "Favorite Restaurants"],
                icon: <FiUser />,
                color: "from-orange-500 to-red-500",
              },
            ].map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className={`bg-gradient-to-br ${topic.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <div className="text-white text-xl">{topic.icon}</div>
                </div>
                <h3 className="font-bold text-xl mb-4 text-gray-800">{topic.title}</h3>
                <ul className="space-y-2">
                  {topic.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-600 hover:text-orange-500 cursor-pointer group"
                    >
                      <FiChevronRight className="text-sm text-gray-400 group-hover:text-orange-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Support Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 md:p-10">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl">
                    <RiCustomerService2Line className="text-2xl text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Still Need Help?
                  </h2>
                </div>
                <p className="text-gray-600 mb-8 text-lg">
                  Our customer support team is here to help you 24/7. Choose your preferred contact method.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {CONTACT_OPTIONS.map((option) => (
                    <motion.a
                      key={option.id}
                      href={option.link}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all block"
                    >
                      <div className={`bg-gradient-to-br ${option.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                        <div className="text-white text-xl">{option.icon}</div>
                      </div>
                      <h3 className="font-bold mb-1 text-gray-800">{option.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">{option.description}</p>
                      <button className="text-orange-500 font-medium text-sm flex items-center gap-1">
                        {option.action} <FiChevronRight />
                      </button>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg min-w-[280px]"
              >
                <h3 className="font-bold text-xl mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <FiPhone className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Call Us</p>
                      <p className="text-gray-600">1800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <FiMail className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Email Us</p>
                      <p className="text-gray-600">support@bitemitra.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <MdAccessTime className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Support Hours</p>
                      <p className="text-gray-600">24/7 (Chat & Email)</p>
                      <p className="text-gray-500 text-sm">10 AM - 10 PM (Phone)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <FiMapPin className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Corporate Office</p>
                      <p className="text-gray-600">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Additional Resources Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Policies & Terms",
                icon: <FiFileText />,
                color: "from-blue-500 to-blue-600",
                items: ["Terms of Service", "Privacy Policy", "Cancellation Policy", "Refund Policy"],
              },
              {
                title: "Community & Reviews",
                icon: <FiStar />,
                color: "from-green-500 to-emerald-600",
                items: ["Customer Reviews", "Rate Your Experience", "Feedback & Suggestions", "Community Guidelines"],
              },
              {
                title: "Help Center",
                icon: <BsQuestionCircle />,
                color: "from-purple-500 to-purple-600",
                items: ["Video Tutorials", "User Guide", "Troubleshooting", "FAQ Archive"],
              },
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className={`bg-gradient-to-br ${resource.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <div className="text-white text-xl">{resource.icon}</div>
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">{resource.title}</h3>
                <ul className="space-y-2">
                  {resource.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-gray-600 hover:text-orange-500 cursor-pointer text-sm flex items-center gap-2"
                    >
                      <FiChevronRight className="text-xs" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <MdChat />, label: "Live Chat", color: "from-orange-500 to-orange-600" },
              { icon: <MdCall />, label: "Call Back", color: "from-blue-500 to-blue-600" },
              { icon: <MdEmail />, label: "Email Us", color: "from-green-500 to-emerald-600" },
              { icon: <FiFileText />, label: "File Complaint", color: "from-purple-500 to-purple-600" },
            ].map((action, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-br ${action.color} text-white p-4 rounded-xl flex flex-col items-center gap-2 hover:shadow-lg transition-all`}
              >
                <div className="text-2xl">{action.icon}</div>
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300 mb-2">
            Need immediate assistance? Call us at{" "}
            <span className="font-bold text-orange-400">1800-123-4567</span> or chat with us 24/7
          </p>
          <p className="text-gray-400 text-sm">
            Average response time: Chat - 2 mins, Email - 24 hours, Call - 5 mins
          </p>
        </div>
      </div>

      <style>{`
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HelpPage;