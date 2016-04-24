import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Counter from '../components/Counter';
import About from '../components/About';

export default (
  <Route path="/">
    <IndexRoute component={Counter} />
    <Route path="counter" component={Counter} />
    <Route path="about" component={About} />
  </Route>
);
