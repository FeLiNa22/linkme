'use server';

import 'server-only';
import {QueryClient} from '@tanstack/react-query';
import {createServerSideHelpers} from '@trpc/react-query/server';
import superjson from 'superjson';
import {ResponseCookies} from 'next/dist/compiled/@edge-runtime/cookies';
import {appRouter} from './app-router';
import {ContextOptions, createContext} from './server-context';

export const getTrpcUtils = async (
  queryClient: QueryClient,
  opts: ContextOptions | undefined,
  cookies?: ResponseCookies
) =>
  createServerSideHelpers({
    queryClient,
    router: appRouter,
    ctx: await createContext(opts, cookies),
    transformer: superjson, // optional - adds superjson serialization
  });
