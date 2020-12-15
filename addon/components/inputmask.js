/* globals Inputmask */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { cached } from '@glimmer/tracking';
import { getOwner } from '@ember/application';

export default class InputmaskComponent extends Component {
  _setDefaults() {
    const config = getOwner(this).resolveRegistration('config:environment') || {};

    Inputmask.extendDefaults(config['ember-inputmask5'] ? config['ember-inputmask5']['defaults'] : {});
    Inputmask.extendDefinitions(config['ember-inputmask5'] ? config['ember-inputmask5']['definitions'] : {});
    Inputmask.extendAliases(config['ember-inputmask5'] ? config['ember-inputmask5']['aliases'] : {});
  }

  @cached
  get _options() {
    const options = {};

    Object.keys(this.args).forEach((option) => {
      const _option = this.args[option];

      if (typeof _option === 'object') {
        options[option] = Object.assign({}, _option);
      } else {
        options[option] = _option;
      }
    });

    return options;
  }

  @action
  _onInput() {
    if (this.args.update && typeof this.args.update === 'function') {
      this.args.update(this.element.inputmask.unmaskedvalue());
    }
  }

  @action
  _initialize(element) {
    this.element = element;

    this._setDefaults();
    this._setInputMask();
  }

  @action
  _update() {
    this._setInputMask();
  }

  @action
  _destroy() {
    if (this.element.inputmask) {
      this.element.inputmask.remove();
    }
  }

  _setInputMask() {
    new Inputmask(this._options).mask(this.element);
  }
}
