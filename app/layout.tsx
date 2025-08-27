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

      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold">Next.js Todo App</h1>
        </header>
        <main>{children}</main>

        <footer className="bg-gray-200 text-gray-700 p-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </footer>
        </body>
    </html>
  );
}