import { useContext, useEffect, useState } from 'react';
import { pokeAPI } from '../../store/api';
import { ThemeContext } from '../../context/ThemeContext';
import Loader from '../Loader';
import { isPokemon } from '../../types/types';
import SelectButton from '../Buttons/SelectButton';
import { useDispatch } from 'react-redux';
import { setItem } from '../../store/selectedItemsSlice';
import { useRouter } from 'next/router';

const { useGetPokemonByQuery } = pokeAPI;
export type CardProps = {
  name: string;
  openDetail: () => void;
};

export default function Card(props: CardProps) {
  const [imageURL, setImageURL] = useState('');
  const darkTheme = useContext(ThemeContext);
  const { data, error, isLoading } = useGetPokemonByQuery(props.name);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const pokemonData = isPokemon(data);
      if (pokemonData) setImageURL(pokemonData.sprites.front_default);
    }
  }, [data]);

  function handleClick() {
    props.openDetail();
    router.push(`/?pokemon=${props.name}`, undefined, { shallow: true });
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
