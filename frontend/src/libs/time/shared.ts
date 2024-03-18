import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {i18n as I18nType} from 'i18next';

export const setup = (dayjs: typeof import('dayjs'), i18n: I18nType): void => {
  // Listen for language changes and update Day.js locale
  i18n.on('languageChanged', lng => {
    import(`dayjs/locale/${lng}`)
      .then(() => {
        dayjs.locale(lng);
      })
      .catch(console.error);
  });

  dayjs.extend(LocalizedFormat);
  dayjs.extend(utc);
  dayjs.extend(timezone);
};

export type Time = typeof import('dayjs');
