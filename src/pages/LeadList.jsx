import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all leads
    axios
      .get("https://configstaging.trainright.fit/api/lead/get-all-leads")
      .then((response) => {
        setLeads(response.data.leads);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            <th className="border border-gray-300 px-4 py-2">Task</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {lead.questionAnswer.find((q) => q.question === "What is your name?")?.answer}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {lead.questionAnswer.find((q) => q.question === "What is your phone number?")?.answer}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {lead.questionAnswer.find((q) => q.question === "What task do you want the bot to handle?")?.answer}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => navigate(`/lead/${lead._id}`)}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default LeadsList;
