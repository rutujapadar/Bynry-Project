import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProfile, addProfile, editProfile } from '../redux/profilesSlice';
import ProfileFormModal from '../components/ProfileFormModal';

const AdminDashboard = () => {
  const profiles = useSelector((state) => state.profiles.list);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleAdd = () => {
    setEditingProfile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      dispatch(deleteProfile(id));
    }
  };

  const handleSubmit = (profileData) => {
    if (editingProfile) {
      dispatch(editProfile(profileData));
    } else {
      dispatch(addProfile({ ...profileData, id: Date.now() }));
    }
    setIsModalOpen(false);
  };

  const handleDuplicate = (profile) => {
    const duplicatedProfile = { ...profile, id: Date.now() };
    dispatch(addProfile(duplicatedProfile));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with reduced size */}
      <div className="bg-blue-900 text-white px-4 py-3">
        <h1 className="text-xl font-bold text-center">Admin Dashboard</h1>
      </div>

      <div className="p-4 bg-gray-50 flex-grow">
        {/* Smaller Add Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-900 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-500 transition duration-300"
          >
            Add Profile
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg text-gray-800 text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-2 px-4">Photo</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Description</th>
                <th className="py-2 px-4">Location</th>
                <th className="py-2 px-4">Contact</th>
                <th className="py-2 px-4">Interests</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => (
                <tr key={profile.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    <img
                      src={profile.photo}
                      alt={profile.name}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4">{profile.name}</td>
                  <td className="py-2 px-4">{profile.description}</td>
                  <td className="py-2 px-4">{profile.locationName}</td>
                  <td className="py-2 px-4">{profile.contact}</td>
                  <td className="py-2 px-4">
                    {profile.interests
                      ? profile.interests
                          .split(',')
                          .map((i) => i.trim())
                          .join(', ')
                      : 'No interests available'}
                  </td>

                  <td className="py-2 px-4 space-x-1">
                    {/* Smaller Edit Button */}
                    <button
                      onClick={() => handleEdit(profile)}
                      className="bg-yellow-600 text-white px-2 py-1 text-xs rounded hover:bg-yellow-400 transition duration-200"
                    >
                      Edit
                    </button>

                    {/* Smaller Delete Button */}
                    <button
                      onClick={() => handleDelete(profile.id)}
                      className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>

                    {/* Smaller Duplicate Button */}
                    <button
                      onClick={() => handleDuplicate(profile)}
                      className="bg-blue-700 text-white px-2 py-1 text-xs rounded hover:bg-blue-500 transition duration-200"
                    >
                      Duplicate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-900 text-white p-2 mt-auto text-center text-sm">
        <p>&copy; 2025 Admin Dashboard</p>
      </div>

      {isModalOpen && (
        <ProfileFormModal
          profile={editingProfile}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
