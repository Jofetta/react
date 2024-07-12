import { ChangeEvent, useEffect, useState } from 'react';
import Input, { InputProps } from './Input';
import SearchButton, { ButtonProps } from './SearchButton';
import fetchData, { defaultURL, setLocalStorage } from './../utils';
import CardsContainer from './CardsContainer';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from './ErrorButton';

export type ApiData = {
  query?: string;
  results?: [];
};
export default function Page() {
  const [query, setQuery] = useState('');
  const [tempQuery, setTempQuery] = useState('');
  const [apiData, setApiData] = useState({});
  const [isLoading, setLoading] = useState(true);

  function updateState(searchString: string) {
    setTempQuery(searchString);
  }

  async function fetchAPIData() {
    setLoading(true);
    const data: unknown = await fetchData();
    if (data) setApiData(data);
    setQuery('');
    setLoading(false);
  }

  useEffect(() => {
    async function onMount() {
      const storedQuery = localStorage.getItem('pokemonQuery');
      if (storedQuery) {
        setQuery(storedQuery);
        setTempQuery(storedQuery);
        const data = await fetchData(defaultURL + storedQuery);
        setApiData(data);
        setLoading(false);
      } else {
        fetchAPIData();
      }
    }
    onMount();
  }, []);

  async function handleClick() {
    setLoading(true);
    if (tempQuery) {
      setQuery('');
      setQuery(tempQuery);
      setLocalStorage(tempQuery);
      const data = await fetchData(defaultURL + tempQuery);
      setApiData(data);
    } else {
      setLocalStorage('');
      fetchAPIData();
    }
    setLoading(false);
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
            <CardsContainer
              key={`key_${isLoading}_${query}`}
              isLoading={isLoading}
              query={query ? query : ''}
              apiData={apiData}
            />
          )}
          {apiData === undefined && <div>No results</div>}
        </section>
      </ErrorBoundary>
    </main>
  );
}
