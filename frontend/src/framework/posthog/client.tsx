'use client';

import {env} from '@local/frontend/env';
import dynamic from 'next/dynamic';
import posthog from 'posthog-js';
import {PostHogProvider as PHPProvider} from 'posthog-js/react';

if (env.NEXT_PUBLIC_POSTHOG_KEY && typeof window !== 'undefined') {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

const PostHogPageView = dynamic(() => import('./PostHogPageTracker'), {
  ssr: false,
});

export const PostHogProvider = ({children}: {children: React.ReactNode}) => (
  <PHPProvider client={posthog}>
    <PostHogPageView />
    {children}
  </PHPProvider>
);
