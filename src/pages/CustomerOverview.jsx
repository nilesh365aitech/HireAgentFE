import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  MoreVertical,
  MessageSquare,
  BarChart2,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronDown
} from 'lucide-react';
import Navbar from '../components/Navbar';

const CustomerOverview = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        var storedProfile = localStorage.getItem("profile");

        if (storedProfile) {
            var userId = JSON.parse(storedProfile)._id; // Access the userId directly
          
        }
        // Replace 'someUserId' with the actual user ID
        const response = await fetch(`https://configstaging.trainright.fit/api/assistants/getBuyersWithAssistantsByUserId?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }

        const result = await response.json();
        
        // Transform the API response into the format our component expects
        const transformedCustomers = Object.keys(result.data).map(customerId => {
          const customer = result.data[customerId];
          return {
            id: customerId,
            name: customer.customer,
            email: customer.email,
            bots: customer.assistants.map(assistant => ({
              name: assistant.name,
              status: assistant.status.toLowerCase().replace(' ', '-'),
              implementationStatus: assistant.status === 'Initial Setup' ? 'in-progress' : 'complete',
              monthlyUsage: parseInt(assistant.usage),
              successRate: parseFloat(assistant.successRate)
            })),
            totalSpent: customer.totalSpent,
            joinDate: null, // Not provided in the API response
            lastActive: customer.lastActive,
            status: customer.status.toLowerCase(),
            image: "/api/placeholder/40/40"
          };
        });

        setCustomers(transformedCustomers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customers Overview</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all your customers across different bots</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
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
              <option value="implementation">Implementation</option>
              <option value="inactive">Inactive</option>
            </select>

            <select className="border rounded-lg px-4 py-2">
              <option>All Bots</option>
              {customers.flatMap(customer => 
                customer.bots.map(bot => <option key={bot.name}>{bot.name}</option>)
              )}
            </select>

            <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-lg shadow">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b bg-gray-50 text-sm font-medium text-gray-500">
          <div className="col-span-2">Customer</div>
          <div>Bots</div>
          <div>Total Spent</div>
          <div>Status</div>
          <div>Last Active</div>
          <div>Actions</div>
        </div>

        {/* Customer Rows */}
        {customers.map((customer) => (
          <div key={customer.id} className="border-b last:border-b-0">
            {/* Main Row - Same as previous implementation */}
            <div className="grid grid-cols-7 gap-4 px-6 py-4 items-center">
              {/* Customer Info */}
              <div className="col-span-2 flex items-center gap-3">
                <img 
                  src={customer.image} 
                  alt={customer.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>

              {/* Bots */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{customer.bots.length}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Total Spent */}
              <div className="font-medium text-gray-900">
                ${customer.totalSpent}
              </div>

              {/* Status */}
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  customer.status === 'active' ? 'bg-green-100 text-green-800' :
                  customer.status === 'implementation' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
              </div>

              {/* Last Active */}
              <div className="text-sm text-gray-500">
                {customer.lastActive}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Message">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg" title="Analytics">
                  <BarChart2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Expanded Bot Details */}
            <div className="px-6 py-3 bg-gray-50">
              <div className="ml-13 space-y-3">
                {customer.bots.map((bot, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 text-sm">
                    <div className="font-medium text-gray-900">{bot.name}</div>
                    <div className="flex items-center">
                      {bot.implementationStatus === 'complete' ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Complete
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-600">
                          <Clock className="w-4 h-4 mr-1" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <div>Usage: {bot.monthlyUsage} calls</div>
                    <div>Success Rate: {bot.successRate}%</div>
                    <div className={`flex items-center ${
                      bot.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {bot.status === 'active' ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <Clock className="w-4 h-4 mr-1" />
                      )}
                      {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CustomerOverview;