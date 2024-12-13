import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const LeadDetails = () => {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    // Fetch lead by ID
    axios
      .get(`https://configstaging.trainright.fit/api/lead/getLeadById?id=${id}`)
      .then((response) => {
        setLead(response.data.lead);
      })
      .catch((error) => {
        console.error("Error fetching lead:", error);
      });
  }, [id]);

  if (!lead) return <div>Loading...</div>;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lead Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {lead.questionAnswer.map((qa) => (
          <div key={qa._id} className="mb-2">
            <strong>{qa.question}:</strong> {qa.answer}
          </div>
        ))}
      </div>
      <Link to="/lead" className="text-blue-500 hover:underline">
        Back to Leads
      </Link>
    </div>
    </>
  );
};

export default LeadDetails;
