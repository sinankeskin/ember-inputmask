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
    module('when as component', function () {
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
    });

    module('when as modifier', function () {
      test('it updates value with masks', async function (assert) {
        await render(hbs`<Input {{inputmask mask='999 999 99 99' }}/>`);

        let inputMaskElement = find('input');
        await fillIn(inputMaskElement, '98');

        assert.dom(inputMaskElement).hasValue('98_ ___ __ __', 'text in input');
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

    module('when retrieving API', function () {
      test('should get unmaskedValue', async function (assert) {
        let registeredAPI;
        this.register = ({ inputmask }) => (registeredAPI = inputmask);

        await render(hbs`<Input {{inputmask registerAPI=this.register}}/>`);
        let inputMaskElement = find('input');
        await fillIn(inputMaskElement, 'unmasked-value');
        assert.strictEqual(registeredAPI.unmaskedvalue(), 'unmasked-value');
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

    module('when using extensions', function () {
      module('when datetime', function () {
        test('should manage input and output format', async function (assert) {
          let registeredAPI;
          this.register = ({ inputmask }) => (registeredAPI = inputmask);

          await render(
            hbs`<Input {{inputmask alias="datetime" inputFormat="dd/mm/yyyy" outputFormat="yyyy-mm-dd" registerAPI=this.register}}/>`
          );
          let inputMaskElement = find('input');
          await fillIn(inputMaskElement, '28/02/2000');
          assert.strictEqual(registeredAPI.unmaskedvalue(), '2000-02-28');
        });
      });

      module('when currency (numeric)', function () {
        test('should manage numbers with 2 digits', async function (assert) {
          let registeredAPI;
          this.register = ({ inputmask }) => (registeredAPI = inputmask);

          await render(
            hbs`<Input {{inputmask alias="currency" unmaskAsNumber="true" min="3" max="1000000" groupSeparator=" " registerAPI=this.register}}/>`
          );
          let inputMaskElement = find('input');
          await fillIn(inputMaskElement, '1999.25');

          assert.strictEqual(registeredAPI.unmaskedvalue() + 1, 2000.25);
          assert.strictEqual(inputMaskElement.value, '1 999.25');
        });
      });
    });
  });
});
