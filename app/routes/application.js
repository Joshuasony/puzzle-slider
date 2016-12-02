import Ember from 'ember'

const { Route, inject } = Ember

export default Route.extend({
  splashscreen: inject.service('device/splashscreen'),

  afterModel() {
    this.get('splashscreen').hide()
  }
})
