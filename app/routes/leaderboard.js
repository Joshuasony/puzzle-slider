import Ember from 'ember'

const { Route, inject } = Ember

export default Route.extend({
  ajax: inject.service(),

  model() {
    return this.get('ajax')
      .request('/leaderboard')
  }
})
