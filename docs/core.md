# Retax-Core

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This is the core of the **retax framework**.
Its role is to bootstrap your **universal react / redux** application and to setup everything if you want to use
optionnal **retax modules**.

## Using Retax
Check theses projects to learn how to use retax: [retax-client][retax-client-link] or [retax-server][retax-server-link].


## What retax does?
### Bootstrapping
When you bootstrap a retax application
(whether on client or on server: the code of **retax-core** is 100% universal),
these lifecycle events will happened in order:

* Read the initial app state
  * on the client, from a `window.__INITIAL_STATE__`
* Read the `authentication cookie`
  * on the client, from the dom cookie (using `js-cookie`)
  * on the server, from the request
* Initialize the **redux** store and initialize a retax reducer
* Run an optionnal hook (set by the user) to allow user to dispatch early actions
* Initialize **react-router** and do the route matching
* Run an optionnal hook (set by the user) to allow user to dispatch actions impacting rendererd components
* Generate the JSX of the corresponding app
  * on the server, retax-core populate `window.__INITIAL_STATE__` with the corresponding initial state.

The rendering is delegated to these modules [retax-client][retax-client-link] or [retax-server][retax-server-link].

**retax-core** literally just *build* the application.

### Provide a inversion of control container to retax modules
Your application will be wrapped by a component `<RetaxProvider />`. This component exposes to its children a IoC container.
This allows them to use dependency injection. This is highly used by all **retax modules**.


## FAQ
### I don't understand how this library is built
Check [builder][builder-link] and [builder-ts-library][builder-ts-library-link]


## Typescript support
This project is shipped with typescript typings.
If you are using typescript@^1.6, you don't have to do anything, it will detect the definition types automatically.


## Thanks
Thanks to [remojansen](https://github.com/remojansen) for the project [inversify](http://inversify.io/).
This project is intensively used by **retax-core** and allow it to be **100% universal**.


##License
MIT License (MIT)


[gitter-badge]: https://badges.gitter.im/retaxJS/retax.svg
[gitter-link]: https://gitter.im/retaxJS/retax?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[travis-badge]: https://travis-ci.org/retaxJS/retax-core.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax-core
[version-badge]: https://badge.fury.io/js/retax-core.svg
[version-link]: https://badge.fury.io/js/retax-core
[codecov-badge]: https://codecov.io/github/retaxJS/retax-core/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax-core?branch=master
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library

[retax-client-link]: https://github.com/retaxJS/retax-client
[retax-server-link]: https://github.com/retaxJS/retax-server
