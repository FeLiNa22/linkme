import 'server-only';
import acceptLanguage from 'accept-language';
import {DefaultNamespace, KeyPrefix, Namespace, createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {cookies as getCookies, headers as getHeaders} from 'next/headers';
import {cache} from 'react';
import {initReactI18next} from 'react-i18next/initReactI18next';
import {env} from '@local/frontend/env';
import {Language, defaultNS, getOptions, supportedLanguages} from './settings';
import {getSupportedLanguage} from './shared';

const initServerI18next = async (
  language: Language | undefined,
  ns: Namespace
) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (newLanguage: string, newNS: string) =>
          import(`../../locales/${newLanguage}/${newNS}.json`)
      )
    )
    .init(getOptions(language, ns));
  return i18nInstance;
};

acceptLanguage.languages(Array.from(supportedLanguages));

// Detects the language to use. Note that each detection is in precedence order
export async function serverDetectLanguage(
  initLang?: string
): Promise<Language | undefined> {
  const cookies = getCookies();
  const headers = getHeaders();
  let language;

  // 1. initLang detection
  if (!language && initLang) {
    language = initLang;
  }

  // 2. middleware detection
  if (!language && headers.has(env.NEXT_PUBLIC_LANGUAGE_DETECTION_NAME)) {
    language = headers.get(env.NEXT_PUBLIC_LANGUAGE_DETECTION_NAME);
  }

  // 3. cookie detection
  if (!language && cookies.has(env.NEXT_PUBLIC_LANGUAGE_DETECTION_NAME)) {
    language = cookies.get(env.NEXT_PUBLIC_LANGUAGE_DETECTION_NAME)?.value;
  }

  // 4. headers detection
  if (!language && headers.has('Accept-Language')) {
    language = headers.get('Accept-Language');
  }

  return getSupportedLanguage(acceptLanguage.get(language));
}

export const getServerTranslations = cache(
  async <
    Ns extends Namespace | null = DefaultNamespace,
    TKPrefix extends KeyPrefix<ActualNs> = undefined,
    ActualNs extends Namespace = Ns extends null ? DefaultNamespace : Ns,
  >(
    ns: Namespace = defaultNS,
    options: {keyPrefix?: TKPrefix} = {}
  ) => {
    const language = await serverDetectLanguage();
    const i18nextInstance = await initServerI18next(language, ns);
    return {
      t: i18nextInstance.getFixedT(language ?? null, ns, options.keyPrefix),
      i18n: i18nextInstance,
    };
  }
);
