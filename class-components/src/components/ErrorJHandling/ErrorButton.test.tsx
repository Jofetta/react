import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

test('shoould have an error button', () => {
  render(
    <BrowserRouter>
      <ErrorButton />
    </BrowserRouter>
  );

  const errorButton = screen.getByText('Throw an Error');
  expect(errorButton).toBeInTheDocument();
});
