import { describe, it, expect } from 'vitest';
import convertArrayToCSV from './convertToCSV';
import { Pokemon } from '../types/types';

const mockPokemonArray: Pokemon[] = [
  {
    name: 'caterpie',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
    },
    stats: [
      { base_stat: 45, stat: { name: 'hp' } },
      { base_stat: 30, stat: { name: 'attack' } },
      { base_stat: 35, stat: { name: 'defense' } },
      { base_stat: 20, stat: { name: 'special-attack' } },
      { base_stat: 20, stat: { name: 'special-defense' } },
      { base_stat: 45, stat: { name: 'speed' } },
    ],
  },
  {
    name: 'metapod',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png',
    },
    stats: [
      { base_stat: 50, stat: { name: 'hp' } },
      { base_stat: 20, stat: { name: 'attack' } },
      { base_stat: 55, stat: { name: 'defense' } },
      { base_stat: 25, stat: { name: 'special-attack' } },
      { base_stat: 25, stat: { name: 'special-defense' } },
      { base_stat: 30, stat: { name: 'speed' } },
    ],
  },
];

describe('convertArrayToCSV', () => {
  it('should convert an array of Pokémon objects to CSV format', () => {
    const expectedCSV = `Name,Image(Sprite),HP,Attack,Defense,Special-Attack,Special-Defense,Speed
caterpie,https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png,45,30,35,20,20,45
metapod,https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png,50,20,55,25,25,30`;

    const csv = convertArrayToCSV(mockPokemonArray);
    expect(csv).toBe(expectedCSV);
  });

  it('should handle empty Pokémon stats correctly', () => {
    const mockPokemonArrayWithEmptyStats: Pokemon[] = [
      {
        name: 'empty',
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png',
        },
        stats: [],
      },
    ];

    const expectedCSV = `Name,Image(Sprite),HP,Attack,Defense,Special-Attack,Special-Defense,Speed
empty,https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png,0,0,0,0,0,0`;

    const csv = convertArrayToCSV(mockPokemonArrayWithEmptyStats);
    expect(csv).toBe(expectedCSV);
  });
});
