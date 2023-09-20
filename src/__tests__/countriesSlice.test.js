import countriesReducer, {
  setCountries,
  setError,
  setContinentStats,
  setLoading,
} from '../redux/countriesSlice';

describe('countriesSlice', () => {
  describe('reducer', () => {
    it('should handle setCountries', () => {
      const initialState = {
        list: [],
        loading: true,
        error: null,
        stats: {
          totalCases: 0,
          totalRecoveries: 0,
          totalDeaths: 0,
        },
      };
      const countries = [{ name: 'Country1' }, { name: 'Country2' }];
      const action = setCountries(countries);
      const newState = countriesReducer(initialState, action);

      expect(newState.list).toEqual(countries);
      expect(newState.loading).toBe(false);
    });

    it('should handle setError', () => {
      const initialState = {
        list: [],
        loading: true,
        error: null,
        stats: {
          totalCases: 0,
          totalRecoveries: 0,
          totalDeaths: 0,
        },
      };
      const error = 'An error occurred';
      const action = setError(error);
      const newState = countriesReducer(initialState, action);

      expect(newState.error).toBe(error);
      expect(newState.loading).toBe(false);
    });

    it('should handle setContinentStats', () => {
      const initialState = {
        list: [],
        loading: true,
        error: null,
        stats: {
          totalCases: 0,
          totalRecoveries: 0,
          totalDeaths: 0,
        },
      };
      const stats = {
        totalCases: 1000,
        totalRecoveries: 500,
        totalDeaths: 50,
      };
      const action = setContinentStats(stats);
      const newState = countriesReducer(initialState, action);

      expect(newState.stats).toEqual(stats);
    });

    it('should handle setLoading', () => {
      const initialState = {
        list: [],
        loading: true,
        error: null,
        stats: {
          totalCases: 0,
          totalRecoveries: 0,
          totalDeaths: 0,
        },
      };
      const loading = false;
      const action = setLoading(loading);
      const newState = countriesReducer(initialState, action);

      expect(newState.loading).toBe(loading);
    });
  });
});
