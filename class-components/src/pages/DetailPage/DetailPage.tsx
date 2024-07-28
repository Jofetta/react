import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { ThemeContext } from '../../context/ThemeContext';
import { pokeAPI } from '../../store/api';
import { isPokemon, Pokemon } from '../../types/types';

const { useGetPokemonByQuery } = pokeAPI;

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const darkTheme = useContext(ThemeContext);
  const { data, error, isLoading } = useGetPokemonByQuery(id ? id : '');
  const [pokemonData, setPokemonData] = useState<Pokemon>();

  useEffect(() => {
    if (data) setPokemonData(isPokemon(data));
  }, [data]);

  function closeDetails() {
    navigate('/');
  }

  return (
    <>
      <div className={darkTheme.darkTheme ? 'details dark' : 'details'}>
        <button className="close-button" onClick={closeDetails}>
          X
        </button>
        {error ? (
          <>There's an error</>
        ) : isLoading ? (
          <Loader />
        ) : pokemonData ? (
          <div className="info">
            <h1>{id}</h1>
            <img src={pokemonData.sprites.front_default} alt="pokemon-image" />
            <p>HP: {pokemonData.stats[0].base_stat}</p>
            <p>Attack: {pokemonData.stats[1].base_stat}</p>
            <p>Defense: {pokemonData.stats[2].base_stat}</p>
            <p>Speed: {pokemonData.stats[5].base_stat}</p>
          </div>
        ) : null}
      </div>
      <div className="background" onClick={closeDetails}></div>
    </>
  );
}
