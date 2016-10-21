import Ember from 'ember'
import SplashScreenMixin from 'ember-cordova/mixins/device/splashscreen'

const { Route, inject, computed } = Ember

export default Route.extend(SplashScreenMixin, {
  intro: inject.service(),

  startPage: computed('intro.isCompleted', function() {
    return this.get('intro.isCompleted') ? 'play' : 'intro'
  }),

  beforeModel() {
    return this.transitionTo(this.get('startPage'))
  }
})
