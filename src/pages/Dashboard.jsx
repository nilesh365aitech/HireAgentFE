import React from 'react';
import { 
  BarChart2, 
  Settings, 
  PlusCircle, 
  Eye, 
  Phone, 
  DollarSign, 
  Users, 
  CheckCircle 
} from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <PlusCircle className="text-blue-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Create New Bot</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <DollarSign className="text-green-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Revenue</p>
              <p className="text-xl font-bold">$12,345</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <Users className="text-purple-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <p className="text-xl font-bold">1,234</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <Phone className="text-indigo-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Conversations</p>
              <p className="text-xl font-bold">5</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center">
            <CheckCircle className="text-teal-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Success Rate</p>
              <p className="text-xl font-bold">94%</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Active Bots */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Active Bots</h2>
              <button className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
                View All
              </button>
            </div>

            {/* Bot Card */}
            {[1, 2].map((bot, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">Healthcare Scheduling Bot</h3>
                  <p className="text-gray-500">500+ active users</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Today's Calls</p>
                    <p className="font-bold">245</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="font-bold text-green-600">94%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="font-bold text-green-600">$1,234</p>
                  </div>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100">
                <BarChart2 className="mr-3 text-blue-500" />
                View Analytics
              </button>
              <button className="w-full flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100">
                <Settings className="mr-3 text-green-500" />
                Manage Settings
              </button>
              <button className="w-full flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100">
                <PlusCircle className="mr-3 text-purple-500" />
                Create New Bot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;