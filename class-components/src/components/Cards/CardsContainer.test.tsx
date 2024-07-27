import CardsContainer from './CardsContainer';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../utils/store';
import { AllPokemons, Pokemon } from '../../types/types';

const mockPokemon: Pokemon = {
  name: 'caterpie',
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
  },
  stats: [
    {
      base_stat: 45,
      stat: {
        name: 'hp',
      },
    },
    {
      base_stat: 30,
      stat: {
        name: 'attack',
      },
    },
    {
      base_stat: 35,
      stat: {
        name: 'defense',
      },
    },
    {
      base_stat: 20,
      stat: {
        name: 'special-attack',
      },
    },
    {
      base_stat: 20,
      stat: {
        name: 'special-defense',
      },
    },
    {
      base_stat: 45,
      stat: {
        name: 'speed',
      },
    },
  ],
};

const mockCardContainer1 = {
  query: '',
  apiData: { results: [mockPokemon, mockPokemon, mockPokemon] } as unknown as
    | AllPokemons
    | Pokemon
    | undefined,
  isLoading: false,
};

const mockCardContainer2 = {
  query: 'caterpie',
  apiData: mockPokemon as AllPokemons | Pokemon | undefined,
  isLoading: false,
};

test('should have pokemon cards', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CardsContainer {...mockCardContainer1} />
      </BrowserRouter>
    </Provider>
  );
  const heading = await screen.findAllByText('caterpie');
  heading.forEach((el) => {
    expect(el).toBeInTheDocument();
  });
});

test('should have a pokemon name', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CardsContainer {...mockCardContainer2} />
      </BrowserRouter>
    </Provider>
  );
  const heading = await screen.findByText('caterpie');
  expect(heading).toBeInTheDocument();
});

test('should have an image', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CardsContainer {...mockCardContainer2} />
      </BrowserRouter>
    </Provider>
  );
  const image = await screen.findByAltText('pokemon-image');
  expect(image).toBeInTheDocument();
});
