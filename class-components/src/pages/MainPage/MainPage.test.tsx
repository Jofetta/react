import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { store } from '../../utils/store';

test('shoould have a placeholder', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

  const input = screen.getByPlaceholderText('Enter pokemon name');
  expect(input).toBeInTheDocument();
});

test('shoould have a search button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

  const searchButton = screen.getByText('Search');
  expect(searchButton).toBeInTheDocument();
});

test('shoould have an error button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

  const errorButton = screen.getByText('Throw an Error');
  expect(errorButton).toBeInTheDocument();
});

test('should have a loader', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );
  const loader = await screen.findByText('Loading ...');
  expect(loader).toBeInTheDocument();
});
