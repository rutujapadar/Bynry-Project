import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    // Add a new profile
    addProfile: (state, action) => {
      state.list.push(action.payload);
    },

    // Remove a profile by id
    deleteProfile: (state, action) => {
      state.list = state.list.filter(profile => profile.id !== action.payload);
    },

    // Edit/Update a profile by id
    editProfile: (state, action) => {
      const index = state.list.findIndex(profile => profile.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload; // Update the profile with new data
      }
    },
  },
});

// Exporting actions
export const { addProfile, deleteProfile, editProfile } = profilesSlice.actions;

// Select profiles from the state
export const selectProfiles = (state) => state.profiles.list;

// Export reducer
export default profilesSlice.reducer;
