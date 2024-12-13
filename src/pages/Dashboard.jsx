import React, { useEffect, useState } from 'react';
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
import { getAssistants, getLeads } from '../utils/api';

const Dashboard = () => {
  const [assistants, setAssistants] = useState([]);
  const [leads, setLeads] = useState([]);
  // const userId = localStorage.getItem('_id'); // Assuming userId is stored in localStorage

  const storedProfile = localStorage.getItem("profile");

if (storedProfile) {
    var userId = JSON.parse(storedProfile)._id; // Access the userId directly
    console.log(userId); // Output: 667d84039bb36ffe301cef07
}


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          console.error('User ID not found');
          return;
        }

        const [assistantsData, leadsData] = await Promise.all([
          getAssistants(userId),
          getLeads(userId),
        ]);

        setAssistants(assistantsData.assistants || []);
        setLeads(leadsData.leads || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <PlusCircle className="text-blue-500 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Active Assistants</p>
                <p className="text-xl font-bold">{assistants.length}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center">
              <Users className="text-purple-500 mr-3" />
              <div>
                <p className="text-gray-500 text-sm">Leads Collected</p>
                <p className="text-xl font-bold">{leads.length}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Assistants List */}
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Assistants</h2>
               
              </div>
              {assistants.map((assistant) => (
                <div
                  key={assistant._id}
                  className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{assistant.name}</h3>
                    <p className="text-gray-500">{assistant.assistantDescription}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-bold text-green-600">${assistant.price}</p>
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>

            {/* Leads Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Leads</h2>
              {leads.slice(0, 3).map((lead) => (
                <div key={lead._id} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-bold">{lead.questionAnswer[0]?.answer}</h3>
                  <p className="text-gray-500">
                    Task: {lead.questionAnswer.find(q => q.question.includes('task'))?.answer}
                  </p>
                  <p className="text-gray-500">
                    Phone: {lead.questionAnswer.find(q => q.question.includes('phone'))?.answer}
                  </p>
                </div>
              ))}
           
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;