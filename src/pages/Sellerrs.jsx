import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Settings,
  Lock,
  Users,
  Zap,
  HelpCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // Assuming React Router is being used for navigation.

const Seller = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    task: "",
    currentProcess: "",
    requiredInfo: "",
    rules: "",
    humanTakeover: "",
  });

  const navigate = useNavigate();

  // Check for token in localStorage
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     navigate("/login"); // Redirect to the login page if no token is present
  //   }
  // }, [navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Retrieve the token
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    const dataToSend = {
      questionAnswer: [
        { question: "What is your name?", answer: formData.name },
        { question: "What is your phone number?", answer: formData.phone },
        {
          question: "What task do you want the bot to handle?",
          answer: formData.task,
        },
        {
          question: "How is this task handled today?",
          answer: formData.currentProcess,
        },
        {
          question: "What information must be collected in every conversation?",
          answer: formData.requiredInfo,
        },
        {
          question: "What are the must-follow rules for this task?",
          answer: formData.rules,
        },
        {
          question: "When must a human take over?",
          answer: formData.humanTakeover,
        },
      ],
    };

    try {
      const response = await fetch(
        "https://configstaging.trainright.fit/api/lead/create-lead",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`, // Include token in the Authorization header
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        alert("Lead successfully created!");
        setShowForm(false);
        setFormData({
          name: "",
          phone: "",
          task: "",
          currentProcess: "",
          requiredInfo: "",
          rules: "",
          humanTakeover: "",
        });
      } else {
        alert("Failed to create lead. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white font-sans text-gray-900">
        {/* Hero Section */}
        <div className="bg-white font-sans text-gray-900">
          <header className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Turn Your Expertise Into Revenue-Generating Voice Bots
              </h1>
              <p className="text-xl mb-8">
                No coding needed. No technical expertise required. Just your
                valuable business experience.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Start Creating Your Bot
              </button>
            </div>
          </header>

          {/* Form Popup */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-4">Create Your Bot</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="What is your name?"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="What is your phone number?"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="task"
                    value={formData.task}
                    onChange={handleInputChange}
                    placeholder="What task do you want the bot to handle?"
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                  <textarea
                    name="currentProcess"
                    value={formData.currentProcess}
                    onChange={handleInputChange}
                    placeholder="How is this task handled today?"
                    className="w-full border border-gray-300 p-2 rounded"
                    rows="2"
                    required
                  />
                  <textarea
                    name="requiredInfo"
                    value={formData.requiredInfo}
                    onChange={handleInputChange}
                    placeholder="What information must be collected in every conversation?"
                    className="w-full border border-gray-300 p-2 rounded"
                    rows="2"
                    required
                  />
                  <textarea
                    name="rules"
                    value={formData.rules}
                    onChange={handleInputChange}
                    placeholder="What are the must-follow rules for this task?"
                    className="w-full border border-gray-300 p-2 rounded"
                    rows="2"
                    required
                  />
                  <textarea
                    name="humanTakeover"
                    value={formData.humanTakeover}
                    onChange={handleInputChange}
                    placeholder="When must a human take over?"
                    className="w-full border border-gray-300 p-2 rounded"
                    rows="2"
                    required
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Three Simple Steps to Your Working Bot
            </h2>
            <p className="text-xl mb-12">
              We handle the technology. You provide the expertise.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Share Your Process */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">
                  Share Your Process
                </h3>
                <p className="mb-4">
                  Simply describe how you handle things today. No technical
                  documentation.
                </p>
                <blockquote className="italic border-l-4 border-blue-500 pl-4">
                  "All I did was share how we handle appointments – they turned
                  it into a perfect bot"
                  <footer className="mt-2 font-semibold">
                    - Dr. Sarah Chen, Medical Practice
                  </footer>
                </blockquote>
              </div>

              {/* Step 2: Review & Refine */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Review & Refine</h3>
                <p className="mb-4">
                  Watch your bot take shape in real-time. Test and refine
                  without touching code.
                </p>
                <blockquote className="italic border-l-4 border-green-500 pl-4">
                  "They kept tweaking until the bot handled everything exactly
                  how I would"
                  <footer className="mt-2 font-semibold">
                    - Mark Rodriguez, Real Estate
                  </footer>
                </blockquote>
              </div>

              {/* Step 3: Launch & Earn */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Launch & Earn</h3>
                <p className="mb-4">
                  List your bot on our marketplace and earn recurring revenue
                  from every deployment.
                </p>
                <blockquote className="italic border-l-4 border-purple-500 pl-4">
                  "My scheduling bot now earns more than my consulting practice"
                  <footer className="mt-2 font-semibold">
                    - James Wilson, Fitness Studio
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Healthcare Bot Story */}
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Healthcare Scheduling Bot
                </h3>
                <div className="space-y-2 mb-4">
                  <p>2,000+ appointments/month</p>
                  <p>50+ clinic deployments</p>
                  <p>$40K monthly revenue</p>
                </div>
                <blockquote className="italic">
                  "From first call to live bot in 2 weeks."
                  <footer className="mt-2 font-semibold">
                    - Dr. Sarah Chen
                  </footer>
                </blockquote>
                <p className="text-gray-600 mt-2">25 years in healthcare</p>
              </div>

              {/* Real Estate Bot Story */}
              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">
                  Real Estate Lead Bot
                </h3>
                <div className="space-y-2 mb-4">
                  <p>3,000+ inquiries/month</p>
                  <p>85% lead qualification rate</p>
                  <p>24/7 response time</p>
                </div>
                <blockquote className="italic">
                  "My bot pre-qualifies leads better than my best agent."
                  <footer className="mt-2 font-semibold">
                    - Mark Rodriguez
                  </footer>
                </blockquote>
                <p className="text-gray-600 mt-2">Top 1% Realtor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Create With Us */}
        <section className="bg-gray-100 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Create With Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* We Handle All Tech */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Settings className="text-blue-600 text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-center mb-4">
                  We Handle All Tech
                </h3>
                <ul className="space-y-2 text-center">
                  <li>No coding required</li>
                  <li>No AI expertise needed</li>
                  <li>No technical documentation</li>
                  <li>Simple setup process</li>
                </ul>
              </div>

              {/* You Keep Control */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <Lock className="text-green-600 text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-center mb-4">
                  You Keep Control
                </h3>
                <ul className="space-y-2 text-center">
                  <li>Own your business logic</li>
                  <li>Retain your expertise</li>
                  <li>Clear revenue sharing</li>
                  <li>Usage analytics</li>
                </ul>
              </div>

              {/* Ongoing Support */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <HelpCircle className="text-purple-600 text-4xl mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold text-center mb-4">
                  Ongoing Support
                </h3>
                <ul className="space-y-2 text-center">
                  <li>Dedicated manager</li>
                  <li>Technical maintenance</li>
                  <li>Regular updates</li>
                  <li>Customization help</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Turn Your Expertise Into Revenue?
            </h2>
            <p className="text-xl mb-8">
              Start creating your bot today – we'll handle all the technical
              details.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Start Creating Your Bot
            </button>
          </div>
        </section>
      </div>
      
    </>
  );
};

export default Seller;

