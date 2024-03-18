import {z} from 'zod';
import {TRPCError} from '@trpc/server';
import {merchantProtectedProcedure, trpc} from '../procedures';

export const helloRouter = trpc.router({
  get: merchantProtectedProcedure
    .input(
      z
        .object({
          referenceId: z.string(),
          customerId: z.string(),
        })
        .optional()
    )
    .query(async ({input}) => {
      if (!input) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Input is empty',
        });
      }

      return 'hello world!';
    }),

  create: merchantProtectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({input}) => ({
      message: 'created hello world!',
      name: input.name,
    })),
});
