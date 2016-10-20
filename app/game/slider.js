/* global Hammer */
/* eslint-env browser */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable no-extend-native */

const { abs, floor, random } = Math

if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function ArrayFillPolyfill(value) {
      for (let i = 0; i < this.length; i++) {
        this[i] = value
      }

      return this
    }
  })
}

class Tile {
  constructor(x, y, empty) {
    this.el = document.createElement('slider-tile')
    this.el.style.setProperty('--tile-x', x)
    this.el.style.setProperty('--tile-y', y)
    this.el.classList.toggle('empty-tile', empty)

    this.x = this._x = x
    this.y = this._y = y
  }

  get isValid() {
    return this.x === this._x && this.y === this._y
  }

  get x() {
    return Number(this.el.style.getPropertyValue('--tile-pos-x'))
  }

  set x(val) {
    this.el.style.setProperty('--tile-pos-x', val)
  }

  get y() {
    return Number(this.el.style.getPropertyValue('--tile-pos-y'))
  }

  set y(val) {
    this.el.style.setProperty('--tile-pos-y', val)
  }
}

Tile.fromElement = function(board, el) {
  return board[el.style.getPropertyValue('--tile-pos-y')]
              [el.style.getPropertyValue('--tile-pos-x')]
}

Tile.isTile = el => Boolean(el.tagName) && el.tagName === 'SLIDER-TILE'

const createBoard = count =>
  a(count, (_r, y) => a(count, (_t, x) => new Tile(x, y, eq(count - 1, x, y))))

const isSolved = board =>
  board.every(row => row.every(tile => tile.isValid))

export default class Puzzle {
  constructor(canvas) {
    this.canvas = canvas

    this.tileCount = Number(canvas.getAttribute('tiles'))
    this.src = canvas.getAttribute('src')
    this.width = canvas.getAttribute('width')
    this.height = canvas.getAttribute('height')
    this.clickHandler = this.clickHandler.bind(this)

    this.board = createBoard(this.tileCount)
  }

  destroy() {
    this.canvas.classList.remove('solved')
    this.canvas.innerHTML = ''
    this.canvas.removeEventListener('click', this.clickHandler, false)
  }

  start() {
    this.canvas.addEventListener('click', this.clickHandler, false)

    if (typeof Hammer !== 'undefined') {
      setupSwipes(this)
    }

    this.updateBoard()

    if (!this.canvas.children.length) {
      setupStyleProperties(this)

      this.canvas.appendChild(
        this.board
          .reduce((acc, val) => acc.concat(val), [])
          .reduce(
            (tiles, tile) => (tiles.appendChild(tile.el), tiles),
            document.createDocumentFragment()
          )
      )
    }

    return this
  }

  clickHandler(e) {
    if (Tile.isTile(e.target)) {
      let [ emptyTile ] = this.canvas.getElementsByClassName('empty-tile')
      let toTile = Tile.fromElement(this.board, emptyTile)
      let fromTile = Tile.fromElement(this.board, e.target)

      if (distance(fromTile.x, fromTile.y, toTile.x, toTile.y) === 1) {
        this.slideTile(toTile, fromTile)
      }
    }
  }

  slideTile(toTile, fromTile) {
    if (!isSolved(this.board)) {
      this.board[toTile.y][toTile.x] = fromTile
      this.board[fromTile.y][fromTile.x] = toTile

      this.updateBoard()

      if (isSolved(this.board)) {
        this.canvas.classList.add('solved')
        this.solvedCallback.call(null)
      }
    }
  }

  updateBoard(board) {
    if (board) {
      this.board = board
    }

    this.board.forEach((row, posY) => {
      row.forEach((tile, posX) => {
        if (tile.x !== posX) tile.x = posX
        if (tile.y !== posY) tile.y = posY
      })
    })
  }

  randomizeBoard() {
    const { board } = this
    const count = board.length
    const empty = board[count - 1][count - 1]

    randomize()

    if (!isSolvable()) {
      if (empty.y === 0 && empty.x <= 1) {
        swapTiles(count - 2, count - 1, count - 1, count - 1)
      }
      else {
        swapTiles(0, 0, 1, 0)
      }

      if (!isSolvable()) {
        // This occurred only once to me, retry randomizing
        this.randomizeBoard()
      }
    }

    this.updateBoard()

    function randomize() {
      let i = count * count - 1

      while (i > 0) {
        let j = floor(random() * i)
        let xi = i % count
        let yi = floor(i / count)
        let xj = j % count
        let yj = floor(j / count)

        swapTiles(xi, yi, xj, yj)
        i--
      }
    }

    function swapTiles(x1, y1, x2, y2) {
      [ board[y2][x2], board[y1][x1] ] = [ board[y1][x1], board[y2][x2] ]
    }

    function countInversions(i, j) {
      let inversions = 0
      let tileNum = j * count + i
      let lastTile = count * count
      let tileValue = board[i][j].y * count + board[i][j].x

      for (let q = tileNum + 1; q < lastTile; q++) {
        let k = q % count
        let l = floor(q / count)
        let compValue = board[k][l].y * count + board[k][l].x

        if (tileValue > compValue && tileValue !== lastTile - 1) {
          inversions++
        }
      }

      return inversions
    }

    function sumInversions() {
      let inversions = 0

      for (let j = 0; j < count; j++) {
        for (let i = 0; i < count; i++) {
          inversions += countInversions(i, j)
        }
      }

      return inversions
    }

    function isSolvable() {
      return !((count % 2 ?
          sumInversions() % 2 :
          sumInversions() + count - (empty.y + 1)) % 2)
    }
  }
}

function setupStyleProperties(puzzle) {
  let { canvas: { style } } = puzzle

  style.setProperty('--tiles', puzzle.tileCount)

  if (puzzle.src) {
    style.setProperty('--puzzle-src', `url(${puzzle.src}`)
  }

  if (puzzle.width) {
    style.setProperty('--puzzle-width', `${puzzle.width}px`)
  }
  if (puzzle.height) {
    style.setProperty('--puzzle-height', `${puzzle.height}px`)
  }
}

function setupSwipes(puzzle) {
  let mc = new Hammer.Manager(puzzle.canvas, {
    recognizers: [
      [
        Hammer.Swipe, {
          direction:
            Hammer.DIRECTION_LEFT |
            Hammer.DIRECTION_RIGHT |
            Hammer.DIRECTION_UP |
            Hammer.DIRECTION_DOWN
        }
      ]
    ]
  })

  mc.on('swipe', e => { // eslint-disable-line complexity
    let [ emptyTile ] = this.canvas.getElementsByClassName('empty-tile')
    let toTile = Tile.fromElement(puzzle.board, emptyTile)
    let { x, y } = toTile

    switch (e.direction) {
      case Hammer.DIRECTION_LEFT:
        x++
        break
      case Hammer.DIRECTION_RIGHT:
        x--
        break
      case Hammer.DIRECTION_UP:
        y++
        break
      case Hammer.DIRECTION_DOWN:
        y--
        break
      default:
        return
    }

    let fromTile = puzzle.board[y] && puzzle.board[y][x]

    if (fromTile) {
      puzzle.slideTile(toTile, fromTile)
    }
  })
}

function distance(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2)
}

function eq(val, ...args) {
  return args.every(v => v === val)
}

function a(len, mapper) {
  return Array(len).fill().map(mapper)
}
