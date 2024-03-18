/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from '@trpc/server/adapters/fetch';
import {createContext as createTRPCContext} from '@local/frontend/framework/trpc/server-context';
import {appRouter} from '../../../../framework/trpc/app-router';

const handler = (request: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: (_opts: FetchCreateContextFnOptions) => createTRPCContext(),
  });

export {handler as GET, handler as POST};
