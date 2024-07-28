export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface AllPokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export function isAllPokemons(data: AllPokemons | Pokemon | undefined) {
  if ((data as AllPokemons).results !== undefined) {
    return data as AllPokemons;
  }
}

export function isPokemon(data: AllPokemons | Pokemon | undefined) {
  if ((data as Pokemon).sprites !== undefined) {
    return data as Pokemon;
  }
}
