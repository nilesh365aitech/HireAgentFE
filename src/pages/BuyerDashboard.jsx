import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Download,
  ExternalLink,
  Play,
  PauseCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const BuyerDashboard = () => {
  // State to store bought assistants
  const [boughtAssistants, setBoughtAssistants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bought assistants on component mount
  useEffect(() => {
    const fetchBoughtAssistants = async () => {
      try {
        var storedProfile = localStorage.getItem("profile");

        if (storedProfile) {
            var userId = JSON.parse(storedProfile)._id; // Access the userId directly
          
        }
        const response = await fetch(`https://configstaging.trainright.fit/api/assistants/getBoughtAssistantsByBuyerId?buyerId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch assistants');
        }
        
        const data = await response.json();
        setBoughtAssistants(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchBoughtAssistants();
  }, []);

  // Calculate overview stats
  const calculateOverviewStats = () => {
    // These calculations remain static and will work with dynamic data
    return {
      activeBots: boughtAssistants.filter(bot => bot.status === 'active').length,
      totalInteractions: 45000, // This remains static as per original design
      avgSuccessRate: 98,
      avgResponseTime: '1.2s'
    };
  };

  const overviewStats = calculateOverviewStats();

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading assistants...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">My AI Voice Bots</h1>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bots</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.activeBots}</p>
              </div>
              <BarChart2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interactions</p>
                <p className="text-2xl font-bold text-gray-900">45,000</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">1.2s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Purchased Bots */}
        <div className="space-y-6">
          {boughtAssistants.map((boughtAssistant) => {
            const bot = boughtAssistant.assistantId;
            return (
              <div key={boughtAssistant._id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  {/* Bot Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <img 
                        src={bot.image}
                        alt={bot.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{bot.name}</h2>
                        <p className="text-gray-600">Provided by {bot.provider || 'Unknown'}</p>
                        <div className="flex items-center mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            boughtAssistant.status === 'active' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {boughtAssistant.status.charAt(0).toUpperCase() + boughtAssistant.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      {boughtAssistant.status === 'active' && (
                        <>
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Pause Bot">
                            <PauseCircle className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download Logs">
                            <Download className="w-5 h-5 text-gray-600" />
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-lg" title="Settings">
                        <Settings className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {boughtAssistant.status === 'active' ? (
                    // Active Bot Section
                    <div className="mt-6 pt-6 border-t">
                      {/* Use bot details from API */}
                      <div className="grid grid-cols-4 gap-6">
                        <div>
                          <p className="text-sm text-gray-500">Monthly Usage</p>
                          <div className="mt-1">
                            <div className="flex items-center">
                              <span className="text-lg font-semibold text-gray-900">4,500</span>
                              <span className="text-sm text-gray-500 ml-1">/ 5,000</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-blue-600 rounded-full h-2" 
                                style={{ width: `${(4500/5000) * 100}% `}}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Success Rate</p>
                          <p className="text-lg font-semibold text-gray-900">98%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Uptime</p>
                          <p className="text-lg font-semibold text-gray-900">99.9%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Interaction</p>
                          <p className="text-lg font-semibold text-gray-900">2 minutes ago</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <BarChart2 className="w-4 h-4 mr-2" />
                          View Analytics
                        </button>
                        <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Support
                        </button>
                        <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Integration Guide
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Implementation Status
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Progress</h3>
                      <div className="space-y-4">
                        {/* Static implementation steps for bots in implementation */}
                        {[
                          { name: "Initial Setup", status: "complete" },
                          { name: "Configuration", status: "in-progress" },
                          { name: "Testing", status: "pending" },
                          { name: "Deployment", status: "pending" }
                        ].map((step, index) => (
                          <div key={index} className="flex items-center">
                            {step.status === 'complete' ? (
                              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            ) : step.status === 'in-progress' ? (
                              <Clock className="w-5 h-5 text-yellow-600 mr-2" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                            )}
                            <span className={`${
                              step.status === 'complete' ? 'text-green-600' :
                              step.status === 'in-progress' ? 'text-yellow-600' :
                              'text-gray-500'
                            }`}>
                              {step.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Implementation Actions */}
                      <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Setup
                        </button>
                        <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Support
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyerDashboard;