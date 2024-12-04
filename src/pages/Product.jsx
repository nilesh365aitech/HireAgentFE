import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [assistants, setAssistants] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    categories: []
  });
  const [pagination, setPagination] = useState({
    totalAssistants: 0,
    totalPages: 0,
    currentPage: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Categories from backend or hardcoded
  const categories = ['Healthcare', 'Real Estate'];

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const fetchAssistants = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        lowPrice: filters.priceMin || '200',
        highPrice: filters.priceMax || '300',
        page: page
      });

      if (filters.categories.length > 0) {
        params.append('category', '674d9176cc180a2f38dea434');
      }

      const response = await fetch(
        `https://gc0bj9bk-7009.inc1.devtunnels.ms/api/configs/filterAssistants`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch assistants');
      }

      const data = await response.json();
      setAssistants(data.assistants);
      setPagination({
        totalAssistants: data.totalAssistants,
        totalPages: data.totalPages,
        currentPage: data.currentPage
      });
    } catch (err) {
      setError(err.message);
      setAssistants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const applyFilters = () => {
    fetchAssistants();
  };


  console.log(assistants)

  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-64 p-4 bg-white border-r">
          <div className="flex items-center mb-6">
            <Filter className="mr-2" />
            <h2 className="text-xl font-bold">Filter By</h2>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                name="priceMin"
                placeholder="Min $"
                value={filters.priceMin}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded"
              />
              <span className="self-center">-</span>
              <input
                type="number"
                name="priceMax"
                placeholder="Max $"
                value={filters.priceMax}
                onChange={handlePriceChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map(category => (
              <label
                key={category}
                className="flex items-center space-x-2 mb-2"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="form-checkbox"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          <button
            onClick={applyFilters}
            className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Filter
          </button>
        </div>

        <div className="flex-grow p-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assistants.map(assistant => (
                  <div
                    key={assistant.id}
                    className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer"
                    onClick={() => navigate(`/product/${assistant._id}`)} // Navigate to details page
                  >
                    <h3 className="font-semibold text-lg">{assistant.name}</h3>
                    <p className="text-gray-600">{assistant.category}</p>
                    <p className="font-bold text-blue-600 mt-2">
                      {/* ${assistant.price ? assistant.price.toFixed(2) : 'N/A'} */}
                    </p>
                  </div>
                ))}
              </div>

              {assistants.length === 0 && (
                <p className="text-center text-gray-500">No assistants found</p>
              )}

              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-2">
                  <span>Total Assistants: {pagination.totalAssistants}</span>
                  <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
