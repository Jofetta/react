import { useEffect, useState } from 'react';
import fetchData from '../../utils/api';
import { useNavigate } from 'react-router-dom';

export type CardProps = {
  name: string;
  url: string;
};

export default function Card(props: CardProps) {
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

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
    <div className="card" onClick={handleClick}>
      <h1>{props.name}</h1>
      <img src={imageURL} alt="pokemon-image" />
    </div>
  );
}
