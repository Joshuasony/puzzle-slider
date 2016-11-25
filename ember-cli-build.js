/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    fingerprint: {
      extensions: [
        'js',
        'css',
        'png',
        'jpg',
        'gif',
        'map',
        'svg',
        'eot',
        'ttf',
        'woff',
        'woff2'
      ]
    },
    autoprefixer: {
      browsers: [
        'Chrome >= 49',
        'Safari >= 9',
        'iOS >= 9',
        'Firefox ESR',
        'Firefox 38',
        'Last 3 Firefox versions'
      ]
    }
  })

  return app.toTree()
}
