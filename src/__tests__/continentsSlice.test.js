import continentsReducer, { setContinents } from '../redux/continentsSlice';

describe('continentsSlice', () => {
  describe('reducer', () => {
    it('should handle setContinents', () => {
      const initialState = [];
      const continents = [{ name: 'Africa' }, { name: 'Asia' }];
      const action = setContinents(continents);
      const newState = continentsReducer(initialState, action);

      expect(newState).toEqual(continents);
    });
  });
});
