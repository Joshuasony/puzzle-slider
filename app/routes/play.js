import Ember from 'ember'

const { Route, run, inject } = Ember
const ONE_SECOND = 1000

export default Route.extend({
  bestTime: inject.service(),

  actions: {
    solvedPuzzle(solveTime) {
      let bestTime = this.get('bestTime.value')

      this.set('bestTime.latest', solveTime)

      if (!bestTime || solveTime < bestTime) {
        this.set('bestTime.value', solveTime)
      }

      run.later(() => this.transitionTo('play-success'), ONE_SECOND)
    }
  }
})
