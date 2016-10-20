/* eslint-disable no-magic-numbers */
import Ember from 'ember'
import Puzzle from '../game/slider'

export default Ember.Component.extend({
  tagName: 'puzzle-slide',
  classNames: [ 'layout-column', 'layout-align-start-center' ],
  attributeBindings: [ 'tiles' ],
  tiles: 4,
  startTime: null,
  puzzle: null,

  //initialTileState: [
  //  [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],
  //  [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ] ],
  //  [ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ],
  //  [ [ 3, 0 ], [ 3, 1 ], [ 3, 3 ], [ 3, 2 ] ]
  //],

  setInitialTileState() {
    if (!this.initialTileState) {
      this.puzzle.randomizeBoard()

      return
    }

    this.initialTileState.forEach((row, y) => {
      row.forEach(([ tileY, tileX ], x) => {
        this.puzzle.board[y][x].x = tileX
        this.puzzle.board[y][x].y = tileY
      })
    })
  },

  setupPuzzle() {
    this.puzzle = new Puzzle(this.element.querySelector('puzzle-board'))
    this.puzzle.solvedCallback = () => this.sendAction('onsolved')
    this.puzzle.start()

    let [ emptyTile ] = this.element.getElementsByClassName('empty-tile')
    let ready = 2 // wait for flash and fadeout animation

    emptyTile.addEventListener('animationend', () => {
      if (--ready) {
        setTimeout(() => {
          this.setInitialTileState()
          this.timer = this.childViews.find(v =>
            v.element.tagName === 'GAME-TIMER'
          )
          this.timer.start()
          this.set('startTime', this.timer.startTime)
        }, 500)
      }
    })
  },

  didRender() {
    this.setupPuzzle()
  },

  willDestroyElement() {
    this.puzzle.destroy()
  },

  actions: {
    restart() {
      this.timer.reset()
      this.puzzle.destroy()
      this.setupPuzzle()
    }
  }
})
