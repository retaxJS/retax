# Retax-Server

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This is the server side of the [retax](https://github.com/retaxJS/retax).
It could create 2 kind of express middlewares:
* static rendering: this one simply return a static Html page compliant with [retax-client](https://github.com/retaxJS/retax-client)
* dynamic rendering: this one calls **retax-core** to create an app server side and render it


## How it works?

I assume that you will use [retax](https://github.com/retaxJS/retax) to create a **retax** app.
If you still want to bootstrap a server app manually, you could do the following.

### Common code: the app
```tsx
import { connect } from 'react-redux';
import { Route } from 'react-router';

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
```

### Rendering middleware

```tsx
import * as express from 'express';
import cookieParser from 'cookie-parser';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'; // this is a NEEDED dependency of retax-server at the moment

import { InversifyKernelFacade } from 'retax-core';
import { Injector, KernelMediator, KernelFactory } from 'retax-di';
import { ServerBoostrapper, ServerConfigStore } from 'retax-server';

// you could create a top-level IoC container if you don't want to do the following yourself
const inversifyKernelFacadeFactory = () => new InversifyKernelFacade();
const kernelFactory = new KernelFactory(inversifyKernelFacadeFactory);
const injector = new Injector();
const kernelMediator = new KernelMediator(kernelFactory, injector);
const serverConfigStore = new ServerConfigStore();

const bootstrapper = new ServerBoostrapper(serverConfigStore, kernelMediator);

const isomorphicTools = new WebpackIsomorphicTools(isomorphicConfig); // check https://github.com/halt-hammerzeit/webpack-isomorphic-tools
isomorphicTools.server(__dirname).then(() => {
  const serverConfig = {
    isomorphicTools,
    retaxConfig,
    serverRendering: false, // or true, server rendering is as simple as a boolean!
  };

  bootstrapper.config(serverConfig);

  const app = express();

  app.use(cookieParser());
  app.use(bootstrapper.bootstrap());

  app.listen(3000);
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
[travis-badge]: https://travis-ci.org/retaxJS/retax-server.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax-server
[version-badge]: https://badge.fury.io/js/retax-server.svg
[version-link]: https://badge.fury.io/js/retax-server
[codecov-badge]: https://codecov.io/github/retaxJS/retax-server/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax-server?branch=master
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library
