import Ember from 'ember'

const { Route } = Ember

export default Route.extend({
  actions: {
    transitionToSubmitTime() {
      this.replaceWith('submit-time')
    }
  }
})
