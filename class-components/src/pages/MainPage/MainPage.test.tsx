import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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

test('should switch to dark theme', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );
  const themeButton = await screen.findByTestId('theme-button');
  const themeButtonDark = await screen.findByTestId('theme-button-dark');
  fireEvent.click(themeButton);
  await waitFor(() => {
    expect(themeButtonDark.classList).toContain('theme-button');
  });
});

test('should have flyout component', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

  const flyoutHeading = screen.getByText('You have selected 0 pokemon');
  expect(flyoutHeading).toBeInTheDocument();
});

test('should have flyout unselect button', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

  const flyoutUnselect = screen.getByText('Unselect All');
  expect(flyoutUnselect).toBeInTheDocument();
});

test('should have flyout download', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>
  );

  const flyoutUnselect = screen.getByText('Download All');
  expect(flyoutUnselect).toBeInTheDocument();
});
