/* globals Inputmask */
import Modifier from 'ember-modifier';
import { getOwner } from '@ember/application';

export default class InputmaskModifier extends Modifier {
  getArgs() {
    return Object.keys(this.args.named).length
      ? this.args.named
      : this.args.positional[0] || {};
  }

  didUpdateArguments() {
    this._setInputMask();
  }

  didInstall() {
    import('inputmask/dist/inputmask').then(() => {
      this._initialize();
    });
  }

  willRemove() {
    if (this.element.inputmask) {
      this.element.inputmask.remove();
    }
  }

  _initialize() {
    this._setDefaults();

    const args = this.getArgs();

    this._setInputMask(args);

    if (args.registerAPI && typeof args.registerAPI === 'function') {
      args.registerAPI(this.element);
    }
  }

  _setDefaults() {
    const config =
      getOwner(this).resolveRegistration('config:environment') || {};

    Inputmask.extendDefaults(
      config['ember-inputmask5'] ? config['ember-inputmask5']['defaults'] : {}
    );
    Inputmask.extendDefinitions(
      config['ember-inputmask5']
        ? config['ember-inputmask5']['definitions']
        : {}
    );
    Inputmask.extendAliases(
      config['ember-inputmask5'] ? config['ember-inputmask5']['aliases'] : {}
    );
  }

  _setInputMask(args) {
    new Inputmask(args).mask(this.element);
  }
}
