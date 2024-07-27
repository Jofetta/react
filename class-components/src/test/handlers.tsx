import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/caterpie', () => {
    return HttpResponse.json({
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
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/', () => {
    return HttpResponse.json({
      count: 1302,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
      previous: null,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'ivysaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
          name: 'venusaur',
          url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
        {
          name: 'charmander',
          url: 'https://pokeapi.co/api/v2/pokemon/4/',
        },
        {
          name: 'charmeleon',
          url: 'https://pokeapi.co/api/v2/pokemon/5/',
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
        },
        {
          name: 'squirtle',
          url: 'https://pokeapi.co/api/v2/pokemon/7/',
        },
        {
          name: 'wartortle',
          url: 'https://pokeapi.co/api/v2/pokemon/8/',
        },
        {
          name: 'blastoise',
          url: 'https://pokeapi.co/api/v2/pokemon/9/',
        },
        {
          name: 'caterpie',
          url: 'https://pokeapi.co/api/v2/pokemon/10/',
        },
        {
          name: 'metapod',
          url: 'https://pokeapi.co/api/v2/pokemon/11/',
        },
        {
          name: 'butterfree',
          url: 'https://pokeapi.co/api/v2/pokemon/12/',
        },
        {
          name: 'weedle',
          url: 'https://pokeapi.co/api/v2/pokemon/13/',
        },
        {
          name: 'kakuna',
          url: 'https://pokeapi.co/api/v2/pokemon/14/',
        },
        {
          name: 'beedrill',
          url: 'https://pokeapi.co/api/v2/pokemon/15/',
        },
        {
          name: 'pidgey',
          url: 'https://pokeapi.co/api/v2/pokemon/16/',
        },
        {
          name: 'pidgeotto',
          url: 'https://pokeapi.co/api/v2/pokemon/17/',
        },
        {
          name: 'pidgeot',
          url: 'https://pokeapi.co/api/v2/pokemon/18/',
        },
        {
          name: 'rattata',
          url: 'https://pokeapi.co/api/v2/pokemon/19/',
        },
        {
          name: 'raticate',
          url: 'https://pokeapi.co/api/v2/pokemon/20/',
        },
      ],
    });
  }),
];
