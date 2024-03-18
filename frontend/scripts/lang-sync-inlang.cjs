'use strict';

const path = require('path');
const fs = require('fs');
const lodash = require('lodash');

const args = require('yargs').argv;

const settingsFile = args.inlang || './project.inlang/settings.json';
const localesFolder = args['locale-dir'] || './src/locales';
const defaultNS = args['default-ns'] || 'en';

console.log('Using settings');
console.log('Inlang file: ', settingsFile);
console.log('Locales folder: ', localesFolder);
console.log('Default locale: ', defaultNS);

/**
 * This script is specifically for inlang to support automatically syncing new namespaces.
 * It is necessary for linting missing translations
 */

const currentFolder = process.cwd();

const absoluteLocalesPath = path.join(currentFolder, localesFolder);
const secondaryLangs = fs
  .readdirSync(absoluteLocalesPath)
  .filter(function (file) {
    return fs.lstatSync(path.join(absoluteLocalesPath, file)).isDirectory();
  });

const languagePaths = fs
  .readdirSync(path.join(currentFolder, localesFolder, defaultNS))
  .reduce(function (pathObj, file) {
    const fileData = path.parse(file);
    if (fileData.ext === '.json') {
      pathObj[fileData.name] = [localesFolder, '{languageTag}', file].join('/');
    }
    return pathObj;
  }, {});

const langSettings = require(path.join(currentFolder, settingsFile));
if (
  lodash.isEqual(
    languagePaths,
    langSettings['plugin.inlang.i18next']['pathPattern']
  )
) {
  console.log('Inlang namespaces unchanged');
} else {
  langSettings['plugin.inlang.i18next']['pathPattern'] = languagePaths;
  langSettings['languageTags'] = secondaryLangs;
  fs.writeFileSync(
    path.join(currentFolder, settingsFile),
    JSON.stringify(langSettings, null, 2)
  );

  console.log('Updated inlang namespaces');
}
