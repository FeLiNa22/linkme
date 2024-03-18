const defaultPrettier = require('@handsin/eslint-config/.prettierrc.json');
module.exports = {
  ...defaultPrettier,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  endOfLine: 'auto',
  plugin: ['prettier-plugin-tailwindcss'],
};
