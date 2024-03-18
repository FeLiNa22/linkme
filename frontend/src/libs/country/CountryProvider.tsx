'use client';

import {countryAtom} from '@local/frontend/framework/jotai/atoms/country.atom';
import {FC, PropsWithChildren, useMemo} from 'react';
import JotaiProvider from '@local/frontend/framework/jotai/provider';
import {JotaiAtomsHydrator} from '@local/frontend/framework/jotai/client';
import {useAtomValue} from 'jotai';
import Cookies from 'js-cookie';
import {browserDetectCountry} from './client';
import {Settings, defaultLookupName} from './settings';

interface CountryListenersProps {
  config: Settings;
}

const CountryListeners: FC<PropsWithChildren<CountryListenersProps>> = ({
  config,
  children,
}) => {
  const country = useAtomValue(countryAtom);

  useMemo(() => {
    // on country change
    if (country) {
      if (config.detection?.cache?.cookies === true) {
        if (
          Cookies.get(
            config.detection?.lookupCookieName ?? defaultLookupName
          ) !== country
        ) {
          Cookies.set(
            config.detection?.lookupCookieName ?? defaultLookupName,
            country
          );
        }
      }
      if (config.detection?.cache?.localStorage === true) {
        if (typeof window !== 'undefined' && window.localStorage) {
          if (
            window.localStorage.getItem(
              config.detection?.lookupLocalStorageName ?? defaultLookupName
            ) !== country
          ) {
            window.localStorage.setItem(
              config.detection?.lookupLocalStorageName ?? defaultLookupName,
              country
            );
          }
        }
      }
    }
  }, [country]);

  return children;
};

export interface CountryProviderProps {
  country?: string | undefined;
  config: Settings;
}

const CountryProvider: FC<PropsWithChildren<CountryProviderProps>> = ({
  country: initCountry,
  config,
  children,
}) => {
  const country = useMemo(() => browserDetectCountry(initCountry, config), []);

  return (
    <JotaiProvider>
      <JotaiAtomsHydrator
        atomValues={[[countryAtom, country ?? config.fallbackCountry]]}
      >
        <CountryListeners config={config}>{children}</CountryListeners>
      </JotaiAtomsHydrator>
    </JotaiProvider>
  );
};

export default CountryProvider;
