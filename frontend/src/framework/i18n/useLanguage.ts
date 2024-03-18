'use client';

import {useTranslation} from 'react-i18next';
import {useRouter} from 'next/navigation';
import i18next from 'i18next';
import {Language} from './settings';

export const useLanguage = (): {
  language: Language;
  changeLanguage: (language: Language) => void;
} => {
  const router = useRouter();
  const {i18n} = useTranslation();

  const changeLanguageMutation = (language: string) => {
    i18next.changeLanguage(language).catch(console.error);
    router.refresh();
  };

  return {
    changeLanguage: changeLanguageMutation,
    language: i18n.resolvedLanguage as Language,
  };
};
