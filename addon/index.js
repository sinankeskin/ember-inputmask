'use strict';

module.exports = {
  name: require('./package.json').name,
  options: {
    autoImport: {
      alias: {
        'inputmask/dist/inputmask': 'inputmask/dist/inputmask',
      },
    },
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },
};
