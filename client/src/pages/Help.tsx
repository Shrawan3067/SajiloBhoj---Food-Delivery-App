import React, { useState, useEffect } from "react";
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
  FiChevronRight as FiChevronRightAlt,
} from "react-icons/fi";
import {
  MdOutlineRestaurant,
  MdOutlineLocalOffer,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { BsQuestionCircle, BsChatDots } from "react-icons/bs";
import { RiCustomerService2Line, RiRefundLine } from "react-icons/ri";

type FAQ = any;
type FAQCategory = any;

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [faqOpen, setFaqOpen] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("popular");

  const faqCategories: FAQCategory[] = [
    {
      id: "account",
      title: "Account & Profile",
      icon: <FiUser className="text-xl" />,
      color: "bg-blue-100 text-blue-600",
      faqs: [
        {
          id: "acc1",
          question: "How do I create a BiteXpress account?",
          answer:
            "You can create a BiteXpress account using your mobile number or email address. Simply download the app, enter your details, and verify with OTP.",
        },
        {
          id: "acc2",
          question: "How to reset my password?",
          answer:
            'Go to Profile → Settings → Change Password. Enter your current password and set a new one. If you forgot your password, use the "Forgot Password" option on the login screen.',
        },
        {
          id: "acc3",
          question: "How to update my delivery address?",
          answer:
            "Navigate to Profile → My Addresses → Add New Address or edit existing ones. You can save multiple addresses for quick selection.",
        },
      ],
    },
    {
      id: "orders",
      title: "Orders & Delivery",
      icon: <FiPackage className="text-xl" />,
      color: "bg-green-100 text-green-600",
      faqs: [
        {
          id: "ord1",
          question: "How can I track my order?",
          answer:
            "Go to My Orders → Select the ongoing order → View Live Tracking. You can see the real-time status and estimated delivery time.",
        },
        {
          id: "ord2",
          question: "What is the delivery time?",
          answer:
            "Delivery time varies from 20-45 minutes depending on restaurant preparation time, distance, and traffic conditions. You can see the estimated time before placing your order.",
        },
        {
          id: "ord3",
          question: "Can I modify or cancel my order?",
          answer:
            "You can modify or cancel your order within 1 minute of placing it. After that, please contact the restaurant directly via the app.",
        },
      ],
    },
    {
      id: "payments",
      title: "Payments & Refunds",
      icon: <FiCreditCard className="text-xl" />,
      color: "bg-purple-100 text-purple-600",
      faqs: [
        {
          id: "pay1",
          question: "What payment methods are accepted?",
          answer:
            "We accept credit/debit cards, net banking, UPI, wallets (Paytm, PhonePe, Google Pay), and cash on delivery.",
        },
        {
          id: "pay2",
          question: "How long do refunds take?",
          answer:
            "Refunds to bank accounts take 5-7 business days. UPI refunds are processed within 24 hours. Wallet refunds are instant.",
        },
        {
          id: "pay3",
          question: "Why was my payment declined?",
          answer:
            "Payment may decline due to insufficient funds, incorrect details, bank server issues, or security restrictions. Try another payment method or contact your bank.",
        },
      ],
    },
    {
      id: "safety",
      title: "Safety & Hygiene",
      icon: <FiShield className="text-xl" />,
      color: "bg-red-100 text-red-600",
      faqs: [
        {
          id: "safe1",
          question: "What safety measures are taken during delivery?",
          answer:
            "All delivery partners wear masks, use hand sanitizers, maintain social distancing, and follow contactless delivery protocols.",
        },
        {
          id: "safe2",
          question: "How are restaurants ensuring food safety?",
          answer:
            "Partner restaurants follow strict hygiene protocols, regular health checks for staff, and temperature monitoring.",
        },
      ],
    },
    {
      id: "restaurants",
      title: "Restaurant Partners",
      icon: <MdOutlineRestaurant className="text-xl" />,
      color: "bg-orange-100 text-orange-600",
      faqs: [
        {
          id: "res1",
          question: "How to become a restaurant partner?",
          answer:
            'Visit our website and click "Partner with Us" → Restaurant Partner → Fill the form. Our team will contact you within 48 hours.',
        },
        {
          id: "res2",
          question: "What are the commission charges?",
          answer:
            "Commission varies based on location and restaurant type. Our partnership team will provide detailed pricing during onboarding.",
        },
      ],
    },
    {
      id: "offers",
      title: "Offers & Promotions",
      icon: <MdOutlineLocalOffer className="text-xl" />,
      color: "bg-pink-100 text-pink-600",
      faqs: [
        {
          id: "off1",
          question: "How to apply promo codes?",
          answer:
            "Add items to cart → Proceed to checkout → Apply Promo Code section → Enter code → Apply. Discount will be reflected in total.",
        },
        {
          id: "off2",
          question: "Why is my promo code not working?",
          answer:
            "Check if the code has expired, meets minimum order value, is valid for the restaurant, and hasn't exceeded usage limit.",
        },
      ],
    },
  ];

  const popularIssues = [
    {
      id: 1,
      title: "Track Order",
      description: "Where is my order? Check live tracking",
      icon: <FiTruck className="text-2xl" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      title: "Cancel Order",
      description: "How to cancel or modify order",
      icon: <FiPackage className="text-2xl" />,
      color: "bg-red-50 text-red-600",
    },
    {
      id: 3,
      title: "Payment Issues",
      description: "Payment failed or refund status",
      icon: <FiCreditCard className="text-2xl" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      id: 4,
      title: "Refund Status",
      description: "Check refund timeline and status",
      icon: <RiRefundLine className="text-2xl" />,
      color: "bg-green-50 text-green-600",
    },
    {
      id: 5,
      title: "Account Issues",
      description: "Login, password, or profile issues",
      icon: <MdOutlineAccountCircle className="text-2xl" />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: 6,
      title: "Report Issues",
      description: "Report order or delivery issues",
      icon: <BsQuestionCircle className="text-2xl" />,
      color: "bg-pink-50 text-pink-600",
    },
  ];

  const helpTopics = [
    {
      id: 1,
      title: "Getting Started",
      items: [
        "Create Account",
        "Verify Mobile Number",
        "Set Delivery Location",
        "Browse Restaurants",
      ],
    },
    {
      id: 2,
      title: "Ordering",
      items: [
        "Place Order",
        "Track Order",
        "Modify Order",
        "Cancel Order",
        "Reorder",
      ],
    },
    {
      id: 3,
      title: "Payments",
      items: [
        "Payment Methods",
        "Apply Coupons",
        "Cashback Offers",
        "Refund Policy",
      ],
    },
    {
      id: 4,
      title: "Account",
      items: [
        "Profile Settings",
        "Address Management",
        "Order History",
        "Favorite Restaurants",
      ],
    },
  ];

  const contactOptions = [
    {
      id: 1,
      title: "Chat Support",
      description: "24/7 available",
      icon: <BsChatDots className="text-2xl" />,
      action: "Start Chat",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 2,
      title: "Call Support",
      description: "10 AM - 10 PM",
      icon: <FiPhone className="text-2xl" />,
      action: "Call Now",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      title: "Email Support",
      description: "Response within 24 hours",
      icon: <FiMail className="text-2xl" />,
      action: "Send Email",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const toggleFaq = (id: string) => {
    setFaqOpen(faqOpen === id ? null : id);
  };

  const filteredFaqs = faqCategories.flatMap((category: any) =>
    category.faqs.filter(
      (faq: any) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-10" />

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FiHelpCircle className="text-3xl text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Help & Support
            </h1>
          </div>
          <p className="text-orange-100 text-lg mb-6">
            Find answers, get support, or contact our team
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What can we help you with? Search for questions..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-white">
                Found {filteredFaqs.length} results for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular Issues</h2>
            <button className="text-orange-500 font-medium flex items-center gap-1">
              View All <FiChevronRightAlt />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div
                  className={`${issue.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  {issue.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{issue.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {issue.description}
                </p>
                <button className="text-orange-500 font-medium text-sm flex items-center gap-1">
                  View Details <FiChevronRightAlt />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Browse Help Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <h3 className="font-bold text-xl mb-4">{topic.title}</h3>
                <ul className="space-y-3">
                  {topic.items.map((item: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-700 hover:text-orange-500 cursor-pointer"
                    >
                      <FiChevronRightAlt className="text-sm" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSection("popular")}
                className={`px-4 py-2 rounded-lg ${activeSection === "popular" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                Popular
              </button>
              <button
                onClick={() => setActiveSection("all")}
                className={`px-4 py-2 rounded-lg ${activeSection === "all" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}
              >
                All FAQs
              </button>
            </div>
          </div>

          {searchQuery && filteredFaqs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Search Results</h3>
              <div className="space-y-4">
                {filteredFaqs.map((faq: any) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <h4 className="font-bold text-lg">{faq.question}</h4>
                      {faqOpen === faq.id ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                    {faqOpen === faq.id && (
                      <div className="mt-4 text-gray-600">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`${category.color} w-10 h-10 rounded-lg flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.faqs.slice(0, 2).map((faq: any) => (
                    <div key={faq.id}>
                      <div
                        className="flex justify-between items-center cursor-pointer py-2"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span className="font-medium text-gray-700 hover:text-orange-500">
                          {faq.question}
                        </span>
                        {faqOpen === faq.id ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </div>
                      {faqOpen === faq.id && (
                        <div className="mt-2 mb-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {category.faqs.length > 2 && (
                  <button className="mt-4 text-orange-500 font-medium text-sm flex items-center gap-1">
                    View {category.faqs.length - 2} more questions{" "}
                    <FiChevronRightAlt />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <RiCustomerService2Line className="text-3xl text-orange-600" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Still Need Help?
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Our customer support team is here to help you 24/7. Choose
                  your preferred contact method.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactOptions.map((option) => (
                    <div
                      key={option.id}
                      className="bg-white rounded-xl p-4 shadow-sm"
                    >
                      <div
                        className={`${option.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}
                      >
                        {option.icon}
                      </div>
                      <h3 className="font-bold mb-1">{option.title}</h3>
                      <p className="text-gray-500 text-sm mb-3">
                        {option.description}
                      </p>
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors w-full">
                        {option.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-orange-500" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-gray-600">1800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="text-orange-500" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-gray-600">support@bitexpress.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiClock className="text-orange-500" />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p className="text-gray-600">24/7 (Chat & Email)</p>
                      <p className="text-gray-600 text-sm">
                        10 AM - 10 PM (Phone)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMapPin className="text-orange-500" />
                    <div>
                      <p className="font-medium">Corporate Office</p>
                      <p className="text-gray-600">Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FiFileText className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Policies & Terms</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-orange-500 cursor-pointer">
                  Terms of Service
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Cancellation Policy
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Refund Policy
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FiStar className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Community & Reviews</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-orange-500 cursor-pointer">
                  Customer Reviews
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Rate Your Experience
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Feedback & Suggestions
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Community Guidelines
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="bg-purple-50 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <BsQuestionCircle className="text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2">Help Center</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-orange-500 cursor-pointer">
                  Video Tutorials
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  User Guide
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  Troubleshooting
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  FAQ Archive
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-orange-50 text-orange-600 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-orange-100 transition-colors">
              <FiMessageSquare className="text-2xl mb-2" />
              <span className="font-medium">Live Chat</span>
            </button>
            <button className="bg-blue-50 text-blue-600 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-blue-100 transition-colors">
              <FiPhone className="text-2xl mb-2" />
              <span className="font-medium">Call Back</span>
            </button>
            <button className="bg-green-50 text-green-600 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-green-100 transition-colors">
              <FiMail className="text-2xl mb-2" />
              <span className="font-medium">Email Us</span>
            </button>
            <button className="bg-purple-50 text-purple-600 p-4 rounded-xl flex flex-col items-center justify-center hover:bg-purple-100 transition-colors">
              <FiFileText className="text-2xl mb-2" />
              <span className="font-medium">File Complaint</span>
            </button>
          </div>
        </section>
      </div>

      <div className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            Need immediate assistance? Call us at{" "}
            <span className="font-bold">1800-123-4567</span> or chat with us
            24/7
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Average response time: Chat - 2 mins, Email - 24 hours, Call - 5
            mins
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
