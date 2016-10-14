import Ember from 'ember'

const { Component, inject } = Ember

export default Component.extend({
  tagName: '',

  paperSidenav: inject.service(),

  actions: {
    toggleMenu() {
      this.get('paperSidenav').toggle()
    }
  }
})
