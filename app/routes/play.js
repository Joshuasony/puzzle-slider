import Ember from 'ember'

const { Route, run } = Ember
const ONE_SECOND = 1000

export default Route.extend({
  actions: {
    solvedPuzzle() {
      setTimeout(run.bind(() => this.transitionTo('play-success')), ONE_SECOND)
    }
  }
})
