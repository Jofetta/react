import DetailPage from './DetailPage';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('should have a close button', () => {
  render(
    <BrowserRouter>
      <DetailPage />
    </BrowserRouter>
  );
  const closeButton = screen.getByText('X');
  expect(closeButton).toBeInTheDocument();
});
