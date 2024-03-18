import {Country, fallbackCountry} from '@local/frontend/libs/country/settings';
import {atom} from 'jotai';

export const countryAtom = atom<Country>(fallbackCountry);
