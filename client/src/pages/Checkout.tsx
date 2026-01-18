import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaWallet,
  FaCreditCard,
  FaMoneyBill,
  FaUser,
  FaPhone,
  FaHome,
  FaUtensils,
  FaShieldAlt,
  FaHeadset,
  FaEye,
  FaEyeSlash,
  FaQrcode,
  FaCheckCircle,
} from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";

export default function CheckoutPage(): JSX.Element {
  const { cart, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    saveCard: false,
  });
  const [upiId, setUpiId] = useState("");
  const [showCvv, setShowCvv] = useState(false);

  // QR Payment state
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQrData] = useState("");
  const [isQrPaymentVerified, setIsQrPaymentVerified] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // pending, success, failed
  const paymentCheckInterval = useRef<any>(null);

  const deliveryFee = 30;
  const tax = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + tax;

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
      }
    };
  }, []);

  const generateQRCode = () => {
    // Create a unique transaction ID
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    // Create QR data in UPI format (match JSX implementation)
    const qrDataString = `upi://pay?pa=${encodeURIComponent("restaurant@upi")}&pn=${encodeURIComponent(deliveryDetails.name || "Customer")}&am=${finalTotal}&tn=${encodeURIComponent(`Order from Swiggy Clone - ${transactionId}`)}&cu=INR`;

    setQrData(qrDataString);
    setShowQRCode(true);
    setIsQrPaymentVerified(false);
    setPaymentStatus("pending");

    // Start checking for payment status
    startPaymentVerification(transactionId);
  };

  const startPaymentVerification = (transactionId: string) => {
    // Clear any existing interval
    if (paymentCheckInterval.current) {
      clearInterval(paymentCheckInterval.current);
    }

    // Simulate payment verification (in real app, this would be an API call)
    paymentCheckInterval.current = setInterval(() => {
      checkPaymentStatus(transactionId);
    }, 3000); // Check every 3 seconds
  };

  const checkPaymentStatus = async (transactionId: string) => {
    setIsCheckingPayment(true);

    // Simulate API call to check payment status
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, simulate success 70% of the time after a few checks
    const checkCount = Math.floor(Math.random() * 10);

    if (checkCount > 3) {
      // Simulate successful payment
      setIsQrPaymentVerified(true);
      setPaymentStatus("success");
      setIsCheckingPayment(false);

      if (paymentCheckInterval.current) {
        clearInterval(paymentCheckInterval.current);
      }

      // Auto-place order after successful payment
      setTimeout(() => {
        handlePlaceOrder();
      }, 1500);
    } else {
      setIsCheckingPayment(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as any;
    setCardDetails({
      ...cardDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts: string[] = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handlePlaceOrder = async () => {
    if (
      !deliveryDetails.name ||
      !deliveryDetails.phone ||
      !deliveryDetails.address
    ) {
      alert("Please fill in all required delivery details");
      return;
    }

    if (
      paymentMethod === "card" &&
      (!cardDetails.cardNumber ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv ||
        !cardDetails.cardHolderName)
    ) {
      alert("Please fill in all card details");
      return;
    }

    if (paymentMethod === "upi" && !upiId && !showQRCode) {
      alert("Please enter your UPI ID or use QR code");
      return;
    }

    if (paymentMethod === "qr" && !isQrPaymentVerified) {
      alert("Please complete QR payment first");
      return;
    }

    setIsPlacingOrder(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order object with unique ID
    const newOrder = {
      id: `SWGY${Date.now()}`,
      restaurant: "Restaurant Name",
      total: finalTotal,
      status: "preparing",
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "qr" ? "paid" : "pending",
      orderDate: new Date().toISOString(),
      items: cart.map((item: any) => ({
        name: item.name,
        quantity: item.qty,
        price: item.price,
      })),
    };

    clearCart();
    navigate("/order-confirmation", { state: { order: newOrder } });
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
          <h2 className="text-2xl font-bold text-gray-600">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Add some delicious items to proceed with checkout
          </p>
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
                    required
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
                    rows={3}
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
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              cardNumber: e.target.value.replace(/\s/g, ""),
                            })
                          }
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
                          onChange={(e) =>
                            setCardDetails({
                              ...cardDetails,
                              expiryDate: e.target.value.replace(/\//g, ""),
                            })
                          }
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
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardHolderName"
                          value={cardDetails.cardHolderName}
                          onChange={handleCardInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Name on card"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-xs text-green-600">
                      <FaShieldAlt className="mr-2" />
                      Your card details are secured with 256-bit SSL encryption
                    </div>
                  </div>
                )}
              </div>

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

                {paymentMethod === "upi" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                    <div className="mt-6 border-t pt-4">
                      <div className="flex items-center mb-3">
                        <FaQrcode className="text-orange-500 mr-2" />
                        <h3 className="font-medium">OR Pay via QR Code</h3>
                      </div>

                      <button
                        type="button"
                        onClick={generateQRCode}
                        className="w-full p-3 border-2 border-dashed border-orange-300 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        <div className="flex flex-col items-center">
                          <FaQrcode className="text-2xl text-orange-500 mb-2" />
                          <span className="font-medium text-orange-600">
                            Generate QR Code
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Scan and pay using any UPI app
                          </p>
                        </div>
                      </button>

                      {showQRCode && (
                        <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                          <div className="flex flex-col items-center">
                            <div className="mb-4 p-2 bg-white border border-gray-300">
                              <QRCodeSVG
                                value={qrData}
                                size={180}
                                level="H"
                                includeMargin={true}
                              />
                            </div>

                            {isCheckingPayment && (
                              <div className="flex items-center text-blue-600 mb-3">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2" />
                                <span>Checking payment status...</span>
                              </div>
                            )}

                            {isQrPaymentVerified && (
                              <div className="flex items-center text-green-600 mb-3">
                                <FaCheckCircle className="mr-2 text-xl" />
                                <span className="font-medium">
                                  Payment Verified Successfully!
                                </span>
                              </div>
                            )}

                            <div className="text-center mb-3">
                              <p className="text-sm font-medium">
                                Amount: ₹{finalTotal}
                              </p>
                              <p className="text-xs text-gray-500">
                                Scan this QR with any UPI app
                              </p>
                            </div>

                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => setShowQRCode(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                              >
                                Close QR
                              </button>
                              <button
                                type="button"
                                onClick={() => generateQRCode()}
                                className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg text-sm hover:bg-orange-200"
                              >
                                Regenerate QR
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

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

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mb-4 p-3 bg-orange-50 rounded-lg">
              <h3 className="font-semibold">Restaurant Name</h3>
              <p className="text-sm text-gray-600">Delivery in 25-35 mins</p>
            </div>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {cart.map((item: any) => (
                <div
                  key={`${item.restaurantId}-${item.id}`}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
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
            {paymentMethod === "upi" && isQrPaymentVerified && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <FaCheckCircle className="mr-2" />
                  <span className="font-medium">QR Payment Verified!</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  You can now place your order
                </p>
              </div>
            )}
            <button
              onClick={handlePlaceOrder}
              disabled={
                isPlacingOrder ||
                (paymentMethod === "upi" && showQRCode && !isQrPaymentVerified)
              }
              className={`w-full mt-6 py-4 rounded-lg font-bold transition duration-300 ${isPlacingOrder || (paymentMethod === "upi" && showQRCode && !isQrPaymentVerified) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600"}`}
            >
              {isPlacingOrder ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Placing Order...
                </div>
              ) : paymentMethod === "upi" &&
                showQRCode &&
                !isQrPaymentVerified ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500 mr-2"></div>
                  Verify Payment First
                </div>
              ) : (
                `Place Order • ₹${finalTotal}`
              )}
            </button>
            <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
              <FaShieldAlt className="mr-1" />
              <span>Your payment is secured with SSL encryption</span>
            </div>
          </div>

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

      <style>{`@keyframes fade-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.3s ease-out; }`}</style>
    </div>
  );
}
