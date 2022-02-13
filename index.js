'use strict';

module.exports = {
  name: require('./package').name,
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

  included(app) {
    this._super.included.apply(this, arguments);

    // InputMask JS
    app.import('node_modules/inputmask/dist/inputmask.js');
  },
};
