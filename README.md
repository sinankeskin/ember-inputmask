# ember-inputmask5

Ember addon for [Inputmask](https://github.com/RobinHerbots/Inputmask/) input mask library.

## Compatibility

- Ember.js v3.12 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

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

Examples;

```handlebars
<Inputmask @mask="999 999 99 99" />
```

Please check [Inputmask](https://github.com/RobinHerbots/Inputmask#options) site for more configuration details.

```handlebars
<Inputmask @mask="999 999 99 99" @placeholder="_" @clearIncomplete={{true}} />
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.
I'm sorry that i don't have time to write tests. Please report if you find any issue.

Thanks.

## License

This project is licensed under the [MIT License](LICENSE.md).
