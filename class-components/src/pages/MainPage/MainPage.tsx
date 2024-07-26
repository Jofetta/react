import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Input, { InputProps } from '../../components/Input';
import SearchButton, {
  ButtonProps,
} from '../../components/Buttons/SearchButton';
import CardsContainer from '../../components/Cards/CardsContainer';
import ErrorBoundary from '../../components/ErrorJHandling/ErrorBoundary';
import ErrorButton from '../../components/ErrorJHandling/ErrorButton';
import useLocalStorage from '../../utils/localStorage';
import PaginationButton from '../../components/Buttons/PaginationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ThemeButton } from '../../components/Buttons/ThemeButton';
import { ThemeContext } from '../../context/ThemeContext';
import { pokeAPI } from '../../utils/api';
import { AllPokemons, Pokemon, isAllPokemons } from '../../types/types';

const { useGetPokemonByQuery } = pokeAPI;

export default function MainPage() {
  const { query, setQuery } = useLocalStorage('pokemonQuery', '');
  const [tempQuery, setTempQuery] = useState('');
  const [apiQuery, setApiQuery] = useState('');
  const { data, isLoading } = useGetPokemonByQuery(apiQuery);
  const [apiData, setApiData] = useState<AllPokemons | Pokemon | undefined>();
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const navigate = useNavigate();
  const darkTheme = useContext(ThemeContext);

  function updateState(searchString: string) {
    setTempQuery(searchString);
  }

  async function fetchPageData(page: number) {
    const pokemonLimit = 20;
    const offset = (page - 1) * pokemonLimit;
    const urlEndpoint = `?offset=${offset}&limit=${pokemonLimit}`;
    setApiQuery(urlEndpoint);
  }

  useEffect(() => {
    async function onMount() {
      const searchString = searchParams.get('search');
      if (searchString) {
        setQuery(searchString);
        setTempQuery(searchString);
        setApiQuery(searchString);
        setApiData(data);
      } else if (searchParams.get('page')) {
        fetchPageData(currentPage);
        setApiData(data);
      } else {
        setApiData(data);
      }
    }
    onMount();
  }, [query, currentPage, searchParams, setQuery, data]);

  async function handleClick() {
    if (tempQuery) {
      setSearchParams({ search: tempQuery });
      setQuery(tempQuery);
      setApiQuery(tempQuery);
    } else {
      setSearchParams({ page: '1', search: '' });
      setQuery('');
      fetchPageData(currentPage);
      navigate('/?page=1');
    }
    setApiData(data);
    setCurrentPage(1);
    console.log(apiData);
  }

  async function changePage(forward: boolean) {
    console.log(apiData);
    if (forward) {
      navigate(`/?page=${currentPage + 1}`);
      setCurrentPage(currentPage + 1);
    } else {
      navigate(`/?page=${currentPage - 1}`);
      setCurrentPage(currentPage - 1);
    }
  }

  const props: ButtonProps = {
    callback: () => handleClick(),
  };
  const inputProps: InputProps = {
    initialState: searchParams.get('search')
      ? searchParams.get('search')
      : query,
    callback: (e: ChangeEvent) => {
      if (e?.target instanceof HTMLInputElement) updateState(e.target.value);
    },
  };

  return (
    <main className={darkTheme.darkTheme ? 'main dark' : 'main'}>
      <section>
        <Input {...inputProps} />
        <SearchButton {...props} />
        <ErrorButton />
        <ThemeButton />
      </section>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <section>
          {apiData && (
            <div>
              <div className="container">
                <CardsContainer
                  key={`key_${isLoading}_${query}`}
                  isLoading={isLoading}
                  query={query ? query : ''}
                  apiData={apiData}
                />
                <Outlet />
              </div>
              {isAllPokemons(apiData)?.results && (
                <div className="pagination-container">
                  <PaginationButton
                    classList="pagination-back"
                    callback={() => changePage(false)}
                    currentPage={currentPage}
                  />
                  <div>{currentPage}</div>
                  <PaginationButton
                    classList="pagination-forward"
                    callback={() => changePage(true)}
                    currentPage={currentPage}
                  />
                </div>
              )}
            </div>
          )}
          {apiData === undefined && <div>No results</div>}
        </section>
      </ErrorBoundary>
    </main>
  );
}
