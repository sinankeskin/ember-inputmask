import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, find, settled, blur} from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | inputmask', function (hooks) {
  setupRenderingTest(hooks);

  /*
  While there are not many tests, this verifys that inputmask was correctly attached to the input element.
  It also verifys that options, like mask and update are also passed correctly.
   */
  test('component', async function (assert) {

    this.value = undefined;

    this.onUpdate = (value) => {
      this.value = value;
    };

    debugger;
    await render(hbs`<Inputmask @mask='999 999 99 99' @update={{this.onUpdate}} />`);
    let inputMaskElement = find("input");
    await fillIn(inputMaskElement, "98");
    // verifying inputmask was correctly attached to inputmask and that the mask was passed
    assert.dom(inputMaskElement).hasValue("98_ ___ __ __", "text in input");
    await blur(inputMaskElement);
    // verifying the function was passed to inputmask
    assert.ok(this.value === "98", "value");

  });

  /*
  This does the same for the modifier
 */
  test('modifier', async function (assert) {

    this.value = undefined;

    this.onIncomplete = (event) => {
      this.value = event.target.value;
    };

    await render(hbs`<input {{inputmask mask='999 999 99 99' onincomplete=this.onIncomplete}} />`);
    debugger;
    let inputMaskElement = find("input");
    await fillIn(inputMaskElement, "98");
    // verifying inputmask was correctly attached to inputmask and that the mask was passed
    assert.dom(inputMaskElement).hasValue("98_ ___ __ __", "text in input");
    await blur(inputMaskElement);
    // verifying the function was passed to inputmask
    assert.ok(this.value === "98_ ___ __ __", "value");

  });

  test('updates when params change', async function (assert) {
    class TestClass {
      @tracked mask = "999 999 99 99";
    }
    this.testClass = new TestClass();

    this.value = undefined;

    this.onUpdate = (value) => {
      this.value = value;
    };

    debugger;
    await render(hbs`<Inputmask @mask={{this.testClass.mask}} @update={{this.onUpdate}} />`);
    let inputMaskElement = find("input");
    await fillIn(inputMaskElement, "98");
    // verifying inputmask was correctly attached to inputmask and that the mask was passed
    assert.dom(inputMaskElement).hasValue("98_ ___ __ __", "text in input");
    await blur(inputMaskElement);
    // verifying the function was passed to inputmask
    assert.ok(this.value === "98", "value");

    this.testClass.mask = "999 999";
    await settled();
    assert.dom(inputMaskElement).hasValue("98_ ___", "text in input");

  });


});
