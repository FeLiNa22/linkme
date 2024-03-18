import 'server-only';
import {cookies as getCookies, headers as getHeaders} from 'next/headers';
import {env} from '@local/frontend/env';
import {getSupportedCountry} from './shared';
import {Country} from './settings';

// Detects the country to use. Note that each detection is in precedence order
export async function serverDetectCountry(
  initCountry?: string
): Promise<Country | undefined> {
  const cookies = getCookies();
  const headers = getHeaders();

  let country: string | null | undefined;

  // 1. initCountry detection
  if (!country && initCountry) {
    country = initCountry;
  }

  // 2. middleware detection
  if (!country && headers.has(env.NEXT_PUBLIC_COUNTRY_DETECTION_NAME)) {
    country = headers.get(env.NEXT_PUBLIC_COUNTRY_DETECTION_NAME);
  }

  // 3. cookie detection
  if (!country && cookies.has(env.NEXT_PUBLIC_COUNTRY_DETECTION_NAME)) {
    country = cookies.get(env.NEXT_PUBLIC_COUNTRY_DETECTION_NAME)?.value;
  }

  // 4. ip based detection
  if (!country && headers.has('X-Forwarded-For')) {
    const ip = headers.get('X-Forwarded-For');
    const res = await fetch(`http://ip-api.com/json/${ip}`, {method: 'GET'});
    if (res.ok) {
      const json = (await res.json()) as {countryCode: string | undefined};
      country = json.countryCode;
    }
  }

  return getSupportedCountry(country);
}
