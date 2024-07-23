import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

export default function NotFoundPage() {
  const darkTheme = useContext(ThemeContext);
  return (
    <main className={darkTheme.darkTheme ? 'main dark' : 'main'}>
      <h1>404</h1>
      <p>The page is not found</p>
      <Link to="/">Go to home page</Link>
    </main>
  );
}
