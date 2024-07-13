import { ChangeEvent, useEffect, useState } from 'react';
import Input, { InputProps } from './Input';
import SearchButton, { ButtonProps } from './SearchButton';
import fetchData, { defaultURL } from '../utils/api';
import CardsContainer from './CardsContainer';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from './ErrorButton';
import useLocalStorage from '../utils/localStorage';
import PaginationButton from './PaginationButton';

export type ApiData = {
  query?: string;
  results?: [];
  next?: string;
  previous?: string;
};
export default function Page() {
  const { query, setQuery } = useLocalStorage('pokemonQuery', '');
  const [tempQuery, setTempQuery] = useState('');
  const [apiData, setApiData] = useState<ApiData>({});
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  function updateState(searchString: string) {
    setTempQuery(searchString);
  }

  async function fetchAPIData() {
    setLoading(true);
    const data: unknown = await fetchData();
    if (data) setApiData(data);
    setLoading(false);
  }

  useEffect(() => {
    async function onMount() {
      if (query) {
        const data = await fetchData(defaultURL + query);
        setApiData(data);
        setLoading(false);
      } else {
        fetchAPIData();
      }
    }
    onMount();
  }, [query]);

  async function handleClick() {
    setLoading(true);
    if (tempQuery) {
      setQuery(tempQuery);
      const data = await fetchData(defaultURL + tempQuery);
      setApiData(data);
    } else {
      setQuery('');
      fetchAPIData();
    }
    setLoading(false);
  }

  async function changePage(forward: boolean) {
    console.log(apiData);
    if (forward) {
      setCurrentPage(currentPage + 1);
      const data = await fetchData(apiData.next);
      setApiData(data);
    } else {
      setCurrentPage(currentPage - 1);
      const data = await fetchData(apiData.previous);
      setApiData(data);
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
