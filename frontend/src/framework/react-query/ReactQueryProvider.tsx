'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {FC, PropsWithChildren} from 'react';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {TrpcProvider} from '@local/frontend/framework/trpc/TrpcProvider';
import {useParams, useSearchParams} from 'next/navigation';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

const ReactQueryProvider: FC<PropsWithChildren> = ({children}) => {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  // injects ids for authentication into request headers
  const {groupPaymentId, checkoutId, multiCardId} =
    useParams<Record<string, string>>();
  const searchParams = useSearchParams();
  const merchantId = searchParams.get('mid') ?? undefined;

  return (
    <TrpcProvider
      queryClient={queryClient}
      headers={{merchantId, groupPaymentId, checkoutId, multiCardId}}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TrpcProvider>
  );
};

export default ReactQueryProvider;
