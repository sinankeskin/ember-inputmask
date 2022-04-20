/* globals Inputmask */
import Modifier from 'ember-modifier';
import { getOwner } from '@ember/application';
import InputMask from "inputmask";
import { registerDestructor } from '@ember/destroyable';

let setDefaults = undefined;

export default class InputmaskModifier extends Modifier {
  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, this.cleanup);
  }

  cleanup = () => {
    if (this.element.inputmask) {
      this.element.inputmask.remove();
    }
  }

  getArgs(positional, named) {
    return Object.keys(named).length
      ? named
      : positional[0] || {};
  }

  element;

  modify(element, positional, named) {
    if (!setDefaults) {
      this._setDefaults();
      this.setDefaults = true;
    }

    this.element = element;

    const args = this.getArgs(positional, named);

    new InputMask(args).mask(element);

    if (args.registerAPI && typeof args.registerAPI === 'function') {
      args.registerAPI({
        get inputmask() {
          return element.inputmask;
        }
      });
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

  _setInputMask(element, args) {
    return new InputMask(args).mask(element);
  }
}
