import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Input from './Input';

const InputProps = {
  initialState: '',
  callback: () => {
    console.log('test');
  },
};

const InputProps2 = {
  initialState: 'bulbasaur',
  callback: () => {
    console.log('test');
  },
};

test('shoould have a placeholder', () => {
  render(
    <BrowserRouter>
      <Input {...InputProps} />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText('Enter pokemon name');
  expect(input).toBeInTheDocument();
});

test('shoould have an initial value', () => {
  render(
    <BrowserRouter>
      <Input {...InputProps2} />
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText('Enter pokemon name');
  expect(input).toHaveValue('bulbasaur');
});
