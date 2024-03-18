import React, {FC} from 'react';
import {getServerTranslations} from '../framework/i18n/server';

const NotFoundPage: FC<React.PropsWithChildren<unknown>> = async () => {
  const {t} = await getServerTranslations(['common']);

  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>{t('title')}</h1>
    </div>
  );
};

export default NotFoundPage;
