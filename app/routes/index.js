import Ember from 'ember'

const { Route, inject, computed } = Ember

export default Route.extend({
  intro: inject.service(),

  startPage: computed('intro.isCompleted', function() {
    return this.get('intro.isCompleted') ? 'play' : 'intro'
  }),

  beforeModel() {
    return this.transitionTo(this.get('startPage'))
  }
})
