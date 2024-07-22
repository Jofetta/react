import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';

test('shoould have a placeholder', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText('Enter pokemon name');
  expect(input).toBeInTheDocument();
});

test('shoould have a search button', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  const searchButton = screen.getByText('Search');
  expect(searchButton).toBeInTheDocument();
});

test('shoould have an error button', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );

  const errorButton = screen.getByText('Throw an Error');
  expect(errorButton).toBeInTheDocument();
});

test('should have a loader', () => {
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>
  );
  const loader = screen.getByText('Loading ...');
  expect(loader).toBeInTheDocument();
});
