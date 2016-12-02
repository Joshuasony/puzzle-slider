import Ember from 'ember'

const { Route, inject } = Ember

export default Route.extend({
  ajax: inject.service(),

  title: 'Leaderboard',

  model() {
    return this.get('ajax')
      .request('/leaderboard')
  }
})
