const reactRouter = require.requireActual('react-router');

reactRouter.browserHistory = reactRouter.createMemoryHistory();

module.exports = reactRouter;
