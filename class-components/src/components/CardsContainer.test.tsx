import CardsContainer from './CardsContainer';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { CardContainerProps } from './CardsContainer';

const mockCard = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur',
};

const mockCardContainer1 = {
  query: '',
  apiData: { results: [mockCard, mockCard, mockCard] as unknown as [] },
  isLoading: false,
};

const mockCardContainer2 = {
  query: 'bulbasaur',
  apiData: mockCard as unknown as CardContainerProps,
  isLoading: false,
};

test('should have pokemon cards', () => {
  render(
    <BrowserRouter>
      <CardsContainer {...mockCardContainer1} />
    </BrowserRouter>
  );
  const heading = screen.getAllByText('bulbasaur');
  heading.forEach((el) => {
    expect(el).toBeInTheDocument();
  });
});

test('should have a pokemon name', () => {
  render(
    <BrowserRouter>
      <CardsContainer {...mockCardContainer2} />
    </BrowserRouter>
  );
  const heading = screen.getByText('bulbasaur');
  expect(heading).toBeInTheDocument();
});

test('should have an image', () => {
  render(
    <BrowserRouter>
      <CardsContainer {...mockCardContainer2} />
    </BrowserRouter>
  );
  const image = screen.getByAltText('pokemon-image');
  expect(image).toBeInTheDocument();
});
