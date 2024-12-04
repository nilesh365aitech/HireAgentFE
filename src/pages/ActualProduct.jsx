import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar, Clock, Phone, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const ActualProduct = () => {
    const id = useParams();
  const [activeSection, setActiveSection] = useState('about');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    task: "",
    currentProcess: "",
    requiredInfo: "",
    rules: "",
    humanTakeover: "",
    assistantId: "",
  });

  const [assistantData, setAssistantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useCases = [
    {
      title: 'New Patient Scheduling',
      description: 'Seamlessly manage new patient intake, collect essential information, and book initial consultations with intelligent routing and availability checking.'
    },
    {
      title: 'Follow-up Appointments',
      description: 'Automatically schedule and remind patients of follow-up visits, track treatment progress, and ensure continuity of care.'
    },
    {
      title: 'Emergency Handling',
      description: 'Prioritize and route urgent medical inquiries, provide immediate triage information, and connect patients with appropriate care resources.'
    },
    {
      title: 'Insurance Verification',
      description: 'Instantly verify patient insurance coverage, check eligibility, and provide real-time insurance information before appointments.'
    }
  ];

  useEffect(() => {
    const fetchAssistantDetails = async () => {
      try {
        const response = await fetch(
          `https://gc0bj9bk-7009.inc1.devtunnels.ms/api/configs/findOneAssistant?id=${id.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch assistant details');
        }

        const result = await response.json();
        setAssistantData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssistantDetails();
  }, []);

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
      assistantId: id,
    };

    try {
      const response = await fetch(
        "https://gc0bj9bk-7009.inc1.devtunnels.ms/api/lead/create-lead",
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
          assistantId: id,        });
      } else {
        alert("Failed to create lead. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar/>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">
            {assistantData.name || 'Healthcare Scheduling Bot'}
          </h1>
          <p className="text-xl mb-6">
            {assistantData.instructions || 'Streamline your medical practice with our AI-powered scheduling assistant. Handle appointments, reminders, and follow-ups automatically.'}
          </p>
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">$299.00</div>
            <div className="text-sm">Includes all features and support</div>
          </div>
          <button onClick={() => setShowForm(true)} className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Start Free Trial
          </button>
        </div>

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

        {/* Navigation Tabs */}
        <div className="flex border-b">
          {['About', 'Key Benefits', 'Use Cases'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section.toLowerCase().replace(' ', ''))}
              className={`flex-1 py-4 font-semibold ${
                activeSection === section.toLowerCase().replace(' ', '')
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="p-8">
          {activeSection === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">About This Bot</h2>
              <p className="text-gray-700 mb-4">
                An advanced AI-powered scheduling assistant designed specifically for medical practices. 
                This intelligent bot automates complex scheduling tasks, reduces administrative burden, 
                and improves patient engagement through seamless, intelligent communication.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Additional Details</h3>
                <p><strong>Assistant ID:</strong> {assistantData.assistantId}</p>
                <p><strong>Created At:</strong> {new Date(assistantData.createdAt).toLocaleString()}</p>
                <p><strong>Last Updated:</strong> {new Date(assistantData.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          )}

          {activeSection === 'keybenefits' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: <Calendar className="text-blue-500" />, text: 'Reduce no-shows by 75%' },
                  { icon: <Clock className="text-green-500" />, text: 'Save 15+ hours per week' },
                  { icon: <Phone className="text-purple-500" />, text: 'Handle 500+ appointments daily' },
                  { icon: <Shield className="text-teal-500" />, text: '24/7 availability' }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    {benefit.icon}
                    <span className="text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'usecases' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition"
                  >
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-gray-700">{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ActualProduct;