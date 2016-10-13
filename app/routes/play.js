import Ember from 'ember'

export default Ember.Route.extend({
  actions: {
    solvedPuzzle() {
      this.transitionTo('play-success')
    }
  }
})
