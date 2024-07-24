import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pokemon } from '../types/types';
export const defaultURL = 'https://pokeapi.co/api/v2/pokemon/';

export default async function fetchData(url = defaultURL) {
  try {
    const response = await fetch(url, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}

export const pokeAPI = createApi({
  reducerPath: 'pokemonAPI',
  baseQuery: fetchBaseQuery({ baseUrl: defaultURL }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `${name}`,
    }),
  }),
});
