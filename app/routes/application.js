import Ember from 'ember'
import SplashScreenMixin from 'ember-cordova/mixins/device/splashscreen'

const { Route } = Ember

export default Route.extend(SplashScreenMixin, {
  beforeModel() {
    return this.transitionTo('intro')
  }
})
