// store.js
import { configureStore } from '@reduxjs/toolkit';
import continentsReducer from './continentsSlice';
import countriesReducer from './countriesSlice';

const store = configureStore({
  reducer: {
    continents: continentsReducer,
    countries: countriesReducer,
  },
});

export default store;
