/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import cookieParser from 'cookie-parser';

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import webpackConfig from '../webpack.config'

var makeIsomorphicConfig = require('../common/isomorphic.config');

import { retaxMiddleware } from '../../../lib/index';
import getRetaxConfig from '../common/retax.config';

const app = new Express()
const port = 3000

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(cookieParser())
app.get('/favicon.ico', (req, res) => res.sendStatus(404));

const isomorphicTools = new WebpackIsomorphicTools(makeIsomorphicConfig('.'));
isomorphicTools.development(true);

isomorphicTools.server('.').then(() => {
  app.use(retaxMiddleware({
    isomorphicTools,
    serverRendering: true,
    retaxConfig: getRetaxConfig(true), // we retrieve the server config
  }));

  app.listen(port, (error) => {
    if (error) {
      console.error(error)
    } else {
      console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
  });
});




