import { useEffect, useState } from 'react';
import fetchData from '../utils/api';

export type CardProps = {
  name: string;
  url: string;
};

export default function Card(props: CardProps) {
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const data = await fetchData(props.url);
      setImageURL(data.sprites.front_default);
    };
    getImage();
  }, [props.url]);
  return (
    <div className="card">
      <h1>{props.name}</h1>
      <img src={imageURL} alt="pokemon-image" />
    </div>
  );
}
