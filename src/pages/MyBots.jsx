import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  BarChart2, 
  Users, 
  Star, 
  MoreVertical,
  AlertCircle,
  Check,
  ExternalLink,
  Edit
} from 'lucide-react';
import Navbar from '../components/Navbar';

const BotOverview = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assistants from the API
  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        var storedProfile = localStorage.getItem("profile");

        if (storedProfile) {
            var userId = JSON.parse(storedProfile)._id; // Access the userId directly
          
        }
        const response = await fetch(`https://configstaging.trainright.fit/api/configs/findAssistants?isActive=true&page=1&limit=10&userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch assistants');
        }

        const data = await response.json();
        
        // Transform API data to match existing component structure
        const transformedBots = data.assistants.map((assistant, index) => ({
          id: assistant._id,
          name: assistant.name,
          description: assistant.assistantDescription,
          status: assistant.isActive ? 'active' : 'inactive',
          price: assistant.price,
          category: assistant.category || 'Uncategorized',
          buyers: 0, // API doesn't provide buyer count, so we'll keep it static
          rating: 4.5, // Static rating
          reviews: 20, // Static review count
          monthlyRevenue: Math.floor(assistant.price * 15), // Estimated monthly revenue
          successRate: 95, // Static success rate
          lastUpdated: new Date(assistant.updatedAt).toISOString().split('T')[0],
          image: assistant.image || "/api/placeholder/80/80"
        }));

        setBots(transformedBots);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAssistants();
  }, []);

  // If loading, show a loading state
  if (loading) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bots...</p>
          </div>
        </div>
      </>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
          <div className="text-center bg-red-100 p-8 rounded-lg">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Fetching Bots</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Bots</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New Bot
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search bots..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <select 
              className="border rounded-lg px-4 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>All Categories</option>
              <option>Customer Service</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 gap-6">
        {bots.map((bot) => (
          <div key={bot.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-start gap-6">
                {/* Bot Image */}
                <img 
                  src={bot.image} 
                  alt={bot.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                {/* Bot Info */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{bot.name}</h2>
                      <p className="text-gray-600 mt-1">{bot.description}</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Tags/Status */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      bot.status === 'active' ? 'bg-green-100 text-green-800' :
                      bot.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {bot.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      Updated {bot.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-5 gap-6 mt-6 pt-6 border-t">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-lg font-semibold text-gray-900">${bot.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Buyers</p>
                  <p className="text-lg font-semibold text-gray-900">{bot.buyers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold text-gray-900 ml-1">{bot.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({bot.reviews})</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">${bot.monthlyRevenue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Success Rate</p>
                  <p className="text-lg font-semibold text-gray-900">{bot.successRate}%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-6 pt-6 border-t">
                <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Bot
                </button>
                <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  View Analytics
                </button>
                <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default BotOverview;