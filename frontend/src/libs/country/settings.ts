import {env} from '@local/frontend/env';
import {CountryName} from './CountryName';

// ========== MODIFIABLE ===========
export const fallbackCountry = env.NEXT_PUBLIC_DEFAULT_COUNTRY as Country;
export const defaultLookupName = 'country';
export const supportedCountries = Object.keys(CountryName) as Country[];
// =================================

export type Countries = typeof CountryName;
export type Country = keyof Countries;

export const getOptions = (country = fallbackCountry): Settings => ({
  fallbackCountry,
  country,
  supportedCountries,
  detection: {
    cache: {
      cookies: true,
    },
    lookupCookieName: env.NEXT_PUBLIC_COUNTRY_DETECTION_NAME,
  },
});

export interface Settings {
  fallbackCountry: string;
  country?: string;
  supportedCountries?: string[];
  detection?: {
    cache?: {
      cookies?: boolean;
      localStorage?: boolean;
    };
    lookupCookieName?: string;
    lookupLocalStorageName?: string;
  };
}
