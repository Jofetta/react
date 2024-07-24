import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Loader from '../../components/Loader';
import { ThemeContext } from '../../context/ThemeContext';
import { pokeAPI } from '../../utils/api';

const { useGetPokemonByNameQuery } = pokeAPI;

export default function DetailPage() {
  const { id } = useParams();
  // const [imageURL, setImageURL] = useState('');
  // const [hp, setHP] = useState(0);
  // const [attack, setAttack] = useState(0);
  // const [defense, setDefense] = useState(0);
  // const [speed, setSpeed] = useState(0);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const darkTheme = useContext(ThemeContext);
  const { data, error, isLoading } = useGetPokemonByNameQuery(id ? id : '');

  // useEffect(() => {
  //   if (data) {
  //     setImageURL(data.sprites.front_default);
  //     setHP(data.stats[0].base_stat);
  //     setAttack(data.stats[1].base_stat);
  //     setDefense(data.stats[2].base_stat);
  //     setSpeed(data.stats[5].base_stat);
  //     console.log(data);
  //     setLoading(false);
  //   }
  // }, [data]);

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
        ) : data ? (
          <div className="info">
            <h1>{id}</h1>
            <img src={data.sprites.front_default} alt="pokemon-image" />
            <p>HP: {data.stats[0].base_stat}</p>
            <p>Attack: {data.stats[1].base_stat}</p>
            <p>Defense: {data.stats[2].base_stat}</p>
            <p>Speed: {data.stats[5].base_stat}</p>
          </div>
        ) : null}
      </div>
      <div className="background" onClick={closeDetails}></div>
    </>
  );
}
