import Ember from 'ember'

const { Route } = Ember

export default Route.extend({
  model() {
    return new Array(200).fill({
      rank: 1,
      name: 'Foo Bar',
      time: '00:10.723',
      date: '2016-11-09T13:07:00.000Z'
    })
  }
})
