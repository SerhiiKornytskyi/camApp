'use client';

import { LoginForm } from '../components/loginForm';
import { useAuth } from '../hooks/use-auth';

export default function LiveViewPage() {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-12">
        <p role="status">Checking your login…</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-12">
        <LoginForm />
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900">Live view</h1>
      <p className="mt-2 text-zinc-600">Signed in as {user?.username}</p>
    </main>
  );
}
