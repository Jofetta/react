import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllPokemons, Pokemon } from '../types/types';
export const defaultURL = 'https://pokeapi.co/api/v2/';

export const pokeAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: defaultURL }),
  endpoints: (builder) => ({
    getPokemonBy: builder.query<AllPokemons | Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
