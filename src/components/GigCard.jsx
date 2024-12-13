import React from 'react';

const GigCard = ({ title, level, rating, price, img }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg">
      <img src={img} alt={title} className="w-full h-36 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h3 className="font-bold text-lg truncate">{title}</h3>
        <p className="text-sm text-gray-600">{level}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-yellow-500 font-semibold">{`⭐ ${rating}`}</span>
          <span className="text-blue-500 font-bold">{`From ₹${price}`}</span>
        </div>
      </div>
    </div>
  );
};

export default GigCard;
