import './globals.css';
import { ReactNode } from 'react';

export const metadata ={
  title: 'My App',
  description : 'A sample CRUD Todo Next.js application',
  keywords: ['Next.js, React, Todo, CRUD, Application'],
  icons:{
    icon: '/favicon.ico',
  } 
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Fallback if metadata.icons is not used */}
        <link rel="icon" href="/my-app/public/favicon.ico" />
      </head>

      <body>
        <header >
          <h1>Next.js Todo App</h1>
        </header>
        <main>{children}</main>

        <footer>
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
        </body>
    </html>
  );
}