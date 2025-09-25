// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FiUser, FiMapPin, FiCreditCard, FiGift, FiTruck, FiZap } from "react-icons/fi";

// Stripe public key (replace with your own)
const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXX");

const steps = [
  { id: 1, name: "Account", icon: <FiUser size={20} /> },
  { id: 2, name: "Address", icon: <FiMapPin size={20} /> },
  { id: 3, name: "Payment", icon: <FiCreditCard size={20} /> },
];

const bounceAnimation = { animation: "bounce-step 0.5s ease-in-out" };
const popCheckAnimation = { animation: "pop-check 0.4s ease-in-out" };

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1); // start from Account
  const [animateStep, setAnimateStep] = useState(currentStep);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => setAnimateStep(currentStep), [currentStep]);

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) setCurrentStep(stepId);
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              className="flex-1 flex items-center cursor-pointer"
              onClick={() => handleStepClick(step.id)}
            >
              <div
                style={animateStep === step.id ? bounceAnimation : {}}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 relative ${
                  currentStep === step.id
                    ? "border-orange-500 bg-orange-500 text-white"
                    : currentStep > step.id
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {currentStep > step.id ? (
                  <span style={popCheckAnimation}>✔️</span>
                ) : (
                  step.icon
                )}
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 transition-colors duration-300 ${
                    currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Names */}
        <div className="flex justify-between mb-8 text-sm font-medium text-gray-600">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`text-center w-1/3 ${
                currentStep === step.id ? "text-orange-500 font-semibold" : ""
              }`}
            >
              {step.name}
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <div className="bg-white shadow-md border border-gray-300 rounded-lg p-6">
          {orderPlaced ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-green-500 mb-4">
                🎉 Order Placed Successfully!
              </h2>
              <p>Thank you for your order. You will receive confirmation soon.</p>
            </div>
          ) : (
            <>
              {/* Account Step */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Account Details</h2>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded mb-4"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded mb-4"
                  />
                </div>
              )}

              {/* Address Step */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full p-3 border rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-3 border rounded mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full p-3 border rounded mb-4"
                  />
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 3 && (
                <PaymentForm
                  onSuccess={() => {
                    setOrderPlaced(true);
                    setCurrentStep(3);
                  }}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {/* Back button */}
                {currentStep > 1 && currentStep <= 3 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 border rounded text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                )}

                {/* Next button */}
                {currentStep < 3 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-auto"
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Animations */}
        <style>
          {`
            @keyframes bounce-step {
              0% { transform: scale(1); }
              50% { transform: scale(1.3); }
              100% { transform: scale(1); }
            }
            @keyframes pop-check {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.4); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </div>
    </Elements>
  );
}

// Payment Form Component
function PaymentForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");
  const [walletInfo, setWalletInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, paymentMethod === "card" ? 2000 : paymentMethod === "upi" ? 1500 : paymentMethod === "wallet" ? 1500 : 500);
  };

  const options = [
    { id: "card", name: "Card", icon: <FiCreditCard size={24} /> },
    { id: "upi", name: "UPI", icon: <FiZap size={24} /> },
    { id: "wallet", name: "Wallet / NetBanking", icon: <FiGift size={24} /> },
    { id: "cod", name: "Cash on Delivery", icon: <FiTruck size={24} /> },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

      {/* Payment Options */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`relative flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-transform transform hover:scale-101 hover:shadow-lg ${
              paymentMethod === opt.id
                ? "border-orange-500 bg-orange-50 shadow-md"
                : "border-gray-300 bg-white"
            }`}
            onClick={() => setPaymentMethod(opt.id)}
          >
            <div className="text-orange-500">{opt.icon}</div>
            <span className="font-medium">{opt.name}</span>
            {paymentMethod === opt.id && (
              <span className="absolute top-2 right-2 text-green-500 font-bold text-lg">✔</span>
            )}
          </div>
        ))}
      </div>

      {/* Payment Input Areas */}
      {paymentMethod === "card" && (
        <div className="border p-3 rounded mb-4">
          <CardElement />
        </div>
      )}

      {paymentMethod === "upi" && (
        <input
          type="text"
          placeholder="Enter UPI ID"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
      )}

      {paymentMethod === "wallet" && (
        <input
          type="text"
          placeholder="Enter Wallet / NetBanking Email"
          value={walletInfo}
          onChange={(e) => setWalletInfo(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
      )}

      {/* COD has no input */}

      <button
        type="submit"
        disabled={(paymentMethod === "card" && !stripe) || loading}
        className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
      >
        {loading ? "Processing..." : "Pay & Place Order"}
      </button>
    </form>
  );
}
