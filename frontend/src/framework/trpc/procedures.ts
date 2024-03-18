import 'server-only';
import {TRPCError, initTRPC} from '@trpc/server';
import superjson from 'superjson';
import {AxiosError} from 'axios';
import {ZodError} from 'zod';
import {ContextReturnType} from './server-context';

export const trpc = initTRPC.context<ContextReturnType>().create({
  transformer: superjson,
  errorFormatter({shape, error}) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
        axiosError:
          error.cause instanceof AxiosError
            ? // can't include request in error or error response as it causes 'Converting circular structure to JSON error'
              {
                code: error.cause.code,
                message: error.cause.message,
                name: error.cause.name,
                stack: error.cause.stack,
                data: error.cause.response.data,
                status: error.cause.response.status,
              }
            : null,
      },
    };
  },
});

/**
 * Unprotected procedure
 */
export const publicProcedure = trpc.procedure;

const isAuthorized = trpc.middleware(async ({next, ctx}) => {
  if (!ctx.accessToken) {
    throw new TRPCError({code: 'UNAUTHORIZED'});
  }

  return next({
    ctx: {
      // Infers below as non-nullable
      accessToken: ctx.accessToken,
      client: ctx.client,
    },
  });
});

/**
 * Merchant protected procedure
 */
export const merchantProtectedProcedure = trpc.procedure.use(isAuthorized);
