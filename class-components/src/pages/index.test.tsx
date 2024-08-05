import { render, screen } from '@testing-library/react';
import Home from './index';
import { Provider } from 'react-redux';
import { store } from '../store/store';

test('should render an input', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  const input = screen.getByPlaceholderText('Enter pokemon name');
  expect(input).toBeInTheDocument();
});
