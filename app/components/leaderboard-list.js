import Ember from 'ember'

const { Component, inject, computed } = Ember

export default Component.extend({
  classNames: [ 'leaderboard-list' ],
  bestTime: inject.service(),
  items: null,
  scrollToMyBest: true,

  myBestIndex: computed('bestTime.id', 'items.[]', function() {
    return this.get('items')
      .map(i => i.id)
      .indexOf(this.get('bestTime.id'))
  }),

  didInsertElement() {
    if (this.get('myBestIndex') >= 0) {
      this.element
        .querySelector('vertical-collection')
        .children[this.get('myBestIndex')]
        .scrollIntoView()
    }
  }
})
