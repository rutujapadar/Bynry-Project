import React from 'react';

const ProfileDetailModal = ({ profile, onClose }) => {
  if (!profile) return null;

  // Split interests by commas and provide a default empty array if there are no interests
  const interests = profile.interests ? profile.interests.split(',') : [];
  const location = profile.location ? profile.location.address : 'No location available'; // Ensure we show location address

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <div className="flex flex-col items-center">
          <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full object-cover mb-4" />
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-gray-600 text-center">{profile.description}</p>
          <p className="mt-2 text-blue-700 font-medium">📍 {location}</p>

          {/* Display contact info if available */}
          {profile.contact && <p className="mt-2 text-sm text-gray-700">📞 {profile.contact}</p>}
        </div>

        {/* Display Interests as tags */}
        {interests.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((item, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {item.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailModal;
