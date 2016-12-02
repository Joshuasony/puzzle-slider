import Ember from 'ember'

const { Component, inject, computed } = Ember

export default Component.extend({
  tagName: '',

  paperSidenav: inject.service(),

  routeTitle: computed('currentRouteName', function() {
    let routeName = this.get('currentRouteName')
    let route = this.get('container').lookup(`route:${routeName}`)

    return route && route.get('title') || 'Puzzle Slider'
  }),

  actions: {
    toggleMenu() {
      this.get('paperSidenav').toggle()
    },
    back() {
      this.sendAction('onback')
    }
  }
})
