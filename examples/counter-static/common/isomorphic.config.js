var path = require('path');

module.exports = function(context) {
  return {
    webpackAssetsFilePath: path.join(context, './dist/webpack-assets.json'),
    webpackStatsFilePath: path.join(context, './dist/webpack-stats.json'),
    assets: {},
  };
};
