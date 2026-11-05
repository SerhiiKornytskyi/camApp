'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { useLogin } from '../hooks/use-auth';

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const [formError, setFormError] = useState<string | null>(null);
  const errorMessage =
    formError ?? (login.isError ? login.error.message : null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    if (typeof username !== 'string' || typeof password !== 'string') {
      setFormError('Enter your username and password.');
      return;
    }

    login.mutate(
      { username, password },
      { onSuccess: () => router.push('/liveView') }
    );
  }

  return (
    <section className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-center text-2xl font-semibold text-zinc-900">
        Log in
      </h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
        {errorMessage && (
          <p className="text-sm text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={login.isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {login.isPending ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </section>
  );
}
