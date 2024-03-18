'use client';

import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {dir} from 'i18next';
import {I18nProvider} from '../framework/i18n/client';

const GlobalError: FC<
  React.PropsWithChildren<{
    error: Error & {digest?: string};
    reset: () => void;
  }>
> = ({error, reset}) => {
  const {t, i18n} = useTranslation(['common']);
  const lng = i18n.language;

  return (
    <I18nProvider language={lng}>
      <html lang={lng} dir={dir(lng)}>
        <body>
          <h2>{error.digest ?? t('something-went-wrong')}</h2>
          <button
            className="btn btn-error"
            type="button"
            onClick={() => reset()}
          >
            {t('try-again')}
          </button>
        </body>
      </html>
    </I18nProvider>
  );
};

export default GlobalError;
