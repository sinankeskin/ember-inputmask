import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, find, settled, blur } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | inputmask', function (hooks) {
  setupRenderingTest(hooks);

  /*
  While there are not many tests, this verifys that inputmask was correctly attached to the input element.
  It also verifys that options, like mask and update are also passed correctly.
   */
  module('when the input is filled in', function () {
    test('it updates value with masks', async function (assert) {
      await render(hbs`<Inputmask @mask='999 999 99 99' />`);

      let inputMaskElement = find('input');
      await fillIn(inputMaskElement, '98');

      assert.dom(inputMaskElement).hasValue('98_ ___ __ __', 'text in input');
    });

    module('when update', function () {
      test('it calls @update with value', async function (assert) {
        this.value = undefined;

        this.onUpdate = (value) => {
          this.value = value;
        };

        await render(
          hbs`<Inputmask @mask='999 999 99 99' @update={{this.onUpdate}} />`
        );

        let inputMaskElement = find('input');
        await fillIn(inputMaskElement, '98');
        await blur(inputMaskElement);

        assert.strictEqual(this.value, '98', 'value');
      });
    });

    module('when onIncomplete', function () {
      test('it calls onIncomplete with event', async function (assert) {
        this.value = undefined;

        this.onIncomplete = (event) => {
          this.value = event.target.value;
        };

        await render(
          hbs`<input {{inputmask mask='999 999 99 99' onincomplete=this.onIncomplete}} />`
        );

        let inputMaskElement = find('input');
        await fillIn(inputMaskElement, '98');
        await blur(inputMaskElement);

        assert.strictEqual(this.value, '98_ ___ __ __', 'value');
      });
    });
  });

  module('when params change', function () {
    test('updates when params change', async function (assert) {
      class TestClass {
        @tracked mask = '999 999 99 99';
      }
      this.testClass = new TestClass();

      await render(hbs`<Inputmask @mask={{this.testClass.mask}}/>`);
      let inputMaskElement = find('input');
      await fillIn(inputMaskElement, '98');
      this.testClass.mask = '999 999';
      await settled();

      assert.dom(inputMaskElement).hasValue('98_ ___', 'text in input');
    });
  });
});
