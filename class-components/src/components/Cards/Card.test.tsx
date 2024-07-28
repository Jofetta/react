import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

const mockCard = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
};

test('should have a close button', () => {
  render(
    <BrowserRouter>
      <Card {...mockCard} />
    </BrowserRouter>
  );
  const heading = screen.getByText('bulbasaur');
  expect(heading).toBeInTheDocument();
});

test('should have an image', () => {
  render(
    <BrowserRouter>
      <Card {...mockCard} />
    </BrowserRouter>
  );
  const image = screen.getByAltText('pokemon-image');
  expect(image).toBeInTheDocument();
});
