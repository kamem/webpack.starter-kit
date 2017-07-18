const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.app.config');
const bundler = webpack(webpackConfig);

const port = process.env.PORT || 3000

browserSync({
  port: port,
  ui: {
    port: port + 1
  },
  server: {
    baseDir: 'public',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  files: [
    'public/css/*.css',
    'public/*.html'
  ]
});
