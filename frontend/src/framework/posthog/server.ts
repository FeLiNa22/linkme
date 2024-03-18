import 'server-only';
import {PostHog} from 'posthog-node';
import {env} from '@local/frontend/env';

export default function PostHogClient(): PostHog | undefined {
  if (!env.NEXT_PUBLIC_POSTHOG_KEY) {
    return undefined;
  }
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}
