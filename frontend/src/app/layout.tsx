import './globals.css';
import {FC} from 'react';
import {dir} from 'i18next';
import WebVitals from '../components/WebVitals';
import {
  serverDetectLanguage,
  getServerTranslations,
} from '../framework/i18n/server';
import {I18nProvider} from '../framework/i18n/client';
import ReactQueryProvider from '../framework/react-query/ReactQueryProvider';
import JotaiProvider from '../framework/jotai/provider';
import CountryProvider from '../libs/country/CountryProvider';
import {getOptions} from '../libs/country/settings';
import {serverDetectCountry} from '../libs/country/server';
import {PostHogProvider} from '../framework/posthog/client';

export const generateMetadata = async () => {
  const {t} = await getServerTranslations();
  return {
    title: t('title'),
  };
};

const RootLayout: FC<React.PropsWithChildren> = async ({children}) => {
  const lng = await serverDetectLanguage();
  const country = await serverDetectCountry();

  return (
    <I18nProvider language={lng}>
      <html lang={lng} dir={dir(lng)}>
        <head>
          <meta charSet="utf-8" />
        </head>
        <body>
          <PostHogProvider>
            <JotaiProvider>
              <ReactQueryProvider>
                <WebVitals />
                <CountryProvider country={country} config={getOptions(country)}>
                  {children}
                </CountryProvider>
              </ReactQueryProvider>
            </JotaiProvider>
          </PostHogProvider>
        </body>
      </html>
    </I18nProvider>
  );
};

export default RootLayout;
