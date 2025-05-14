import { configureStore } from '@reduxjs/toolkit';
import LZString from 'lz-string';
import profilesReducer from './profilesSlice';

const loadProfilesFromLocalStorage = () => {
  const compressed = localStorage.getItem('profiles');
  if (compressed) {
    try {
      const json = LZString.decompress(compressed);
      return JSON.parse(json);
    } catch (e) {
      console.warn('Failed to decompress or parse profiles from localStorage:', e);
      return [];
    }
  }
  return [];
};

const saveProfilesToLocalStorage = (profiles) => {
  try {
    const compressed = LZString.compress(JSON.stringify(profiles));

    // Check remaining localStorage space before saving
    if (isStorageLow()) {
      localStorage.setItem('profiles', compressed);
    }
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      console.error('LocalStorage quota exceeded when saving profiles:', e);
    } else {
      throw e;
    }
  }
};

// Helper function to check if localStorage has enough space
const isStorageLow = () => {
  const testKey = 'test';
  const testValue = 'a'.repeat(1024); // 1KB test string
  try {
    localStorage.setItem(testKey, testValue);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Create the store with preloaded state
const store = configureStore({
  reducer: {
    profiles: profilesReducer,
  },
  preloadedState: {
    profiles: {
      list: loadProfilesFromLocalStorage(),
    },
  },
});

// Save to localStorage with debounce, but now only when space is low
let debounceTimeout;
store.subscribe(() => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const profiles = store.getState().profiles.list;
    saveProfilesToLocalStorage(profiles);
  }, 500); // Save after 500ms of inactivity, only when storage is low
});

export default store;
