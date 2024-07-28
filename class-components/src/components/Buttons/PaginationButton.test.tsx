import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PaginationButton from './PaginationButton';

const paginationProps = {
  classList: 'pagination-back',
  callback: () => console.log('test'),
  currentPage: 1,
};

test('shoould have a placeholder', () => {
  render(
    <BrowserRouter>
      <PaginationButton {...paginationProps} />
    </BrowserRouter>
  );

  const paginationButton = screen.getByText('<');
  expect(paginationButton).toBeInTheDocument();
});

test('should be disabled', () => {
  render(
    <BrowserRouter>
      <PaginationButton {...paginationProps} />
    </BrowserRouter>
  );

  const paginationButton = screen.getByText('<');
  expect(paginationButton).toHaveClass('pagination-back disabled');
});
