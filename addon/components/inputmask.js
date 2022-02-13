import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class InputmaskComponent extends Component {
  @action
  _onInput() {
    if (this.args.update && typeof this.args.update === 'function') {
      this.args.update(this.element.inputmask.unmaskedvalue());
    }
  }
}
