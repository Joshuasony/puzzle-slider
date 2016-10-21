import Ember from 'ember'

const { Route, inject } = Ember

export default Route.extend({
  intro: inject.service(),

  actions: {
    play() {
      this.set('intro.isCompleted', true)
      this.transitionTo('play')
    }
  }
})
