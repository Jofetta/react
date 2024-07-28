import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <h1>404</h1>
      <p>The page is not found</p>
      <Link to="/">Go to home page</Link>
    </>
  );
}
