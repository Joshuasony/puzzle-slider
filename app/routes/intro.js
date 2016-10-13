import Ember from 'ember'

export default Ember.Route.extend({
  activate() {
    document.body.classList.add('page-intro')
  },

  deactivate() {
    document.body.classList.remove('page-intro')
  }
})
