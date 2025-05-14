import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import MapComponent from '../components/MapComponent';
import ProfileDetailModal from '../components/ProfileDetailModal';

const Home = () => {
  const profiles = useSelector((state) => state.profiles.list);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProfiles(profiles);
    }
  }, [searchTerm, profiles]);

  const handleShowOnMap = (location, e) => {
    e.stopPropagation();
    setSelectedLocation(location);
    setIsMapModalOpen(true);
  };

  const handleCloseMapModal = () => {
    setIsMapModalOpen(false);
    setSelectedLocation(null);
  };

  const handleCardClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleSearch = () => {
    const search = searchTerm.toLowerCase();
    const results = profiles.filter((profile) => {
      return (
        profile.name?.toLowerCase().includes(search) ||
        profile.location?.address?.toLowerCase().includes(search) ||
        (Array.isArray(profile.interests)
          ? profile.interests.some((interest) =>
              interest.toLowerCase().includes(search)
            )
          : profile.interests
              ?.split(',')
              .some((interest) => interest.toLowerCase().includes(search)))
      );
    });

    setFilteredProfiles(results);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Page Content */}
      <div className="flex-grow p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-4">
          Explore Profiles
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-500 mb-4">
          Browse through the profiles and discover their locations on the map
        </p>

        {/* Search Input */}
        <div className="flex justify-center items-center gap-3 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="Search by name, location, or interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-2 sm:p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-800 hover:bg-blue-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-md text-sm font-medium"
          >
            Search
          </button>
        </div>

        {/* Profile Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                onClick={() => handleCardClick(profile)}
                className="bg-white rounded-md shadow-sm overflow-hidden flex items-center p-2 cursor-pointer hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-sm">
                  <h3 className="font-semibold text-gray-800 text-sm">{profile.name}</h3>
                  <p className="text-gray-600 text-xs mb-1 line-clamp-2">
                    {profile.description}
                  </p>
                  <button
                    onClick={(e) => handleShowOnMap(profile.location, e)}
                    className="text-yellow-500 hover:text-yellow-600 text-xs"
                  >
                    Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-base mt-10">
            🚫 No matching profiles found.
          </div>
        )}

        {/* Map Modal */}
        {isMapModalOpen && selectedLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 lg:w-3/4 xl:w-2/3 relative">
              {/* Close Button */}
              <button
                onClick={handleCloseMapModal}
                className="absolute top-0 right-1 text-3xl text-red-600 hover:text-red-800 font-bold"
              >
                &times;
              </button>
              <MapComponent location={selectedLocation} />
            </div>
          </div>
        )}

        {/* Profile Detail Modal */}
        {selectedProfile && (
          <ProfileDetailModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-blue-900 text-white p-2 text-center text-xs sm:text-sm">
        <p>&copy; 2025 Explore User Profiles</p>
      </div>
    </div>
  );
};

export default Home;
