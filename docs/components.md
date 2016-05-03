# Retax-Components

[![Join the chat at https://gitter.im/hourliert/retax][gitter-badge]][gitter-link]
[![Build Status][travis-badge]][travis-link]
[![Version][version-badge]][version-link]
[![codecov.io][codecov-badge]][codecov-link]

This is a set of components to help you to structure and reduce the boilerplate of your retax app.

This is very in **experimental**. These components are **not tested** at the moment.


## Getting started
```
npm install --save retax-components
```

#### Create an API

```js
// apis/user.js
import { annotator, AbstractApi } from 'retax-components';

@annotator.Api({
  baseUrl: 'http://localhost:8080',
  routes: {
    users: '/user',
  },
})
export default class UserApi extends AbstractApi {
  getCurrent() {
    return this.get({ url: `${this.routes.users}/me` });
  }
}

```

#### Create an Actions creator

```js
// actionsCreators/user.js
import { annotator, AbstractActionsCreator } from 'retax-components';

import UserApi from 'apis/user';
import ThemeActionsCreator from 'actions/theme';

@annotator.ActionsCreator({
  apis: {
    userApi: UserApi,
  },
  actionsCreators: {
    theme: ThemeActionsCreator,
  },
})
export default class UserActionsCreator extends AbstractActionsCreator {

  @annotator.action()
  fetchCurrentUser() {
    return async dispatch => {
      const { setAdminTheme, setUserTheme } = this.actionsCreators.theme;

      const res = await this.apis.userApi.getCurrent();

      dispatch(res.isAdmin ? setAdminTheme() : setUserTheme());
    }
  }
}
```

#### Create Retax Component

```js
// container/Signin.js
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annotator } from 'retax-components';

import UserActionsCreator from 'actionsCreators/user';

function mapDispatchToProps(dispatch, props) {
  const { userActions } = props;

  return bindActionCreators({
    ...userActions.export(), // get all methods of UserActionsCreator annotated with @annotator.action()
  }, dispatch);
}

@annotator.RetaxComponent({
  actionsCreators: {
    userActions: UserActionsCreator,
  },
})
@connect(() => {}, mapDispatchToProps)
export default class SigninPage extends Component {
  static propTypes = {
    fetchCurrentUser: PropTypes.func,
  };

  componentDidMount() {
    this.props.fetchCurrentUser();
  }

  render() {
    return (
      <div>Hello World!</div>
    );
  }
}

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
[travis-badge]: https://travis-ci.org/retaxJS/retax-components.svg?branch=master
[travis-link]: https://travis-ci.org/retaxJS/retax-components
[version-badge]: https://badge.fury.io/js/retax-components.svg
[version-link]: https://badge.fury.io/js/retax-components
[codecov-badge]: https://codecov.io/github/retaxJS/retax-components/coverage.svg?branch=master
[codecov-link]: https://codecov.io/github/retaxJS/retax-components?branch=master
[builder-link]: http://builder.formidable.com/
[builder-ts-library-link]: https://github.com/hourliert/builder-ts-library
