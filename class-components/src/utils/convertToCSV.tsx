import { Pokemon } from '../types/types';
const convertArrayToCSV = (pokemonArray: Pokemon[]): string => {
  const headers = [
    'Name',
    'Image(Sprite)',
    'HP',
    'Attack',
    'Defense',
    'Special-Attack',
    'Special-Defense',
    'Speed',
  ];

  const rows = pokemonArray.map((pokemon) => {
    const stats: { [key: string]: number } = {};
    pokemon.stats.forEach((stat) => {
      stats[stat.stat.name] = stat.base_stat;
    });

    return [
      pokemon.name,
      pokemon.sprites.front_default,
      stats['hp'] || 0,
      stats['attack'] || 0,
      stats['defense'] || 0,
      stats['special-attack'] || 0,
      stats['special-defense'] || 0,
      stats['speed'] || 0,
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
};

export default convertArrayToCSV;
