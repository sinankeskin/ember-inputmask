# Changelog

All notable changes will be documented in this file.

[4.0.0] - 2022-04-26
- converted to a V2 format addon
- Breaking: removed the lazy import. Since the import was a promise, caused complexity in utilizing the component/modifier, especially when used multiple times on the same HBS
- Breaking: Altered the value sent back by the register API. It is now an object with the property inputmask. Allows for a more dynamic lookup of inputmask and give the ability to add more API if needed
- Breaking: Updated to ember-modifiers 3.3.x. This causes modifiers to be called lazily and could have an impact on usage. see [ember-modifier migration](https://github.com/ember-modifier/ember-modifier/blob/master/MIGRATIONS.md#40)

Thank you [Brian Gantzler](https://github.com/cah-briangantzler) for such a big and awesome contribution.

[3.2.0] - 2022-03-15
- Fixed registerAPI to pass Inputmask instead of element [#322](https://github.com/sinankeskin/ember-inputmask/pull/322)

Thank you [Gianluca Tomasino](https://github.com/gianlucatomasino) for amazing contribution.

[3.1.0] - 2022-02-13
- Added registerApi method for more control over the inputmask instance

[3.0.0] - 2022-02-13
- Lazy loading of Inputmask library
- Added inputmask modifier
- Upgraded to latest ember-cli

Thank you [Sam Van Campenhout](https://github.com/Windvis) for precious feedbacks!
