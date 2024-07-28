import { useEffect, useState } from 'react';

function getSavedString(key: string, initialValue: string) {
  const savedString = localStorage.getItem(key);
  if (savedString) return savedString;

  return initialValue;
}

export default function useLocalStorage(key: string, initialValue: string) {
  const [query, setQuery] = useState(() => {
    return getSavedString(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, query);
  }, [key, query]);

  return { query, setQuery };
}
