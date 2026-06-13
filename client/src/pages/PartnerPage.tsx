import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FaUtensils, 
  FaMotorcycle, 
  FaChartLine, 
  FaHeadset, 
  FaShieldAlt, 
  FaRupeeSign,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaStore,
  FaTruck,
  FaCreditCard,
  FaChartBar,
  FaClock,
  FaHandshake
} from 'react-icons/fa';
import { FiTrendingUp, FiAward, FiSmile, FiZap, FiGlobe } from 'react-icons/fi';

// Types
interface StatItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

interface StepItem {
  number: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: string; label: string; suffix?: string; icon?: React.ReactNode }> = ({ 
  value, label, suffix = "", icon 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const hasPlus = value.includes('+');

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
    >
      {icon && <div className="text-3xl mb-3 text-white/80">{icon}</div>}
      <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
        {count}{hasPlus ? '+' : ''}{suffix}
      </div>
      <div className="text-white/80 text-sm md:text-base">{label}</div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<FeatureItem> = ({ icon, title, description, color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <div className={`bg-gradient-to-br ${color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-white text-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// Step Component
const StepCard: React.FC<StepItem> = ({ number, title, description, icon }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: number * 0.1 }}
      className="text-center relative"
    >
      <div className="relative">
        <div className={`bg-gradient-to-br from-orange-500 to-orange-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg`}>
          {icon || number}
        </div>
        {number < 4 && (
          <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-orange-200 to-transparent -translate-y-1/2" />
        )}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard: React.FC<Testimonial> = ({ name, role, content, rating, avatar }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">"{content}"</p>
      <div className="flex items-center gap-3">
        {avatar ? (
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
            {name.charAt(0)}
          </div>
        )}
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Partner Program Card Component
const PartnerProgramCard: React.FC<{
  type: 'restaurant' | 'delivery';
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  buttonText: string;
  color: string;
}> = ({ type, icon, title, description, benefits, buttonText, color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: type === 'restaurant' ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden group"
    >
      <div className={`bg-gradient-to-br ${color} p-6 text-white`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{icon}</div>
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-gray-600 text-sm"
            >
              <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
              <span>{benefit}</span>
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full bg-gradient-to-r ${color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
        >
          {buttonText}
          <FaArrowRight className="text-sm" />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Main Component
const PartnerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'delivery'>('restaurant');
  const heroRef = useRef<HTMLDivElement>(null);

  // Statistics data
  const stats: StatItem[] = [
    { value: "50K+", label: "Restaurant Partners", icon: <FaStore /> },
    { value: "500+", label: "Cities Across Nepal", icon: <FiGlobe /> },
    { value: "10M+", label: "Orders Delivered Monthly", icon: <FaTruck />, suffix: "+" },
  ];

  // Features data
  const features: FeatureItem[] = [
    {
      icon: <FaChartLine />,
      title: "Increased Visibility",
      description: "Reach millions of customers and boost your sales with our marketing tools",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaMotorcycle />,
      title: "Reliable Delivery",
      description: "Fast and efficient delivery network with real-time tracking",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "Timely and secure payment settlements with automated systems",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaChartBar />,
      title: "Advanced Analytics",
      description: "Data-driven insights to understand customer preferences",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <FaUsers />,
      title: "Customer Support",
      description: "24/7 dedicated support for all your business needs",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: <FaCreditCard />,
      title: "Easy Onboarding",
      description: "Simple and quick registration process with minimal documentation",
      color: "from-teal-500 to-green-500",
    },
  ];

  // Steps data
  const steps: StepItem[] = [
    {
      number: 1,
      title: "Register",
      description: "Sign up with your business details",
      icon: <FaHandshake />,
    },
    {
      number: 2,
      title: "Onboard",
      description: "Complete verification and setup",
      icon: <FaCheckCircle />,
    },
    {
      number: 3,
      title: "Go Live",
      description: "Start receiving orders instantly",
      icon: <FiZap />,
    },
    {
      number: 4,
      title: "Grow",
      description: "Expand your business with analytics",
      icon: <FiTrendingUp />,
    },
  ];

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Restaurant Owner",
      content: "Partnering with BiteMitra helped us increase our sales by 300%. The platform is easy to use and the support team is always helpful.",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Delivery Partner",
      content: "As a delivery partner, I enjoy the flexibility and earning potential. The weekly payments are always on time and reliable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Cafe Owner",
      content: "BiteMitra's analytics helped us understand customer preferences better. Our business has grown tremendously since joining.",
      rating: 4,
    },
    {
      id: 4,
      name: "Sneha Gurung",
      role: "Restaurant Manager",
      content: "The support team is amazing! They helped us set up everything and we saw orders coming in within days.",
      rating: 5,
    },
  ];

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              >
                <span className="text-white text-sm font-semibold">✨ Join the Success Story</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Start your journey with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-200">
                  BiteMitra
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                Join Nepal's largest food delivery network and grow your business with our comprehensive partner program
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScrollToSection('partner-programs')}
                  className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  Partner with Us
                  <FaArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScrollToSection('features')}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative z-10 container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                suffix={stat.suffix}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Why Partner with BiteMitra?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of successful partners who trust BiteMitra for growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started in 4 simple steps and start growing your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step) => (
              <StepCard key={step.number} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* Partner Programs Section */}
      <section id="partner-programs" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Partner Programs</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the perfect partnership model for your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <PartnerProgramCard
              type="restaurant"
              icon={<FaUtensils />}
              title="Restaurant Partners"
              description="List your restaurant on BiteMitra and reach millions of food lovers"
              benefits={[
                "Increased customer reach",
                "Marketing support",
                "Real-time analytics",
                "Dedicated account manager"
              ]}
              buttonText="Join as Restaurant"
              color="from-orange-500 to-red-500"
            />
            <PartnerProgramCard
              type="delivery"
              icon={<FaMotorcycle />}
              title="Delivery Partners"
              description="Become a delivery partner and earn flexible income"
              benefits={[
                "Flexible working hours",
                "Weekly payments",
                "Insurance coverage",
                "Performance bonuses"
              ]}
              buttonText="Join as Delivery Partner"
              color="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Success Stories</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear from our happy partners about their journey with BiteMitra
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of successful partners who are growing their business with BiteMitra
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              >
                Sign Up Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300"
              >
                Contact Sales
              </motion.button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <FaHeadset className="text-xl" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-xl" />
                <span>Secure Partnership</span>
              </div>
              <div className="flex items-center gap-2">
                <FaRupeeSign className="text-xl" />
                <span>Zero Registration Fee</span>
              </div>
              <div className="flex items-center gap-2">
                <FiSmile className="text-xl" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default PartnerPage;