import { useContext, useEffect, useState } from 'react';
import fetchData from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

export type CardProps = {
  name: string;
  url: string;
};

export default function Card(props: CardProps) {
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();
  const darkTheme = useContext(ThemeContext);

  useEffect(() => {
    const getImage = async () => {
      const data = await fetchData(props.url);
      setImageURL(data.sprites.front_default);
    };
    getImage();
  }, [props.url]);

  function handleClick() {
    navigate(`/pokemon/${props.name}`);
  }

  return (
    <div
      className={darkTheme.darkTheme ? 'card dark' : 'card'}
      onClick={handleClick}
    >
      <h1>{props.name}</h1>
      <img src={imageURL} alt="pokemon-image" />
    </div>
  );
}
