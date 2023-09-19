// continentsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const continentsSlice = createSlice({
  name: 'continents',
  initialState: [],
  reducers: {
    setContinents: (state, action) => action.payload,
  },
});

export const { setContinents } = continentsSlice.actions;
export const selectContinents = (state) => state.continents;
export default continentsSlice.reducer;
