import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to My App</h1>
      <p>This is the home page of my Next.js application.</p>
      <Link href="/about">Go to About Page</Link>
    </main>
  );
}