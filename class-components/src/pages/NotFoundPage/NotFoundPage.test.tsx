import NotFoundPage from '../404';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

test('should have 404 header', () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );
  const heading = screen.getByText('404');
  expect(heading).toBeInTheDocument();
});

test('should have a not found element', () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );
  const paragraph = screen.getByText('The page is not found');
  expect(paragraph).toBeInTheDocument();
});

test('should have a link to the home page', () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );
  const linkHome = screen.getByText('Go to Home Page');
  expect(linkHome).toBeInTheDocument();
});
