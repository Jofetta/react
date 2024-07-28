import { useContext, useEffect, useState } from 'react';
import { pokeAPI } from '../../store/api';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Loader from '../Loader';
import { isPokemon } from '../../types/types';
import SelectButton from '../Buttons/SelectButton';
import { useDispatch } from 'react-redux';
import { setItem } from '../../store/selectedItemsSlice';

const { useGetPokemonByQuery } = pokeAPI;
export type CardProps = {
  name: string;
};

export default function Card(props: CardProps) {
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();
  const darkTheme = useContext(ThemeContext);
  const { data, error, isLoading } = useGetPokemonByQuery(props.name);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      const pokemonData = isPokemon(data);
      if (pokemonData) setImageURL(pokemonData.sprites.front_default);
    }
  }, [data]);

  function handleClick() {
    navigate(`/pokemon/${props.name}`);
  }

  function selectItem() {
    const pokemonData = isPokemon(data);
    if (pokemonData) dispatch(setItem(pokemonData));
  }

  return (
    <>
      {error ? (
        <>Something went wrong</>
      ) : isLoading ? (
        <Loader />
      ) : data ? (
        <div
          className={darkTheme.darkTheme ? 'card dark' : 'card'}
          onClick={handleClick}
        >
          <h1>{props.name}</h1>
          {imageURL && <img src={imageURL} alt="pokemon-image" />}
          <SelectButton name={props.name} callback={() => selectItem()} />
        </div>
      ) : null}
    </>
  );
}
