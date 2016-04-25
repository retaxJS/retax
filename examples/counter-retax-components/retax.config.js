import createLogger from 'redux-logger';

import rootRoute from './routes/counter';
import counterReducer from './reducers/counter';

export default {
  router: {
    static: rootRoute,
  },
  store: {
    middlewares: [createLogger()],
    reducers: {
      counter: counterReducer,
    },
  },
};
