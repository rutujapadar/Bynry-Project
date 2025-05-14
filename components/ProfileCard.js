

import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile, onSummaryClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/profile/${profile.id}`);
  };

  const handleSummary = (e) => {
    e.stopPropagation(); // Prevent navigation on Summary click
    onSummaryClick(profile.location); // or profile.address
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg cursor-pointer transition"
      onClick={handleCardClick}
    >
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold">{profile.name}</h2>
      <p className="text-gray-600">{profile.description}</p>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSummary}
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard;
