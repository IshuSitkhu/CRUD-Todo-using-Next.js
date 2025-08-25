// app/(dashboard)/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard - Next Todo App',
  description: 'Dashboard to manage your todos',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', padding: '1rem' }}>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/todos" className="hover:text-blue-600">
                Todos
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-blue-600">
                Profile
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-blue-600">
                Settings
              </Link>
            </li>
            <li>
              <Link href="/logout" className="hover:text-blue-600">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}
