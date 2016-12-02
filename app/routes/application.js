import Ember from 'ember'
import subscribe from 'ember-cordova-events/utils/subscribe'

const { Route, inject } = Ember

export default Route.extend({
  splashscreen: inject.service('device/splashscreen'),
  cordovaEvents: inject.service('ember-cordova/events'),
  paperSidenav: inject.service(),

  afterModel() {
    this.get('splashscreen').hide()
  },

  backbutton: subscribe('cordovaEvents.backbutton', function() {
    this.send('back')
  }),

  actions: {
    back() {
      this.get('paperSidenav').close()

      let currentRouteName =
        this.controllerFor('application').get('currentRouteName')

      if (navigator.app) {
        if (currentRouteName === 'play') {
          navigator.app.exitApp()
        }
        else {
          navigator.app.backHistory()
        }
      }
      else if (window.history.length === 1) {
        this.transitionTo('play')
      }
      else {
        window.history.back()
      }
    }
  }
})
