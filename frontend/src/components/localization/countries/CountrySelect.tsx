import {CountryName} from '@local/frontend/libs/country/CountryName';
import {supportedCountries} from '@local/frontend/libs/country/settings';
import React, {FC, Ref} from 'react';

export type CountrySelectProps = {
  value?: string; // countryCode
  defaultValue?: string; // countryCode
  onChange: (countryCode: string) => void;
};

const CountrySelect: FC<React.PropsWithChildren<CountrySelectProps>> =
  React.forwardRef(
    ({value, defaultValue, onChange}, ref: Ref<HTMLLabelElement>) => (
      <label
        ref={ref}
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        <select
          defaultValue={defaultValue}
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {supportedCountries.map(country => (
            <option key={country} value={country}>
              {CountryName[country]}
            </option>
          ))}
        </select>
      </label>
    )
  );

CountrySelect.displayName = 'CountrySelect';

export default CountrySelect;
