import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('Navbar renders with correct content', () => {
  const { asFragment, getByText } = render(<Navbar />);

  // Assert that the component renders with the correct text content
  expect(getByText('2023')).toBeInTheDocument();
  expect(getByText('WORLD COVID CASES')).toBeInTheDocument();

  // Create a snapshot of the component
  expect(asFragment()).toMatchSnapshot();
});
