import {Country, supportedCountries} from './settings';

export const getSupportedCountry = (
  country: string | null | undefined
): Country | undefined => supportedCountries.find(c => c === country);
