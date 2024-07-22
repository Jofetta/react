import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SearchButton from './SearchButton';

const buttonProps = {
  callback: () => {
    console.log('test');
  },
};

test('shoould have a search button', () => {
  render(
    <BrowserRouter>
      <SearchButton {...buttonProps} />
    </BrowserRouter>
  );

  const searchButton = screen.getByText('Search');
  expect(searchButton).toBeInTheDocument();
});
