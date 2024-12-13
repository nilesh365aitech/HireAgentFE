import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  Users, 
  Box, 
  MessageSquare, 
  Settings, 
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';

const SellerDashboard = () => {
  const [assistants, setAssistants] = useState([]);
  const [activeBot, setActiveBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static overview data
  const staticOverviewData = {
    totalRevenue: 150000,
    activeImplementations: 32
  };

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        var storedProfile = localStorage.getItem("profile");

        if (storedProfile) {
            var userId = JSON.parse(storedProfile)._id; // Access the userId directly
          
        }
        const response = await fetch(`https://configstaging.trainright.fit/api/assistants/getAssistantsAndBuyersByUserId?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch assistants');
        }
        
        const data = await response.json();
        setAssistants(data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  // Calculate overview metrics from fetched data
  const calculateOverviewMetrics = () => {
    return {
      ...staticOverviewData,
      totalBuyers: assistants.reduce((total, assistant) => total + assistant.buyers.length, 0),
      activeBots: assistants.filter(assistant => assistant.isActive).length
    };
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const overviewMetrics = calculateOverviewMetrics();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Seller Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${overviewMetrics.totalRevenue}</p>
              </div>
              <BarChart2 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Buyers</p>
                <p className="text-2xl font-bold text-gray-900">{overviewMetrics.totalBuyers}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Bots</p>
                <p className="text-2xl font-bold text-gray-900">{overviewMetrics.activeBots}</p>
              </div>
              <Box className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Implementations</p>
                <p className="text-2xl font-bold text-gray-900">{overviewMetrics.activeImplementations}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Bot List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Your Bots</h2>
          </div>
          
          {assistants.map((bot) => (
            <div key={bot._id} className="border-b last:border-b-0">
              {/* Bot Header */}
              <div 
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setActiveBot(activeBot === bot._id ? null : bot._id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {activeBot === bot._id ? 
                      <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    }
                    <span className="font-medium">{bot.name}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {bot.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-8">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{bot.buyers.length}</span> buyers
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">${bot.price}</span> price
                    </div>
                  </div>
                </div>
              </div>

              {/* Buyer List */}
              {activeBot === bot._id && (
                <div className="bg-gray-50 px-6 py-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500">
                        <th className="pb-3">Buyer</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Last Payment</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bot.buyers.map((buyer) => (
                        <tr key={buyer._id} className="border-t border-gray-200">
                          <td className="py-3">
                            <span className="font-medium">{buyer.buyerId.name}</span>
                            <br />
                            <span className="text-sm text-gray-500">{buyer.buyerId.email}</span>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {buyer.status}
                            </span>
                          </td>
                          <td className="py-3">{new Date(buyer.lastPayment).toLocaleDateString()}</td>
                          <td className="py-3">
                            <button className="text-blue-600 hover:text-blue-800">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default SellerDashboard;