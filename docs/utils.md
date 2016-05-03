# Retax-Utils

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This is a set of utils for all retax modules.
It also includes 2 helpers for creating redux actions creators and reducers.


## Getting started
```
npm install --save retax-utils
```

### Creating a reducer
This helper creates a redux reducers. It relies on the fact that an action object must have a `type` property.

```js
import { reducerFactory } from 'retax';

const initialState = {
  value: 0,
};

const reducer = reducerFactory(
  initialState,
  {
    INC: (state, action) => state + action.payload,
    DEC: (state, action) => state - action.payload,
  }
);

reducer();

/*
{
  value: 0
}
*/

```

### Creating an actions creator

```js
import { actionsCreatorFactory } from 'retax';

const actionsCreator = actionsCreatorFactory(
  'INC'
);

actionsCreator();

/*
{
  type: 'INC'
}
*/

actionsCreator(5);

/*
{
  type: 'INC',
  payload: 5
}
*/

```

You could also provide a `payloadCreator` and a `metaCreator` (similar to [redux-actions](https://github.com/acdlite/redux-actions)).

```js
import { actionsCreatorFactory } from 'retax';

const actionsCreator = actionsCreatorFactory(
  'INC',
  x => 2 * x,
  y => 3 * y
);

actionsCreator();

/*
{
  type: 'INC'
}
*/

actionsCreator(5);

/*
{
  type: 'INC',
  payload: 10,
  meta: 15
}
*/

```


## FAQ
### I don't understand how this library is built
Check [builder][builder-link] and [builder-ts-library][builder-ts-library-link]


## Typescript support
This project is shipped with typescript typings.
If you are using typescript@^1.6, you don't have to do anything, it will detect the definition types automatically.


##License

MIT License (MIT)

[gitter-badge]: https://badges.gitter.im/hourliert/retax.svg
[gitter-link]: https://gitter.im/hourliert/retax?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[travis-badge]: https://travis-ci.org/retaxJS/retax-utils.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax-utils
[version-badge]: https://badge.fury.io/js/retax-utils.svg
[version-link]: https://badge.fury.io/js/retax-utils
[codecov-badge]: https://codecov.io/github/retaxJS/retax-utils/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax-utils?branch=master
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library
