// src/pages/CheckoutPage.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaArrowLeft, FaMapMarkerAlt, FaClock, FaWallet, FaCreditCard, FaMoneyBill, FaUser, FaPhone, FaHome, FaUtensils, FaShieldAlt, FaHeadset, FaEye, FaEyeSlash } from "react-icons/fa";

export default function CheckoutPage() {
  const { cart, clearCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  
  // Card payment details
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    saveCard: false
  });
  
  // UPI payment details
  const [upiId, setUpiId] = useState("");
  const [showCvv, setShowCvv] = useState(false);

  const deliveryFee = 30;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleInputChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

const handlePlaceOrder = async () => {
  if (!deliveryDetails.name || !deliveryDetails.phone || !deliveryDetails.address) {
    alert("Please fill in all required delivery details");
    return;
  }

  if (paymentMethod === "card" && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolderName)) {
    alert("Please fill in all card details");
    return;
  }

  if (paymentMethod === "upi" && !upiId) {
    alert("Please enter your UPI ID");
    return;
  }

  setIsPlacingOrder(true);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Create order object with unique ID
  const newOrder = {
    id: `SWGY${Date.now()}`,
    restaurant: "Restaurant Name",
    total: finalTotal,
    status: 'preparing',
    orderDate: new Date().toISOString(),
    items: cart.map(item => ({
      name: item.name,
      quantity: item.qty,
      price: item.price
    }))
  };
  
  clearCart();
  navigate('/order-confirmation', { state: { order: newOrder } });
};

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto min-h-screen bg-gray-50 p-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6 hover:text-orange-500"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <div className="text-center py-20">
          <FaUtensils className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">Add some delicious items to proceed with checkout</p>
          <button 
            onClick={() => navigate("/")}
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-orange-500"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <div className="w-6"></div> {/* Spacer for balance */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Delivery & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-orange-500 text-xl mr-3" />
              <h2 className="text-xl font-bold">Delivery Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={deliveryDetails.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={deliveryDetails.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <div className="relative">
                  <FaHome className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="address"
                    value={deliveryDetails.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your complete delivery address"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="instructions"
                  value={deliveryDetails.instructions}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Ring the bell, Leave at door"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <FaWallet className="text-orange-500 text-xl mr-3" />
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>
            
            <div className="space-y-3">
              {/* Credit/Debit Card Option */}
              <div>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <FaCreditCard className="text-xl mx-4 text-gray-600" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                
                {/* Card Details Form */}
                {paymentMethod === "card" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formatCardNumber(cardDetails.cardNumber)}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            cardNumber: e.target.value.replace(/\s/g, '')
                          })}
                          maxLength={19}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formatExpiryDate(cardDetails.expiryDate)}
                          onChange={(e) => setCardDetails({
                            ...cardDetails,
                            expiryDate: e.target.value.replace(/\//g, '')
                          })}
                          maxLength={5}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <div className="relative">
                          <input
                            type={showCvv ? "text" : "password"}
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardInputChange}
                            maxLength={4}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-10"
                            placeholder="123"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCvv(!showCvv)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showCvv ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Holder Name *
                        </label>
                        <input
                          type="text"
                          name="cardHolderName"
                          value={cardDetails.cardHolderName}
                          onChange={handleCardInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Enter card holder name"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="saveCard"
                            checked={cardDetails.saveCard}
                            onChange={handleCardInputChange}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Save this card for faster payments</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center text-xs text-green-600">
                      <FaShieldAlt className="mr-2" />
                      <span>Your card details are secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                )}
              </div>

              {/* UPI Payment Option */}
              <div>
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <FaWallet className="text-xl mx-4 text-gray-600" />
                  <span className="font-medium">UPI Payment</span>
                </label>
                
                {/* UPI Details Form */}
                {paymentMethod === "upi" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UPI ID *
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="yourname@upi"
                      />
                      <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., name@oksbi, name@paytm)</p>
                    </div>
                    
                    <div className="flex space-x-2 mb-4">
                      <button 
                        type="button"
                        onClick={() => setUpiId('@oksbi')}
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        @oksbi
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUpiId('@paytm')}
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        @paytm
                      </button>
                      <button 
                        type="button"
                        onClick={() => setUpiId('@ybl')}
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        @ybl
                      </button>
                    </div>
                    
                    <div className="flex items-center text-xs text-green-600">
                      <FaShieldAlt className="mr-2" />
                      <span>UPI payments are secure and instant</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cash on Delivery Option */}
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-orange-500 focus:ring-orange-500"
                />
                <FaMoneyBill className="text-xl mx-4 text-gray-600" />
                <span className="font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            {/* Restaurant Info */}
            <div className="mb-4 p-3 bg-orange-50 rounded-lg">
              <h3 className="font-semibold">Restaurant Name</h3>
              <p className="text-sm text-gray-600">Delivery in 25-35 mins</p>
            </div>
            
            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={`${item.restaurantId}-${item.id}`} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded mr-2">
                      {item.qty}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            
            {/* Bill Details */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span>Item Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes and Charges</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2 mt-2">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
            
            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full mt-6 bg-orange-500 text-white py-4 rounded-lg font-bold hover:bg-orange-600 disabled:bg-orange-300 transition duration-300"
            >
              {isPlacingOrder ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Placing Order...
                </div>
              ) : (
                `Place Order • ₹${finalTotal}`
              )}
            </button>
            
            {/* Security Message */}
            <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
              <FaShieldAlt className="mr-1" />
              <span>Your payment is secured with SSL encryption</span>
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaClock className="text-orange-500 mr-2" />
              <span>Delivery in 25-35 minutes</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <FaHeadset className="text-orange-500 mr-2" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}