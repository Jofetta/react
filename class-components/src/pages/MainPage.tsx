import { ChangeEvent, useEffect, useState } from 'react';
import Input, { InputProps } from '../components/Input';
import SearchButton, { ButtonProps } from '../components/SearchButton';
import fetchData, { defaultURL } from '../utils/api';
import CardsContainer from '../components/CardsContainer';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorButton from '../components/ErrorButton';
import useLocalStorage from '../utils/localStorage';
import PaginationButton from '../components/PaginationButton';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

export type ApiData = {
  query?: string;
  results?: [];
  next?: string;
  previous?: string;
};
export default function MainPage() {
  const { query, setQuery } = useLocalStorage('pokemonQuery', '');
  const [tempQuery, setTempQuery] = useState('');
  const [apiData, setApiData] = useState<ApiData>({});
  const [isLoading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const navigate = useNavigate();

  function updateState(searchString: string) {
    setTempQuery(searchString);
  }

  // async function fetchAPIData() {
  //   setLoading(true);
  //   const data: unknown = await fetchData();
  //   if (data) setApiData(data);
  //   setLoading(false);
  // }

  async function fetchPageData(page: number) {
    setLoading(true);
    const pokemonLimit = 20;
    const offset = (page - 1) * pokemonLimit;
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pokemonLimit}`;
    const data = await fetchData(url);
    if (data) setApiData(data);
    setLoading(false);
  }

  useEffect(() => {
    async function onMount() {
      const searchString = searchParams.get('search');
      if (searchString) {
        setQuery(searchString);
        setTempQuery(searchString);
        const data = await fetchData(defaultURL + searchString);
        setApiData(data);
        setLoading(false);
      } else if (searchParams.get('page')) {
        fetchPageData(currentPage);
      } else if (query) {
        const data = await fetchData(defaultURL + query);
        setApiData(data);
        setLoading(false);
      } else {
        fetchPageData(1);
      }
    }
    onMount();
  }, [query, currentPage, searchParams, setQuery]);

  async function handleClick() {
    setLoading(true);
    if (tempQuery) {
      setSearchParams({ search: tempQuery });
      setQuery(tempQuery);
      const data = await fetchData(defaultURL + tempQuery);
      setApiData(data);
    } else {
      setSearchParams({ page: '1', search: '' });
      setQuery('');
      fetchPageData(currentPage);
      navigate('/');
    }
    setCurrentPage(1);
    setLoading(false);
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
    <main>
      <section>
        <Input {...inputProps} />
        <SearchButton {...props} />
        <ErrorButton />
      </section>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <section>
          {apiData && (
            <div>
              <CardsContainer
                key={`key_${isLoading}_${query}`}
                isLoading={isLoading}
                query={query ? query : ''}
                apiData={apiData}
              />
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
            </div>
          )}
          {apiData === undefined && <div>No results</div>}
        </section>
      </ErrorBoundary>
    </main>
  );
}
