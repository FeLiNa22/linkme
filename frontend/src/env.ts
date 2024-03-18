import {createEnv} from '@t3-oss/env-nextjs';
import type {Namespace} from 'i18next';
import {z} from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    MONGODB_URL: z.string(),
    MONGODB_USERNAME: z.string(),
    MONGODB_PASSWORD: z.string(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    FACEBOOK_CLIENT_ID: z.string().optional(),
    FACEBOOK_CLIENT_SECRET: z.string().optional(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
    NEXT_PUBLIC_APP_MODE: z.enum(['development', 'staging', 'production']),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_DEFAULT_LANGUAGE: z.string(),
    NEXT_PUBLIC_DEFAULT_NS: z.custom<Namespace>(),
    NEXT_PUBLIC_DEFAULT_COUNTRY: z.string(),
    NEXT_PUBLIC_HOST_URL: z.string(),
    NEXT_PUBLIC_BACKEND_URL: z.string(),
    NEXT_PUBLIC_LANGUAGE_DETECTION_NAME: z.string(),
    NEXT_PUBLIC_COUNTRY_DETECTION_NAME: z.string(),

    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '/api/auth',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    NEXT_PUBLIC_LANGUAGE_DETECTION_NAME:
      process.env.NEXT_PUBLIC_LANGUAGE_DETECTION_NAME ?? 'lang',
    NEXT_PUBLIC_COUNTRY_DETECTION_NAME:
      process.env.NEXT_PUBLIC_COUNTRY_DETECTION_NAME ?? 'country',
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL ?? 'info',
    NEXT_PUBLIC_APP_MODE: process.env.NEXT_PUBLIC_APP_MODE ?? 'development',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'Rstack',
    NEXT_PUBLIC_DEFAULT_LANGUAGE:
      process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en',
    NEXT_PUBLIC_DEFAULT_NS: process.env.NEXT_PUBLIC_DEFAULT_NS ?? 'common',
    NEXT_PUBLIC_DEFAULT_COUNTRY:
      process.env.NEXT_PUBLIC_DEFAULT_COUNTRY ?? 'gb',
    NEXT_PUBLIC_HOST_URL:
      process.env.NEXT_PUBLIC_HOST_URL ?? 'http://localhost:4000',
    NEXT_PUBLIC_BACKEND_URL:
      process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000/api',

    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
});
