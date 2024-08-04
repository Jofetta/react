import { ChangeEvent, useContext, useEffect, useState } from 'react';
import Input, { InputProps } from '../../components/Input';
import SearchButton, {
  ButtonProps,
} from '../../components/Buttons/SearchButton';
import CardsContainer from '../../components/Cards/CardsContainer';
import ErrorBoundary from '../../components/ErrorJHandling/ErrorBoundary';
import ErrorButton from '../../components/ErrorJHandling/ErrorButton';
import PaginationButton from '../../components/Buttons/PaginationButton';
import { ThemeButton } from '../../components/Buttons/ThemeButton';
import { ThemeContext } from '../../context/ThemeContext';
import { pokeAPI } from '../../store/api';
import { AllPokemons, Pokemon, isAllPokemons } from '../../types/types';
import Flyout from '../../components/FlyOut/FlyOut';
import { useRouter } from 'next/router';
import DetailPage from '../DetailPage/DetailPage';

const { useGetPokemonByQuery } = pokeAPI;

export default function MainPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [tempQuery, setTempQuery] = useState('');
  const [apiQuery, setApiQuery] = useState('');
  const { data, isLoading } = useGetPokemonByQuery(apiQuery);
  const [apiData, setApiData] = useState<AllPokemons | Pokemon | undefined>();
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
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
    fetchPageData(currentPage);
    setApiData(data);
  }, [data, currentPage]);

  async function handleClick() {
    if (tempQuery) {
      setQuery(tempQuery);
      setApiQuery(tempQuery);
    } else {
      setQuery('');
      fetchPageData(currentPage);
    }
    setApiData(data);
    setCurrentPage(1);
    router.push(`/?page=1`, undefined, { shallow: true });
  }

  async function changePage(forward: boolean) {
    if (forward) {
      setCurrentPage(currentPage + 1);
      router.push(`/?page=${currentPage + 1}`, undefined, { shallow: true });
    } else {
      setCurrentPage(currentPage - 1);
      router.push(`/?page=${currentPage - 1}`, undefined, { shallow: true });
    }
  }

  const props: ButtonProps = {
    callback: () => handleClick(),
  };
  const inputProps: InputProps = {
    initialState: query,
    callback: (e: ChangeEvent) => {
      if (e?.target instanceof HTMLInputElement) updateState(e.target.value);
    },
  };

  function openDetail() {
    setDetailOpen(true);
  }
  function closeDetail() {
    setDetailOpen(false);
    router.push('/', undefined, { shallow: true });
  }

  return (
    <main className={darkTheme.darkTheme ? 'main dark' : 'main'}>
      <section className="buttons-container">
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
                  query={query || ''}
                  apiData={apiData}
                  openDetail={openDetail}
                />
                {detailOpen && <DetailPage closeDetail={closeDetail} />}
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
          <Flyout />
        </section>
      </ErrorBoundary>
    </main>
  );
}
