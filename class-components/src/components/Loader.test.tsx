import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

test('shoould have an error button', () => {
  render(
    <BrowserRouter>
      <Loader />
    </BrowserRouter>
  );

  const loader = screen.getByText('Loading ...');
  expect(loader).toBeInTheDocument();
});
