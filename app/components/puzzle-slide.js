/* eslint-disable no-magic-numbers */
import Ember from 'ember'
import Puzzle from '../game/slider'

const { Component, run } = Ember

export default Component.extend({
  tagName: 'puzzle-slide',
  classNames: [ 'layout-column', 'layout-align-start-center' ],
  attributeBindings: [ 'tiles' ],
  tiles: 4,
  startTime: null,
  puzzle: null,

  // initialTileState: [
  //   [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],
  //   [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ] ],
  //   [ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ],
  //   [ [ 3, 0 ], [ 3, 1 ], [ 3, 3 ], [ 3, 2 ] ]
  // ],

  setInitialTileState() {
    if (!this.initialTileState) {
      this.puzzle.randomizeBoard()

      return
    }

    let board = Array(this.tiles).fill().map(() => Array(this.tiles))

    this.initialTileState.forEach((row, y) =>
      row.forEach(([ tileY, tileX ], x) => {
        board[y][x] = this.puzzle.board[tileY][tileX]
      })
    )
    this.puzzle.updateBoard(board)
  },

  setupPuzzle() {
    this.puzzle = new Puzzle(this.element.querySelector('puzzle-board'))
    this.puzzle.solvedCallback = () => this.send('solved')
    this.puzzle.start()

    let [ emptyTile ] = this.element.getElementsByClassName('empty-tile')
    let ready = 2 // wait for flash and fadeout animation
    let start = () => {
      if (--ready) {
        emptyTile.removeEventListener('animationend', start)

        setTimeout(run.bind(() => {
          this.setInitialTileState()
          this.timer.start()
          this.set('startTime', this.timer.startTime)
        }), 500)
      }
    }

    emptyTile.addEventListener('animationend', start)
  },

  didRender() {
    this.timer = this.childViews.find(v =>
      v.element.tagName === 'GAME-TIMER'
    )
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
    },
    solved() {
      this.timer.stop()
      this.sendAction('onsolved', this.timer.endTime)
    }
  }
})
