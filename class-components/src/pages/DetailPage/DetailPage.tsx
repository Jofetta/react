import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchData, { defaultURL } from '../../utils/api';
import Loader from '../../components/Loader';

export default function DetailPage() {
  const { id } = useParams();
  const [imageURL, setImageURL] = useState('');
  const [hp, setHP] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [speed, setSpeed] = useState('');
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(defaultURL + id);
      setImageURL(data.sprites.front_default);
      setHP(data.stats[0].base_stat);
      setAttack(data.stats[1].base_stat);
      setDefense(data.stats[2].base_stat);
      setSpeed(data.stats[5].base_stat);
      console.log(data);
      setLoading(false);
    };
    getData();
  }, [id]);

  function closeDetails() {
    navigate('/');
  }

  return (
    <>
      <div className="details">
        <button className="close-button" onClick={closeDetails}>
          X
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="info">
            <h1>{id}</h1>
            <img src={imageURL} alt="pokemon-image" />
            <p>HP: {hp}</p>
            <p>Attack: {attack}</p>
            <p>Defense: {defense}</p>
            <p>Speed: {speed}</p>
          </div>
        )}
      </div>
      <div className="background" onClick={closeDetails}></div>
    </>
  );
}
