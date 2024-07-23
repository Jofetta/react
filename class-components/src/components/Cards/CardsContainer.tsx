import Card, { CardProps } from './Card';
import { ApiData } from '../../pages/MainPage/MainPage';
import { defaultURL } from '../../utils/api';
import Loader from '../Loader';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export type CardContainerProps = {
  query: string;
  apiData: ApiData;
  isLoading: boolean;
};
export default function CardsContainer(props: CardContainerProps) {
  const darkTheme = useContext(ThemeContext);
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
        {props.apiData.results?.map((el: CardProps) => {
          return <Card key={el.name} {...el} />;
        })}
      </div>
    );
  } else {
    return <Card name={props.query} url={defaultURL + props.query} />;
  }
}
