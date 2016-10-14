import Ember from 'ember'
import Puzzle from '../game/slider'

export default Ember.Component.extend({
  tagName: 'puzzle-slide',
  classNames: [ 'layout-column', 'layout-align-start-center' ],
  attributeBindings: [ 'tiles' ],
  tiles: 4,
  startTime: null,
  puzzle: null,

  setupPuzzle() {
    this.puzzle = new Puzzle(this.element.querySelector('puzzle-board'))
    this.solvedCallback = () => this.sendAction('onsolved')
    this.puzzle.start()

    let [ emptyTile ] = this.element.getElementsByClassName('empty-tile')
    let ready = 2 // wait for flash and fadeout animation

    emptyTile.addEventListener('animationend', () => {
      if (--ready) {
        setTimeout(() => {
          this.puzzle.randomizeBoard()
          this.timer = this.childViews.find(v => v.element.tagName === 'GAME-TIMER')
          this.timer.start()
          this.set('startTime', this.timer.startTime)
        }, 500)
      }
    })
  },

  didRender() {
    this.setupPuzzle()
  }
})
