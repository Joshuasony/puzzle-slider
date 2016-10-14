import Ember from 'ember'

const { Route } = Ember

export default Route.extend({
  activate() {
    document.body.classList.add('page-intro')
  },

  deactivate() {
    document.body.classList.remove('page-intro')
  }
})
