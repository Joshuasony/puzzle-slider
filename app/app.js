import Ember from 'ember'
import Resolver from './resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'

Ember.MODEL_FACTORY_INJECTIONS = true

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

Ember.Route.reopen({
  className() {
    return `page-${Ember.String.dasherize(this.routeName.replace(/\./g, '-'))}`
  },
  activate() {
    document.body.classList.add(this.className())
  },
  deactivate() {
    document.body.classList.remove(this.className())
  }
})

export default App
