import { combineReducers } from 'redux';
import countriesReducer from './countriesSlice';
import continentsReducer from './continentsSlice';

const rootReducer = combineReducers({
  countries: countriesReducer,
  continents: continentsReducer,
});

export default rootReducer;
