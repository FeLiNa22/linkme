import {trpc} from './procedures';

import {helloRouter} from './routers/hello.trpc';

export const appRouter = trpc.router({
  hello: helloRouter,
});

export type AppRouter = typeof appRouter;
