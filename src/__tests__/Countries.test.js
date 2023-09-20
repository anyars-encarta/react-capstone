import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import Countries from '../components/Countries';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Countries Integration Test', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      countries: {
        list: [
          // Mock your countries data here
          {
            country: 'Country1',
            continent: 'ContinentName',
            cases: 100,
            recovered: 50,
            deaths: 5,
            active: 45,
            todayCases: 10,
            todayDeaths: 2,
            todayRecovered: 8,
            critical: 3,
            tests: 1000,
            population: 1000000,
          },
          {
            country: 'Country2',
            continent: 'ContinentName',
            cases: 200,
            recovered: 100,
            deaths: 10,
            active: 90,
            todayCases: 20,
            todayDeaths: 4,
            todayRecovered: 16,
            critical: 6,
            tests: 2000,
            population: 2000000,
          },
          // Add more mock data as needed
        ],
        loading: false,
        error: null,
        stats: {
          totalCases: 300,
          totalRecoveries: 150,
          totalDeaths: 15,
        },
      },
    });
  });

  it('should render the component with data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/countries/ContinentName']}>
          <Route path="/countries/:continentName">
            <Countries />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    // Assert that the component has rendered correctly
    expect(screen.getByText('Stats for ContinentName')).toBeInTheDocument();
    expect(screen.getByText('Cases: 300')).toBeInTheDocument();
    expect(screen.getByText('Recoveries: 150')).toBeInTheDocument();
    expect(screen.getByText('Deaths: 15')).toBeInTheDocument();
    expect(screen.getByText('Country1')).toBeInTheDocument();
    expect(screen.getByText('Country2')).toBeInTheDocument();
  });

  it('should filter countries based on search query', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/countries/ContinentName']}>
          <Route path="/countries/:continentName">
            <Countries />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    // Enter search query
    const searchInput = screen.getByPlaceholderText('Search countries...');
    fireEvent.change(searchInput, { target: { value: 'Country1' } });

    // Assert that only Country1 is displayed
    expect(screen.getByText('Country1')).toBeInTheDocument();
    expect(screen.queryByText('Country2')).not.toBeInTheDocument();
  });

  // Add more integration tests as needed

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/countries/ContinentName']}>
          <Route path="/countries/:continentName">
            <Countries />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
