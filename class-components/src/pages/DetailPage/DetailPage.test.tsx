import DetailPage from './DetailPage';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../utils/store';

test('should have a close button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <DetailPage />
      </BrowserRouter>
    </Provider>
  );
  const closeButton = screen.getByText('X');
  expect(closeButton).toBeInTheDocument();
});
