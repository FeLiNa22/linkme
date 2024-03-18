import 'server-only';
import {User} from 'next-auth';
import {NextApiRequest, NextApiResponse} from 'next';
import {auth} from '../next-auth/server';

export interface ContextReturnType {
  user?: User;
}

export const createContext = async (opts?: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<ContextReturnType> => {
  let session;
  if (opts) {
    session = await auth(opts.req, opts.res);
  } else {
    session = await auth();
  }

  return {
    user: session?.user,
  };
};
