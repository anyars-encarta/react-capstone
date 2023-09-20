import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import store from '../redux/store';
import Continents from '../components/Continents';

describe('Continents component', () => {
  it('should render correctly', async () => {
    render(
      <Provider store={store}>
        <Continents />
      </Provider>,
    );

    await waitFor(() => {
      const { continents } = store.getState();
      return continents && continents.length > 0;
    });

    expect(screen.getByText('Global Stats')).toBeInTheDocument();
    expect(screen.getByText('CONTINENT STATS')).toBeInTheDocument();

    const { continents } = store.getState();
    if (continents.length > 0) {
      const continent = continents[0];
      const continentElement = screen.getByText(continent.continent);
      expect(continentElement).toBeInTheDocument();
    }
  });

  it('should navigate to countries page when a continent is clicked', async () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <Continents />
        </Router>
      </Provider>,
    );

    await waitFor(() => screen.getByText('Global Stats'));

    const { continents } = store.getState();
    if (continents.length > 0) {
      const continent = continents[0];
      const continentElement = screen.getByText(continent.continent);
      continentElement.click();
      expect(history.location.pathname).toBe(`/countries/${continent.continent}`);
    }
  });

  describe('Continents component', () => {
    it('should match snapshot', async () => {
      const { container } = render(
        <Provider store={store}>
          <Continents />
        </Provider>,
      );

      await waitFor(() => screen.getByText('Global Stats'));
      expect(container).toMatchSnapshot();
    });
  });
});
