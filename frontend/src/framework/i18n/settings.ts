import {env} from '@local/frontend/env';
import {InitOptions, Namespace} from 'i18next';

// ========== MODIFIABLE ===========
export const supportedLanguages = [
  'en',
  'es',
  'fr',
  'nl',
  'de',
  'it',
  'pt',
] as const; // Don't remove 'as const' or you will loose all type safety
export const fallbackLng = env.NEXT_PUBLIC_DEFAULT_LANGUAGE as Language;
export const defaultNS = env.NEXT_PUBLIC_DEFAULT_NS;
// =================================

export type SupportedLanguages = typeof supportedLanguages;
export type Language = SupportedLanguages[number];

export function getOptions(
  lng = fallbackLng,
  ns: Namespace = defaultNS
): InitOptions {
  return {
    debug: env.NEXT_PUBLIC_LOG_LEVEL === 'debug',
    supportedLngs: supportedLanguages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
