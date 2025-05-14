import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent'; // Assuming MapComponent is in the same directory

const ProfileFormModal = ({ profile, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    locationName: '',
    lat: '', // Latitude input
    lng: '', // Longitude input
    location: { lat: null, lng: null, address: '' },
    contact: '',
    interests: '',
  });

  const [currentPage, setCurrentPage] = useState(1); // Track the current page (1 or 2)

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.lat && formData.lng && formData.photo) {
      const location = { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng), address: formData.locationName };
      onSubmit({ ...formData, location, id: profile?.id || Date.now() });
    } else {
      alert('Please fill all required fields');
    }
  };

  const handleNextPage = () => {
    if (currentPage < 2) setCurrentPage(currentPage + 1); // Move to the next page
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); // Move to the previous page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4">
          {profile ? 'Edit Profile' : 'Add Profile'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PAGE 1: Personal Information */}
          {currentPage === 1 && (
            <div>
              {/* Name Input */}
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border border-gray-300 p-3 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />

              {/* Image Upload Field */}
              <input
                type="file"
                accept="image/*"
                name="photo"
                className="w-full border border-gray-300 p-3 rounded-md"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData((prev) => ({ ...prev, photo: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <p className="text-sm text-gray-500">Choose a profile picture</p>

              {/* If there's an image, show a preview */}
              {formData.photo && (
                <div className="mt-2">
                  <img
                    src={formData.photo}
                    alt="Profile preview"
                    className="w-20 h-20 object-cover rounded-full mx-auto"
                  />
                </div>
              )}

              {/* Description */}
              <textarea
                name="description"
                placeholder="Description"
                className="w-full border border-gray-300 p-3 rounded-md"
                value={formData.description}
                onChange={handleChange}
              ></textarea>

              {/* Contact Field */}
              <label className="block mb-2 text-sm font-medium text-gray-700">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
              />

              {/* Interests Field */}
              <label className="block mb-2 text-sm font-medium text-gray-700">Interests (comma-separated)</label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-md"
              />
            </div>
          )}

          {/* PAGE 2: Location Information */}
          {currentPage === 2 && (
            <div>
              {/* Location Name Input */}
              <input
                type="text"
                name="locationName"
                placeholder="Enter city or address"
                className="w-full border border-gray-300 p-3 rounded-md"
                value={formData.locationName}
                onChange={handleChange}
              />

              {/* Latitude Input */}
              <input
                type="number"
                name="lat"
                placeholder="Enter latitude"
                className="w-full border border-gray-300 p-3 rounded-md"
                value={formData.lat}
                onChange={handleChange}
                required
              />

              {/* Longitude Input */}
              <input
                type="number"
                name="lng"
                placeholder="Enter longitude"
                className="w-full border border-gray-300 p-3 rounded-md"
                value={formData.lng}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex justify-between space-x-2">
            {/* Previous Button */}
            {currentPage === 2 && (
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={handlePreviousPage}
              >
                <span>&larr; Previous</span>
              </button>
            )}

            {/* Next Button */}
            {currentPage === 1 && (
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleNextPage}
              >
                Next &rarr;
              </button>
            )}

            {/* Save Button (On Last Page) */}
            {currentPage === 2 && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            )}
          </div>
        </form>

        {/* Pass the location to MapComponent if available */}
        {/* {formData.lat && formData.lng && currentPage === 2 && (
          <MapComponent location={{ lat: formData.lat, lng: formData.lng, address: formData.locationName }} />
        )} */}
      </div>
    </div>
  );
};

export default ProfileFormModal;
