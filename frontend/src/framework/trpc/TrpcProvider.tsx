'use client';

import {QueryClient} from '@tanstack/react-query';
import {HTTPHeaders, httpBatchLink, loggerLink} from '@trpc/client';
import {FC, useMemo} from 'react';
import superjson from 'superjson';
import {env} from '@local/frontend/env';
import {identity, pickBy} from 'lodash';
import {trpcClient} from './client';

const makeTrpcClient = (headers?: HTTPHeaders) =>
  trpcClient.createClient({
    links: [
      loggerLink({
        enabled: () => env.NEXT_PUBLIC_APP_MODE === 'development',
      }),
      httpBatchLink({
        headers: pickBy(headers, identity), // <-- pickBy(_, identity) will remove all falsy values. It is needed as headers are serialized. e.g. undefined -> 'undefined'
        url: `${env.NEXT_PUBLIC_BACKEND_URL}/trpc`,
        transformer: superjson,
      }),
    ],
  });

export const TrpcProvider: FC<{
  children: React.ReactNode;
  queryClient: QueryClient;
  headers?: HTTPHeaders;
}> = ({children, queryClient, headers}) => {
  const client = useMemo(() => makeTrpcClient(headers), []);

  return (
    <trpcClient.Provider client={client} queryClient={queryClient}>
      {children}
    </trpcClient.Provider>
  );
};
