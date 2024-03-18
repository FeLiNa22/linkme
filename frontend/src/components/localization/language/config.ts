import {Language} from '@local/frontend/framework/i18n/settings';

export const config: {
  [key in Language]: {
    locale: key;
    displayName: string;
    countryCode: string;
  };
} = {
  en: {
    locale: 'en',
    displayName: 'English',
    countryCode: 'gb',
  },
  fr: {
    locale: 'fr',
    displayName: 'Français',
    countryCode: 'fr',
  },
  es: {
    locale: 'es',
    displayName: 'Español',
    countryCode: 'es',
  },
  de: {
    locale: 'de',
    displayName: 'Deutsch',
    countryCode: 'de',
  },
  nl: {
    locale: 'nl',
    displayName: 'Nederlands',
    countryCode: 'nl',
  },
  it: {
    locale: 'it',
    displayName: 'Italiano',
    countryCode: 'it',
  },
  pt: {
    locale: 'pt',
    displayName: 'Português',
    countryCode: 'pt',
  },
};
