'use client';

import {countryAtom} from '@local/frontend/framework/jotai/atoms/country.atom';
import {useAtom} from 'jotai';
import {Country} from './settings';

export const useCountry = (): {
  country: Country;
  changeCountry: (country: Country) => void;
} => {
  const [country, setCountry] = useAtom(countryAtom);

  return {country, changeCountry: setCountry};
};
