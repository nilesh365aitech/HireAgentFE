import axios from 'axios';

const API_BASE_URL = "https://configstaging.trainright.fit/api";

export const getAssistants = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/configs/findAssistants`, {
    params: { isActive: true, page: 1, limit: 10, userId },
  });
  return response.data;
};

export const getLeads = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/lead/get-all-leads`, {
    params: { createdBy: userId },
  });
  return response.data;
};
