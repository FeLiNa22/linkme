'use client';

import Cookies from 'js-cookie';
import {Settings, defaultLookupName} from './settings';
import {getSupportedCountry} from './shared';

export const browserDetectCountry = (
  initCountry: string | undefined,
  config: Settings
): string | undefined => {
  let country: string | null | undefined;

  // init detect
  if (!country && initCountry) {
    country = initCountry;
  }

  // cookie detect
  const cookieCountry = Cookies.get(
    config.detection?.lookupCookieName ?? defaultLookupName
  );
  if (!country && cookieCountry) {
    country = cookieCountry;
  }

  // local storage detect
  if (typeof window !== 'undefined' && window.localStorage) {
    const localCountry = window.localStorage.getItem(
      config.detection?.lookupLocalStorageName ?? defaultLookupName
    );
    if (!country && localCountry) {
      country = localCountry;
    }
  }

  return getSupportedCountry(country);
};
