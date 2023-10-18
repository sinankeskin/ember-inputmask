# ember-inputmask5

![ember-inputmask5 workflow](https://github.com/sinankeskin/ember-inputmask/actions/workflows/ci.yml/badge.svg)
[![Ember Observer Score](https://emberobserver.com/badges/ember-inputmask5.svg)](https://emberobserver.com/addons/ember-inputmask5)


Ember addon for [Inputmask](https://github.com/RobinHerbots/Inputmask/) input mask library.

## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-inputmask5
```

## Usage

You can change all global configuration settings via `config/environment.js` file.

Please check [Inputmask](https://github.com/RobinHerbots/Inputmask#set-defaults) site for more defaults details.

```javascript
ENV['ember-inputmask5'] = {
  defaults: {
    // ...
  },
  definitions: {
    // ...
  },
  aliases: {
    // ...
  },
};
```

Example as a component

```handlebars
<Inputmask @mask="999 999 99 99" />
```

Please check [Inputmask](https://github.com/RobinHerbots/Inputmask#options) site for more configuration details.

```handlebars
<Inputmask @mask="999 999 99 99" @placeholder="_" @clearIncomplete={{true}} />
```

Example as a modifer

```handlebars
<Input {{inputmask mask="999 999 99 99" placeholder="_" clearIncomplete=true}} />
```
```handlebars
<input type="text" {{inputmask mask="999 999 99 99" placeholder="_" clearIncomplete=true}} />
```

If you would like access to the inputmask instance in order to call some methods directly,
for example to hide or show programmatically, pass an action to registerAPI

```handlebars
<Input {{inputmask registerAPI=this.saveApi mask="999 999 99 99" placeholder="_" clearIncomplete=true}} />
```

```javascript
// save the inputmask instance to use later
@action
saveApi(inputmask) {
  this.inputmask = inputmask;
}

// programmatically show unmasked value
@action
openFocusOut() {
  console.log(this.inputmask.unmaskedvalue());
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
I'm sorry that i don't have time to write tests. Please report if you find any issue.

Thanks.

## License

This project is licensed under the [MIT License](LICENSE.md).
