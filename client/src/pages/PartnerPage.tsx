import React from 'react';
import { FaUtensils, FaMotorcycle, FaChartLine, FaHeadset, FaShieldAlt, FaRupeeSign } from 'react-icons/fa';

const PartnerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Start your journey with BiteXpress</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join Nepal's largest food delivery network and grow your business</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">Partner with Us</button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition duration-300">Learn More</button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">50K+</div>
              <p className="text-gray-600">Restaurant Partners</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <p className="text-gray-600">Cities Across Nepal</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-500 mb-2">10M+</div>
              <p className="text-gray-600">Orders Delivered Monthly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Partner with BiteXpress?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaChartLine className="text-orange-500 text-2xl" /></div>
              <h3 className="text-xl font-semibold mb-3">Increased Visibility</h3>
              <p className="text-gray-600">Reach millions of customers and boost your sales</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaMotorcycle className="text-orange-500 text-2xl" /></div>
              <h3 className="text-xl font-semibold mb-3">Reliable Delivery</h3>
              <p className="text-gray-600">Fast and efficient delivery network</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><FaShieldAlt className="text-orange-500 text-2xl" /></div>
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-gray-600">Timely and secure payment settlements</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1,2,3,4].map((n) => (
              <div key={n} className="text-center">
                <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{n}</div>
                <h3 className="text-lg font-semibold mb-2">{n === 1 ? 'Register' : n === 2 ? 'Onboard' : n === 3 ? 'Go Live' : 'Grow'}</h3>
                <p className="text-gray-600">{n === 1 ? 'Sign up with your restaurant details' : n === 2 ? 'Complete the verification process' : n === 3 ? 'Start receiving orders' : 'Expand your business'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Partner Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4"><FaUtensils className="text-orange-500 text-3xl mr-4" /><h3 className="text-2xl font-bold">Restaurant Partners</h3></div>
              <p className="text-gray-600 mb-4">List your restaurant on BiteXpress and reach millions of food lovers. We handle delivery while you focus on creating amazing food.</p>
              <ul className="space-y-2 mb-6"><li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Increased customer reach</li><li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Marketing support</li><li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Real-time analytics</li></ul>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300">Join as Restaurant</button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-4"><FaMotorcycle className="text-orange-500 text-3xl mr-4" /><h3 className="text-2xl font-bold">Delivery Partners</h3></div>
              <p className="text-gray-600 mb-4">Become a BiteXpress delivery partner and earn flexible income. Choose your own hours and be your own boss.</p>
              <ul className="space-y-2 mb-6"><li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Flexible working hours</li><li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Weekly payments</li><li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Insurance coverage</li></ul>
              <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300">Join as Delivery Partner</button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg"><div className="text-orange-500 text-2xl mb-4">"</div><p className="text-gray-600 mb-4">Partnering with BiteXpress helped us increase our sales by 300%. The platform is easy to use and the support team is always helpful.</p><div className="font-semibold">- Rajesh Kumar, Restaurant Owner</div></div>
            <div className="bg-gray-50 p-6 rounded-lg"><div className="text-orange-500 text-2xl mb-4">"</div><p className="text-gray-600 mb-4">As a delivery partner, I enjoy the flexibility and earning potential. The weekly payments are always on time.</p><div className="font-semibold">- Priya Sharma, Delivery Partner</div></div>
            <div className="bg-gray-50 p-6 rounded-lg"><div className="text-orange-500 text-2xl mb-4">"</div><p className="text-gray-600 mb-4">BiteXpress's analytics helped us understand customer preferences better. Our business has grown tremendously.</p><div className="font-semibold">- Amit Patel, Cafe Owner</div></div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of successful partners who are growing their business with BiteXpress</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">Sign Up Now</button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition duration-300">Contact Sales</button>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center"><FaHeadset className="text-xl mr-2" /><span>24/7 Support</span></div>
            <div className="flex items-center"><FaShieldAlt className="text-xl mr-2" /><span>Secure Partnership</span></div>
            <div className="flex items-center"><FaRupeeSign className="text-xl mr-2" /><span>Zero Registration Fee</span></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
