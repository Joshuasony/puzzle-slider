import Ember from 'ember'

const { Route, inject } = Ember

export default Route.extend({
  ajax: inject.service(),
  bestTime: inject.service(),
  notify: inject.service(),
  moveRecorder: inject.service(),

  setupController(controller, model) {
    this._super(controller, model)

    controller.set('emailValidations', [
      {
        message: '%@2 ist keine gültige E-Mail Adresse.',
        validate: value => !value || /.@./.test(value)
      }
    ])
  },

  actions: {
    submitTime({ name, email }) {
      let time = this.get('bestTime.latest')
      let moves = this.get('moveRecorder.moves')

      this.get('ajax')
        .post('/leaderboard', {
          contentType: 'application/json',
          data: JSON.stringify({ name, email, time, moves })
        })
        .then(res => {
          this.set('bestTime.id', res.id)
          this.transitionTo('leaderboard')
        })
        .catch(res => {
          this.get('notify').error(
            res.message ||
            res.responseText ||
            res.statusText
          )
        })
    }
  }
})
