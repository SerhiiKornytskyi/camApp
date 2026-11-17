'use client';

import { LoginForm } from '../components/loginForm';
import Loading from '../components/loading';
import { useAuth } from '../hooks/use-auth';
import useTriggerQuery from '../hooks/use-trigger';
import useCaptureListQuery from '../hooks/use-captureList';

import LiveViewComponent from '../components/liveViewComponent';
import CaptureList from "../components/captureList";
import { Suspense } from 'react'

export default function LiveViewPage() {
  // use auth hook
  const { isLoggedIn, isLoading, user } = useAuth();
  // use useTriggerQuery hook
  const {
    data: triggerData,
    isLoading: isTriggerLoading,
    isError: isTriggerError,
    error: triggerError,
  } = useTriggerQuery();

  // use useCaptureListQuery
  const {
    data: captureListData,
    isLoading: isCaptureListLoading,
    isError: isCaptureListError,
    error: captureListError,
  } = useCaptureListQuery();
  

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
      <section
        className="mt-6 w-full max-w-sm  max-w-md  max-w-xl rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
        aria-live="polite"
      >
        <h2 className="text-lg font-medium text-zinc-900">Trigger status</h2>
        {isTriggerLoading ? (
          <p className="mt-2 text-zinc-600" role="status">
            Loading trigger status…
          </p>
        ) : isTriggerError ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {triggerError.message}
          </p>
        ) : (
          <>
            <p className="mt-2 text-zinc-600">{triggerData?.message}</p>
            <p className="mt-1 text-3xl font-semibold text-zinc-900">
              {triggerData?.count ?? 0}
            </p>
            <p className="text-sm text-zinc-500">times triggered</p>
          </>
        )}
      </section>
      <section
        className="mt-6 w-full max-w-sm  max-w-md  max-w-xl rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
        aria-live="polite"
      >
        <h2 className="text-lg font-medium text-zinc-900">Live view</h2>
         <Suspense fallback={<Loading />}>
          <LiveViewComponent path={'/api/video'} />
        </Suspense>
      </section>
      <section
        className="mt-6 w-screen max-w-none rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
        aria-live="polite"
      >
        {isCaptureListLoading ? (
          <p className="mt-2 text-zinc-600" role="status">
            Loading captures list…
          </p>
        ) : isCaptureListError ? (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {captureListError.message}
          </p>
        ) : (
          <>
            <h2 className="text-lg font-medium text-zinc-900">Captured list</h2>
              <Suspense fallback={<Loading />}>
                {captureListData && <CaptureList captures={captureListData} />}
              </Suspense>
          </>
        )}
      </section>
    </main>
  );
}
