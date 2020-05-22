'use strict';

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included.apply(this, arguments);

    // InputMask JS
    app.import('node_modules/inputmask/dist/inputmask.js');
  },
};
