import Ember from 'ember'

export default Ember.Service.extend({
  moves: null,
  init() {
    this.set('moves', [])
  },
  record(move) {
    this.get('moves').push({
      x: move[0],
      y: move[1],
      timestamp: performance.now()
    })
  },
  reset() {
    this.set('moves', [])
  }

})
