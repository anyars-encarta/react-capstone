// countriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    list: [],
    loading: true,
    error: null,
    stats: {
      totalCases: 0,
      totalRecoveries: 0,
      totalDeaths: 0,
    },
  },
  reducers: {
    setCountries: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setContinentStats: (state, action) => {
      state.stats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCountries, setError, setContinentStats, setLoading,
} = countriesSlice.actions;
export const selectCountries = (state) => state.countries;
export default countriesSlice.reducer;
