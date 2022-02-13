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
    this._setInputMask();
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

  _setInputMask() {
    new Inputmask(this.getArgs()).mask(this.element);
  }
}
