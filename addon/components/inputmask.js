/* globals Inputmask */
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import Component from '@glimmer/component';

export default class InputmaskComponent extends Component {
  _setDefaults() {
    const config = getOwner(this).resolveRegistration('config:environment') || {};

    Inputmask.extendDefaults(config['ember-inputmask5'] ? config['ember-inputmask5']['defaults'] : {});
    Inputmask.extendDefinitions(config['ember-inputmask5'] ? config['ember-inputmask5']['definitions'] : {});
    Inputmask.extendAliases(config['ember-inputmask5'] ? config['ember-inputmask5']['aliases'] : {});
  }

  @computed('args')
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
  _onChange(event) {
    if (this.args.update && typeof this.args.update === 'function') {
      this.args.update(event.target.inputmask.unmaskedvalue());
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
    this.element.inputmask.remove();
  }

  _setInputMask() {
    new Inputmask(this._options).mask(this.element);
  }
}
