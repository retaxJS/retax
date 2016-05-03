# Retax-Client

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This is the client side of the [retax](https://github.com/retaxJS/retax).
It calls the **retax-core** to build the client app and render it.


## How it works?

I assume that you will use [retax](https://github.com/retaxJS/retax) to create a **retax** app.
If you want to bootstrap a client app manually, you could do the following.

I am considering to expose from **retax-client** a instantiated bootstrapper to help you.

```tsx
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { InversifyKernelFacade } from 'retax-core';
import { Injector, KernelMediator, KernelFactory } from 'retax-di';
import { ClientBootstrapper } from 'retax-client';

// you could create a top-level IoC container if you don't want to do the following yourself
const inversifyKernelFacadeFactory = () => new InversifyKernelFacade();
const kernelFactory = new KernelFactory(inversifyKernelFacadeFactory);
const injector = new Injector();
const kernelMediator = new KernelMediator(kernelFactory, injector);
const bootstrapper = new ClientBootstrapper(kernelMediator);

const About = connect(
  { counter } => ({ counter })
)(
  ({ counter }) => <div>Hello About! Counter {counter}</div>
);

function counterReducer(state: number = 0, action: any): number {
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      return state;
  }
}

const retaxConfig = {
  router: {
    static: (
      <Route path="/">
        <Route path="about" component={About}/>
      </Route>
    ),
  },
  store: {
    reducers: {
      counter: counterReducer,
    },
  },
};

bootstrapper.config(retaxConfig);

const mountPoint = document.querySelector('#root');

bootstrapper.bootstrap(mountPoint).then(() => {
  console.log('The app is rendered!');
});

```

## FAQ
### I don't understand how this library is built
Check [builder][builder-link] and [builder-ts-library][builder-ts-library-link]


## Typescript support
This project is shipped with typescript typings.
If you are using typescript@^1.6, you don't have to do anything, it will detect the definition types automatically.


##License
MIT License (MIT)


[gitter-badge]: https://badges.gitter.im/retaxJS/retax.svg
[gitter-link]: https://gitter.im/retaxJS/retax?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[travis-badge]: https://travis-ci.org/retaxJS/retax-client.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax-client
[version-badge]: https://badge.fury.io/js/retax-client.svg
[version-link]: https://badge.fury.io/js/retax-client
[codecov-badge]: https://codecov.io/github/retaxJS/retax-client/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax-client?branch=master
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library
