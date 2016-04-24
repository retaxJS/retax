# Retax

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]


Retax helps you to bootstrap your **universal react / redux** application.
It also comes with a set of **optional** opinionated helpers to structure and reduce your application code.

You could look at the [examples](https://github.com/retaxJS/retax/tree/master/examples) folder to see how to use **retax** or look at a *HUGE* app running with retax [here][seed] (work in progress).

**WARNING**:
* The core of retax is stable and tested. :thumbsup:
* Optional modules (*ActionsCreator*, *Api* and *RetaxComponent*) are unstable and may change in a near future

## Getting started

Install retax:
```
npm install --save retax
```

And satisfy peer dependencies (yay, there are many...):
```
"peerDependencies": {
  "cookie-parser": "^1.4.1",
  "express": "^4.13.4",
  "immutable": "^3.8.0",
  "react-dom": "^0.14.0 || ^15.0.0-0",
  "react-helmet": "^3.0.1",
  "react-redux": "^4.4.5",
  "react-router-redux": "^4.0.2",
  "react-router": "^2.2.4",
  "react": "^0.14.0 || ^15.0.0-0",
  "redux": "^3.4.0",
  "reflect-metadata": "^0.1.3",
  "webpack-isomorphic-tools": "^2.2.26"
}
```

Retax also use **es6-generators**, be sure to have a polyfill for that. [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) do the trick!


We want to render this simple **react/redux** app:

```tsx
// app.js

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router';

export function counterReducer(state: number = 0, action: any): number {
  switch (action.type) {
    case 'INC':
      return state + 1;
    default:
      return state;
  }
}

function incrementActionCreator() {
  return { type: 'INC' };
}

const About = connect(
  ({ counter }) => ({ counter }),
  dispatch => bindActionCreators({ incrementActionCreator }, dispatch)
)(
  ({ counter, incrementActionCreator }) => (
    <div onClick={incrementActionCreator}>
      Hello About! Here is the counter value: {counter}
    </div>
  )
);

export default (
  <Route path="/">
    <Route path="about" component={About}/>
  </Route>
);

```

Let's do that with **retax**!

First, define a retax configuration file.

```ts
// retax.config.js
import rootRoute, { counterReducer } from './app';

// retax configuration file support many more options, like redux-middleware, redux-store-enhancer, dynamic rootRoute evaluation, etc...
// the complete doc is comming very soon
export default {
  router: {
    static: rootRoute,
  },
  store: {
    reducers: {
      counter: counterReducer,
    },
  },
};

```

Finally, bootstrap the app.

```ts
// clientEntry.js

import { retax } from 'retax';
import retaxConfig from './retax.config';

retax.config(retaxConfig);

const rootElement = document.getElementById('root');

retax.bootstrap(rootElement);

```

That's all!

## What retax realy does?
### It centralizes all the stuff that is not needed by the developper
How many times react / redux developpers should edit the app configuration files (like `createReduxStore.js`, `clientEntry.js`, `serverRenderingMiddleware.js`, etc...)?
Only once. But in practice. this is not really like that...
* If `react-router` has an new update with a change in its API, you will have to edit the `clientEntry.js`, maybe the `serverRenderingMiddleware.js`, and others...
* If `redux` has a new update and expose a new function that does something more efficiently, you surely want to have this.
* If `react` has a new... etc...

You got it? It could be a serious pain to update the structure of the app. (the more you have external dependencies, the harder it is!)
And we have not talking about creating the **real** app yet...


Retax helps you with this. You have just to give it a configuration file and it will take care of everything.
All its bootstrapping process is highly customizable if you need it.
You can found [here](https://github.com/retaxJS/retax-core#bootstrapping) some details about it.

Here is a non exhaustive list of retax features:

* Support **universal** javascript
* Initialize your **redux** store
  * You could provide your redux middlewares
  * You also could provide your store enhancers
  * And obviously, your reducers!
* Initialize **react-router**
  * Just give retax a root route object (JSX or plain object)
* Support out-of-the-box code splitting (useful if you are using `require.ensure` into your **react-router** routes)
* Initialize **react-router-redux**
* Render the **react** app
  * you could append JSX elements in the render loop, useful if your want to include redux `<DevTools />`
* Support lifecycle hooks to customize and inject data during the bootstrapping process. For instance you could:
  * Prefetch initial state before doing the route matching
  * Prefetch components data once the route matching is done.

After the bootstrapping, you could still use all modules exposed by **react**, **react-router**, **redux**, **react-router-redux**, ...
(Eg. `<Link />` from **react-router**, `bindActionCreators` from **redux**)


### **OPTIONAL** It helps you structure your app and reduces your boilerplate code
As explained [here](https://github.com/retaxJS/retax-core#provide-a-inversion-of-control-container-to-retax-modules), **retax** wraps your app
with a component that has access to an IoC container. This allows you to register into it services and inject them later into other components.

All the following items are considered as **retax modules**.

#### API Module
##### Initial Problem
Let's say uou want to do an ajax call to an API but you have to be authentified. Your auth token is in your `session` reducer.
Each time you call your `doAjaxCall` actions creator, your have to:
* read the store state
* retrieve the auth token
* pass it to your API Connector class

So much boilerplate code especially if you have to manage several API endpoints.

##### Retax Solution
Retax API module helps you create an API class (with base methods, GET, POST, DELETE, PUT (can be extended)) and will inject into it the current auth token.
This API class can later be injected into an Actions Creator.

#### Actions Creator Module
Create an Actions Creator class with the possibility to inject into it other Actions Creator and APIs.

#### Retax Component Module
Create a React component with the possibility to inject into it Actions Creators.


## FAQ
### I don't understand how this library is built
Check [builder][builder-link] and [builder-ts-library][builder-ts-library-link]


## Typescript support
This project is shipped with typescript typings.
If you are using typescript@^1.6, you don't have to do anything, it will detect the definition types automatically.

## **Thanks**
Thanks to [remojansen](https://github.com/remojansen) for the project [inversify](https://github.com/inversify/InversifyJS/).
This project is intensively used by **retax**.

##License
MIT License (MIT)


[gitter-badge]: https://badges.gitter.im/hourliert/retax.svg
[gitter-link]: https://gitter.im/hourliert/retax?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[travis-badge]: https://travis-ci.org/retaxJS/retax.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax
[version-badge]: https://badge.fury.io/js/retax.svg
[version-link]: https://badge.fury.io/js/retax
[codecov-badge]: https://codecov.io/github/retaxJS/retax/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax?branch=master
[seed]: https://github.com/hourliert/react-seed
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library
