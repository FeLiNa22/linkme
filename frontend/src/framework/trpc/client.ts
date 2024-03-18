'use client';

import {
  TRPCClientErrorLike,
  createTRPCReact,
  type inferReactQueryProcedureOptions,
} from '@trpc/react-query';
import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server';
import type {AppRouter} from './app-router';

export type TrpcError = TRPCClientErrorLike<AppRouter>;
export type TrpcOptions = inferReactQueryProcedureOptions<AppRouter>;
export type TrpcInputs = inferRouterInputs<AppRouter>;
export type TrpcOutputs = inferRouterOutputs<AppRouter>;

export const trpcClient = createTRPCReact<AppRouter>();
