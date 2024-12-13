import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CreditCard, CheckCircle } from 'lucide-react';
import {Razorpay} from "razorpay";

const PaymentPlansComponent = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [userId, setUserId] = useState('user123'); // Mock user ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
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
        setError('Failed to load plans');
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePayment = async (plan) => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded");
      return;
    }
  
    try {
      const orderResponse = await axios.post('https://configstaging.trainright.fit/api/assistants/order', {
        amount: plan.price * 100,
        currency: 'USD',
        receipt: `receipt_${plan.id}_${Date.now()}`,
        assistantId: '674ecbc1bcdea8c641020e61',
        buyerId: "674ec05504aa2e71feeabece",
        planId: plan._id,
      });
  
      const { data: order } = orderResponse;
  
      if (order && order.id) {
        const options = {
          key: 'rzp_live_ctOBr2JSHG9Pu7',
          amount: order.amount,
          currency: 'USD',
          name: 'TrainRight',
          description: `${plan.name} Plan`,
          order_id: order.id,
          handler: function (response) {
            console.log('Payment successful:', response);
          },
          prefill: {
            name: 'Customer',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#4F46E5',
          },
        };
  
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error("Invalid order response:", orderResponse.data);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Choose Your Plan
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan._id} 
              className={`
                bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105
                ${selectedPlan?._id === plan._id ? 'border-4 border-indigo-500' : 'border border-gray-200'}
              `}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
                {selectedPlan?._id === plan._id && (
                  <CheckCircle className="text-indigo-500" />
                )}
              </div>
              
              <div className="text-4xl font-extrabold text-gray-900 mb-4">
                ${plan.priceUSD}
                <span className="text-sm text-gray-500 ml-2">
                  {plan.duration ? `/ ${plan.duration} days` : ''}
                </span>
              </div>
              
              {plan.credits && (
                <div className="text-sm text-gray-600 mb-4">
                  {plan.credits} credits 
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {plan.creditsUsedPerMin} credits/min
                  </span>
                </div>
              )}
              
              {plan.discountPercentage > 0 && (
                <div className="text-sm text-green-600 mb-4">
                  {plan.discountPercentage}% OFF
                </div>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePayment(plan);
                }}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
              >
                <CreditCard className="mr-2" />
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlansComponent;