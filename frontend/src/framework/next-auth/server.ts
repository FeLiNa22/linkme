import 'server-only';
import NextAuth from 'next-auth';
import {PrismaAdapter} from '@auth/prisma-adapter';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import {env} from '@local/frontend/env';
import {prismaClient} from '@local/frontend/framework/prisma/server';

export const {
  handlers: {GET, POST},
  auth,
} = NextAuth({
  basePath: env.NEXTAUTH_URL,
  secret: env.NEXTAUTH_SECRET,
  debug: env.NEXT_PUBLIC_LOG_LEVEL === 'debug',
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GitHub,
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
});
