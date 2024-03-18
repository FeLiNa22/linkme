'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import React, {FC, useMemo} from 'react';
import {
  I18nextProvider as Provider,
  initReactI18next,
  Trans,
} from 'react-i18next';
import {env} from '@local/frontend/env';

import {getOptions} from './settings';

const runsOnServerSide = typeof window === 'undefined';
const options = getOptions();
i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...options,
    lng: undefined, // detect the language on the client
    detection: {
      lookupCookie: env.NEXT_PUBLIC_LANGUAGE_DETECTION_NAME,
      caches: ['cookie'],
    },
    preload: runsOnServerSide ? options.supportedLngs : [],
  })
  .catch(console.error);

export const I18nProvider: FC<
  React.PropsWithChildren<{language: string | undefined}>
> = ({children, language}) => {
  useMemo(() => {
    i18next.changeLanguage(language).catch(console.error);
  }, []);
  return <Provider i18n={i18next}>{children}</Provider>;
};

export {Trans};
