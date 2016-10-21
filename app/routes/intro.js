import Ember from 'ember'

const { Route, inject } = Ember

export default Route.extend({
  intro: inject.service(),

  activate() {
    document.body.classList.add('page-intro')
  },

  deactivate() {
    document.body.classList.remove('page-intro')
  },

  actions: {
    play() {
      this.set('intro.isCompleted', true)
      this.transitionTo('play')
    }
  }
})
