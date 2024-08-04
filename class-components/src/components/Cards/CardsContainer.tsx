import Card from './Card';
import Loader from '../Loader';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { AllPokemons, Pokemon, isAllPokemons } from '../../types/types';

export type CardContainerProps = {
  query: string;
  apiData: AllPokemons | Pokemon | undefined;
  isLoading: boolean;
  openDetail: () => void;
};
export default function CardsContainer(props: CardContainerProps) {
  const darkTheme = useContext(ThemeContext);
  const allPokemons = isAllPokemons(props.apiData);

  if (props.isLoading) {
    return <Loader />;
  }

  if (props.query === undefined || props.query === '') {
    return (
      <div
        className={
          darkTheme.darkTheme ? 'cards-container dark' : 'cards-container'
        }
      >
        {allPokemons &&
          allPokemons.results?.map((el) => {
            return (
              <Card
                key={el.name}
                name={el.name}
                openDetail={props.openDetail}
              />
            );
          })}
      </div>
    );
  } else {
    return <Card name={props.query} openDetail={props.openDetail} />;
  }
}
