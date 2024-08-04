import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main>
      <h1>404</h1>
      <p>The page is not found</p>
      <Link href="/"> Go to Home Page </Link>
    </main>
  );
}
