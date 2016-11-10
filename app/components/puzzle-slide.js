/* eslint-disable no-magic-numbers */
import Ember from 'ember'
import Puzzle from '../game/slider'

const {
  Component,
  run,
  String: { htmlSafe }
} = Ember

export default Component.extend({
  tagName: 'puzzle-slide',
  classNames: [ 'flex', 'layout-column', 'layout-align-center-center' ],
  attributeBindings: [ 'tiles', 'puzzleStyle:style' ],
  tiles: 4,
  startTime: null,
  puzzle: null,
  timer: null,
  playing: false,

  isSafari: /Safari/.test(navigator.userAgent) &&
    !/Chrome/.test(navigator.userAgent),

  puzzleStyle: null,

  initialTileState: [
    [ [ 1, 0 ], [ 2, 3 ], [ 1, 2 ], [ 0, 1 ] ],
    [ [ 2, 2 ], [ 0, 0 ], [ 0, 2 ], [ 1, 1 ] ],
    [ [ 3, 0 ], [ 2, 0 ], [ 1, 3 ], [ 0, 3 ] ],
    [ [ 3, 1 ], [ 2, 1 ], [ 3, 3 ], [ 3, 2 ] ]

    // Twoclicksolvable
    // [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],
    // [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ] ],
    // [ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ], [ 2, 3 ] ],
    // [ [ 3, 0 ], [ 3, 3 ], [ 3, 1 ], [ 3, 2 ] ]
  ],

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
    this.set('playing', false)
    this.puzzle = new Puzzle(this.element.querySelector('puzzle-board'))

    let emptyTile = this.element.getElementsByClassName('empty-tile')[0]
    let ready = 2 // wait for flash and fadeout animation
    let start = () => {
      if (!--ready) {
        emptyTile.removeEventListener('animationend', start)
        run.later(() => {
          this.setInitialTileState()
          this.$('slider-tile').on('click.start', () => this.start())
        }, 500)
      }
    }

    emptyTile.addEventListener('animationend', start)
  },

  start() {
    this.$('slider-tile').off('click.start')
    this.puzzle.onsolved = () => this.send('solved')
    this.puzzle.onslide = tile => console.log(tile) // eslint-disable-line
    this.puzzle.start()
    this.set('playing', true)
    this.get('timer').start()
    this.set('startTime', this.get('timer.startTime'))
  },

  didInsertElement() {
    run.next(() => this.setupPuzzle())

    if (this.isSafari) {
      this.safariResizer = () => {
        let { width, height } = this.element.getBoundingClientRect()
        let size = Math.floor(Math.min(width, height) * 0.8)

        this.set('puzzleStyle',
          htmlSafe(`--puzzle-width:${size}px`)
        )
      }

      window.addEventListener('resize', this.safariResizer, false)

      run.next(this.safariResizer)
    }
  },

  willDestroyElement() {
    this.puzzle.destroy()

    if (this.isSafari) {
      window.removeEventListener('resize', this.safariResizer, false)
    }
  },

  actions: {
    toggle() {
      if (this.get('playing')) {
        this.get('timer').reset()
        this.puzzle.destroy()
        this.setupPuzzle()
      }
      else {
        this.start()
      }
    },
    solved() {
      this.get('timer').stop()

      let solveTime = this.get('timer.endTime') - this.get('startTime')

      this.sendAction('onsolved', solveTime)
    }
  }
})
