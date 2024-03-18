import {Language, supportedLanguages} from './settings';

export const getSupportedLanguage = (
  language: string | null | undefined
): Language | undefined => supportedLanguages.find(l => language === l);
