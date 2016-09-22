/* global Hammer */
/* eslint-env browser */

const { abs, floor, random } = Math

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

class Puzzle {
  constructor(canvas, solvedCallback) {
    this.canvas = canvas
    this.solvedCallback = solvedCallback

    this.tileCount = Number(canvas.getAttribute('tiles'))
    this.src = canvas.getAttribute('src')
    this.width = canvas.getAttribute('width')
    this.height = canvas.getAttribute('height')
  }

  start() {
    this.board = createBoard(this.tileCount)

    this.canvas.addEventListener('click', e => {
      if (Tile.isTile(e.target)) {
        let [ emptyTile ] = document.getElementsByClassName('empty-tile')
        let toTile = Tile.fromElement(this.board, emptyTile)
        let fromTile = Tile.fromElement(this.board, e.target)

        if (distance(fromTile.x, fromTile.y, toTile.x, toTile.y) === 1) {
          this.slideTile(toTile, fromTile)
        }
      }
    }, false)

    if (typeof Hammer !== 'undefined') {
      let mc = new Hammer.Manager(this.canvas, {
        recognizers: [
          [
            Hammer.Swipe, {
              direction:
                Hammer.DIRECTION_LEFT  |
                Hammer.DIRECTION_RIGHT |
                Hammer.DIRECTION_UP    |
                Hammer.DIRECTION_DOWN
            }
          ]
        ]
      })

      mc.on('swipe', e => {
        let [ emptyTile ] = document.getElementsByClassName('empty-tile')
        let toTile = Tile.fromElement(this.board, emptyTile)
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

        let fromTile = this.board[y] && this.board[y][x]

        if (fromTile) {
          this.slideTile(toTile, fromTile)
        }
      })
    }

    randomizePuzzle(this)
    updateBoard(this.board)

    if (!this.canvas.children.length) {
      this.canvas.style.setProperty('--tiles', this.tileCount)

      if (this.src) {
        this.canvas.style.setProperty('--puzzle-src', `url(${this.src}`)
      }

      if (this.width) {
        this.canvas.style.setProperty('--puzzle-width', `${this.width}px`)
      }
      if (this.height) {
        this.canvas.style.setProperty('--puzzle-height', `${this.height}px`)
      }

      this.canvas.appendChild(
        this.board
          .reduce((acc, val) => acc.concat(val), [])
          .reduce(
            (tiles, tile) => (tiles.appendChild(tile.el), tiles),
            document.createDocumentFragment()
          )
      )
    }
  }

  slideTile(toTile, fromTile) {
    if (!isSolved(this.board)) {
      this.board[toTile.y][toTile.x] = fromTile
      this.board[fromTile.y][fromTile.x] = toTile

      updateBoard(this.board)

      if (isSolved(this.board)) {
        this.solvedCallback.call(null)
      }
    }
  }
}

function updateBoard(board) {
  board.forEach((row, posY) => {
    row.forEach((tile, posX) => {
      if (tile.x !== posX) tile.x = posX
      if (tile.y !== posY) tile.y = posY
    })
  })
}

function randomizePuzzle(puzzle) {
  const { board } = puzzle
  const tileCount = board.length
  const empty = board[tileCount - 1][tileCount - 1]

  randomize()

  if (!isSolvable()) {
    if (empty.y === 0 && empty.x <= 1) {
      swapTiles(tileCount - 2, tileCount - 1, tileCount - 1, tileCount - 1)
    }
    else {
      swapTiles(0, 0, 1, 0)
    }

    if (!isSolvable()) {
      // This occurred only once to me, retry randomizing
      randomizePuzzle(puzzle)
    }
  }

  function randomize() {
    let i = tileCount * tileCount - 1

    while (i > 0) {
      let j = floor(random() * i)
      let xi = i % tileCount
      let yi = floor(i / tileCount)
      let xj = j % tileCount
      let yj = floor(j / tileCount)

      swapTiles(xi, yi, xj, yj)
      i--
    }
  }

  function swapTiles(x1, y1, x2, y2) {
    [ board[y2][x2], board[y1][x1] ] = [ board[y1][x1], board[y2][x2] ]
  }

  function countInversions(i, j) {
    let inversions = 0
    let tileNum = j * tileCount + i
    let lastTile = tileCount * tileCount
    let tileValue = board[i][j].y * tileCount + board[i][j].x

    for (let q = tileNum + 1; q < lastTile; q++) {
      let k = q % tileCount
      let l = floor(q / tileCount)
      let compValue = board[k][l].y * tileCount + board[k][l].x

      if (tileValue > compValue && tileValue !== lastTile - 1) {
        inversions++
      }
    }

    return inversions
  }

  function sumInversions() {
    let inversions = 0

    for (let j = 0; j < tileCount; j++) {
      for (let i = 0; i < tileCount; i++) {
        inversions += countInversions(i, j)
      }
    }

    return inversions
  }

  function isSolvable() {
    return !((tileCount % 2 ?
        sumInversions() % 2 :
        sumInversions() + tileCount - (empty.y + 1)) % 2)
  }
}

function distance(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2)
}

function eq(val, ...args) {
  return args.every(v => v === val)
}

function a(len, mapper) {
  return Array.apply(null, Array(len)).map(mapper)
}

function main() {
  const [ canvas ] = document.getElementsByTagName('puzzle-board')

  new Puzzle(canvas).start()
}

main()
