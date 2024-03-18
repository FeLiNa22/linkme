import 'server-only';
import dayjs from 'dayjs';
import {cache} from 'react';
import {getServerTranslations} from '../../framework/i18n/server';
import {setup} from './shared';

export const getServerTime = cache(async () => {
  const {i18n} = await getServerTranslations();
  setup(dayjs, i18n);

  return {time: dayjs};
});
