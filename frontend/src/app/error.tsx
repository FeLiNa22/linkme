'use client';

import React, {FC, useEffect} from 'react';
import {useTranslation} from 'react-i18next';

interface ErrorPageProps {
  error: Error & {digest?: string};
  reset: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({error, reset}) => {
  const {t} = useTranslation(['common']);

  useEffect(() => {
    // Log the error to an error reporting service
    console.debug(error);
  }, [error]);

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>{t('title')}</h1>
      <h4 color="red">{error?.message}</h4>
      <button className="btn btn-error" type="button" onClick={() => reset()}>
        {t('try-again')}
      </button>
    </div>
  );
};

export default ErrorPage;
