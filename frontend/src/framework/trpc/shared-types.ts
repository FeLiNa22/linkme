import {trpcClient} from './client';
import {getTrpcUtils} from './server';

export type TrpcUtils =
  | ReturnType<typeof trpcClient.useUtils>
  | Awaited<ReturnType<typeof getTrpcUtils>>;
