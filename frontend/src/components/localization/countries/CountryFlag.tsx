import React, {FC} from 'react';

interface CountryFlagProps {
  /**
   * ISO 3166-1 alpha-2 country code
   */
  variant?: 'rounded' | 'corner';
  country: string;
  width?: string;
  height?: string;
}

const CountryFlag: FC<React.PropsWithChildren<CountryFlagProps>> = ({
  variant = 'rounded',
  country,
  width,
  height,
}) => (
  <img
    loading="lazy"
    style={{
      aspectRatio: 'initial',
      borderRadius: variant === 'rounded' ? 2 : 0,
    }}
    width={width ?? '20px'}
    height={height}
    src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
    alt={`Flag ${country.toUpperCase()}`}
  />
);

export default CountryFlag;
