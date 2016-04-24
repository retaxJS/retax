import createLogger from 'redux-logger';

import rootRoute from './routes/counter';
import counterReducer from './reducers/counter';

export default isServer => ({
  router: {
    static: rootRoute,
  },
  store: {
    middlewares: [!isServer && createLogger()],
    reducers: {
      counter: counterReducer,
    },
  },
});
