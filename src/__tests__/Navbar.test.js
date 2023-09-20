import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('Navbar renders with correct content', () => {
  const { asFragment, getByText } = render(<Navbar />);

  expect(getByText('2023')).toBeInTheDocument();
  expect(getByText('WORLD COVID CASES')).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});
