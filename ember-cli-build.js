/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    autoprefixer: {
      browsers: [
        'Chrome >= 50',
        'Safari >= 9',
        'iOS >= 9',
        'Firefox ESR',
        'Last 3 Firefox versions'
      ]
    }
  })

  return app.toTree()
}
