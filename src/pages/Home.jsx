import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
} from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/banner";
import { CreditCard, CheckCircle } from 'lucide-react';

const ScheduleMeetingModal = ({ isOpen, onClose, bot, mode }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
  });

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isOpen && mode === "buy") {
      const fetchPlans = async () => {
        try {
          setLoading(true);
          const response = await axios.get('https://configstaging.trainright.fit/api/plans/getAllPlans');
          // Filter for Basic, Standard, and Pro plans
          const filteredPlans = response.data.data
            .filter(plan => ['basic', 'Standard', 'Pro'].includes(plan.id))
            .map(plan => ({
              ...plan,
              priceUSD: (plan.price / 1).toFixed(2) // Rough conversion from INR to USD
            }))
            .sort((a, b) => a.priceUSD - b.priceUSD);
          
          setPlans(filteredPlans);
          setLoading(false);
        } catch (err) {
          console.error("Failed to load plans", err);
          setLoading(false);
        }
      };

      fetchPlans();
    }
  }, [isOpen, mode]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!selectedPlan) {
      alert("Please select a plan before proceeding.");
      return;
    }

    try {
      var storedProfile = localStorage.getItem("profile");

      if (storedProfile) {
        var userId = JSON.parse(storedProfile)._id;
      }

      const buyerId = userId; // Replace with actual buyer ID from your auth or user context
      const assistantId = bot.id;

      // Check if Razorpay is available
      if (!window.Razorpay) {
        console.error("Razorpay SDK not loaded");
        return;
      }

      // Create order
      const orderResponse = await axios.post('https://configstaging.trainright.fit/api/assistants/order', {
        amount: selectedPlan.price * 100,
        currency: 'USD',
        receipt: `receipt_${selectedPlan.id}_${Date.now()}`,
        assistantId: assistantId,
        buyerId: buyerId,
        planId: selectedPlan._id,
      });

      const { data: order } = orderResponse;

      if (order && order.id) {
        const options = {
          key: 'rzp_live_ctOBr2JSHG9Pu7', // Replace with your Razorpay key
          amount: order.amount,
          currency: 'USD',
          name: 'TrainRight',
          description: `${bot.name} - ${selectedPlan.name} Plan`,
          order_id: order.id,
          handler: async function (response) {
            try {
              // Send purchase request after successful payment
              const purchaseData = {
                assistantId,
                buyerId,
                planId: selectedPlan._id,
                status: "Completed",
                lastPayment: new Date().toISOString(),
              };

              // You might want to add an API endpoint to record the purchase
              await axios.post('/api/purchase', purchaseData);

              alert("Purchase successful!");
              onClose();
            } catch (error) {
              console.error("Error recording purchase:", error);
            }
          },
          prefill: {
            name: formData.customerName,
            email: formData.email,
            contact: formData.phoneNumber,
          },
          theme: {
            color: '#4F46E5',
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var storedProfile = localStorage.getItem("profile");

      if (storedProfile) {
        var userId = JSON.parse(storedProfile)._id; // Access the userId directly
      }

      const buyerId = userId; // Replace with actual buyer ID from your auth or user context
      const assistantId = bot.id;

      if (mode === "buy") {
        // Send purchase request
        const purchaseData = {
          assistantId,
          buyerId,
          status: "Initial Setup",
          lastPayment: new Date().toISOString(),
        };

       
        
        // Redirect to Fiverr link
        window.location.href = "https://www.fiverr.com/s/420erVl";
      } else {
        // Prepare data for webhook in meeting mode
        const webhookData = {
          ...formData,
          botName: bot.name,
          botPrice: bot.price,
          mode: mode,
        };

        // Send data to webhook
        await axios.post(
          "https://hook.eu2.make.com/rl3339ixkzqotny7zj3orkrdiaww2mra",
          webhookData
        );

        // Redirect to Calendly
        window.location.href = "https://calendly.com/projects-365aitech/30min";
        onClose();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === "buy" ? "Purchase Bot" : "Schedule Meeting"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {mode === "buy" ? (
          <>
            <div className="space-y-4 mb-6">
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                plans.map((plan) => (
                  <div
                    key={plan._id}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${selectedPlan?._id === plan._id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-300'}
                    `}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <p className="text-gray-600">${plan.priceUSD}</p>
                      </div>
                      {selectedPlan?._id === plan._id && (
                        <CheckCircle className="text-blue-500" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </button>
            </form>
          </>
        ) : (
          // Existing meeting scheduling form
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              required
              value={formData.customerName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              {mode === "buy" ? "Purchase" : "Schedule Meeting"}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

const BotPurchaseModal = ({ isOpen, onClose, bot }) => {
  const [activeModal, setActiveModal] = useState(null);

  if (!isOpen || !bot) return null;

  const handleScheduleMeeting = () => {
    setActiveModal("schedule");
  };

  const handleBuyNow = () => {
    setActiveModal("buy");
  };

  const closeModals = () => {
    setActiveModal(null);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{bot.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Video Section */}
          <div className="p-6 border-b">
            <div
              className="relative w-full bg-gray-900 rounded-lg"
              style={{ paddingBottom: "56.25%" }}
            >
              {bot.videoUrl && (
                <iframe
                  width="100%"
                  height="100%"
                  src={bot.videoUrl}
                  title={`${bot.name} Demo Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              )}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">{bot.description}</p>
          </div>

          {/* Key Benefits */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Key Benefits
            </h3>
            <ul className="list-disc ml-5 text-gray-600">
              {bot.keyBenefits &&
                bot.keyBenefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Use Cases
            </h3>
            <ul className="list-disc ml-5 text-gray-600">
              {bot.useCases &&
                bot.useCases.map((useCase, index) => (
                  <li key={index}>
                    <strong>{useCase.name}:</strong> {useCase.description}
                  </li>
                ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-gray-800">${bot.price}</div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handleScheduleMeeting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 font-semibold transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Schedule Meeting
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal
        isOpen={activeModal === "schedule"}
        onClose={closeModals}
        bot={bot}
        mode="schedule"
      />

      {/* Buy Now Modal */}
      <ScheduleMeetingModal
        isOpen={activeModal === "buy"}
        onClose={closeModals}
        bot={bot}
        mode="buy"
      />
    </>
  );
};

const HorizontalBotCatalog = () => {
  // State for modal and categories
  const [selectedBot, setSelectedBot] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assistants from API
  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://configstaging.trainright.fit/api/configs/filterAssistants"
        );

        // Transform API data into the format expected by the component
        const transformedCategories = response.data.assistantsByCategory.map(
          (categoryGroup) => ({
            name: categoryGroup._id,
            bots: categoryGroup.assistants.map((assistant) => ({
              id: assistant._id,
              name: assistant.name,
              description: assistant.assistantDescription,
              price: assistant.price,
              image: assistant.image,
              videoUrl: assistant.tutorial
                ? `https://www.youtube.com/embed/${assistant.tutorial}`
                : null,
              keyBenefits: assistant.keyBenefits,
              useCases: assistant.useCases,
              tagLine: assistant.tagLine,
            })),
          })
        );

        setCategories(transformedCategories);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching assistants:", err);
        setError("Failed to load assistants");
        setIsLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  const scroll = (direction, categoryName) => {
    const container = document.getElementById(`scroll-${categoryName}`);
    const scrollAmount = 800;
    if (container) {
      const scrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <HeroBanner />
      <div className="min-h-screen bg-gray-50 p-8">
        {categories.map((category) => (
          <div key={category.name} className="mb-16 md:ml-auto -ml-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 px-4">
              {category.name}
            </h2>

            <div className="relative">
              {/* Scroll Left Button */}
              <button
                onClick={() => scroll("left", category.name)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Horizontal Scrolling Container */}
              <div
                id={`scroll-${category.name}`}
                className="flex overflow-x-auto gap-6 px-12 pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {category.bots.map((bot) => (
                  <div
                    key={bot.id}
                    className="flex-none w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <img
                      src={bot.image}
                      alt={bot.name}
                      className="w-full h-40 object-cover"
                    />

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {bot.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 h-12 overflow-hidden">
                        {bot.tagLine}
                      </p>
                      <p className="text-gray-600 text-xs mb-4 h-12 overflow-hidden">
                        {bot.description}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-gray-800">
                          ${bot.price}
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            aria-label="View details"
                            onClick={() => setSelectedBot(bot)}
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            onClick={() => setSelectedBot(bot)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Right Button */}
              <button
                onClick={() => scroll("right", category.name)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        ))}

        {/* Purchase Modal */}
        <BotPurchaseModal
          isOpen={!!selectedBot}
          onClose={() => setSelectedBot(null)}
          bot={selectedBot}
        />
      </div>
    </>
  );
};

export default HorizontalBotCatalog;


