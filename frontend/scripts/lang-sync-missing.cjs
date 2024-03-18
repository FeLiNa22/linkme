'use strict';
const path = require('path');
const fs = require('fs');
const localeSync = require('i18next-locales-sync');

/**
 * This script will add any missing keys and .json files to other language directories
 * If and only if it exists/has been removed from the default locale.
 */

const args = require('yargs').argv;

const localesFolder = args['locale-dir'] || './src/locales';
const defaultLang = args['default-lang'] || 'en';

console.log('Using settings');
console.log('Locales folder: ', localesFolder);
console.log('Default locale: ', defaultLang);

const currentFolder = process.cwd();
const absoluteLocalesPath = path.join(currentFolder, localesFolder);

const secondaryLangs = fs
  .readdirSync(absoluteLocalesPath)
  .filter(function (file) {
    return fs.lstatSync(path.join(absoluteLocalesPath, file)).isDirectory();
  });

localeSync.syncLocales({
  localesFolder: absoluteLocalesPath,
  secondaryLanguages: secondaryLangs,
  useEmptyString: true,
  primaryLanguage: 'en',
});
