import { useContext, useEffect, useState } from 'react';
import { pokeAPI } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Loader from '../Loader';
import { isPokemon } from '../../types/types';

const { useGetPokemonByQuery } = pokeAPI;
export type CardProps = {
  name: string;
};

export default function Card(props: CardProps) {
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();
  const darkTheme = useContext(ThemeContext);
  const { data, error, isLoading } = useGetPokemonByQuery(props.name);

  useEffect(() => {
    if (data) {
      const pokemonData = isPokemon(data);
      if (pokemonData) setImageURL(pokemonData.sprites.front_default);
    }
  }, [data]);

  function handleClick() {
    navigate(`/pokemon/${props.name}`);
  }

  return (
    <>
      {error ? (
        <>Something went wrong</>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div
          className={darkTheme.darkTheme ? 'card dark' : 'card'}
          onClick={handleClick}
        >
          <h1>{props.name}</h1>
          {imageURL && <img src={imageURL} alt="pokemon-image" />}
        </div>
      )}
    </>
  );
}
