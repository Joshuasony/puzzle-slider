'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-env browser */

var abs = Math.abs;
var floor = Math.floor;
var random = Math.random;

var Tile = function () {
  function Tile(x, y, empty) {
    _classCallCheck(this, Tile);

    this.el = document.createElement('slider-tile');
    this.el.style.setProperty('--tile-x', x);
    this.el.style.setProperty('--tile-y', y);
    this.el.classList.toggle('empty-tile', empty);

    this.x = this._x = x;
    this.y = this._y = y;
  }

  _createClass(Tile, [{
    key: 'isValid',
    get: function get() {
      return this.x === this._x && this.y === this._y;
    }
  }, {
    key: 'x',
    get: function get() {
      return Number(this.el.style.getPropertyValue('--tile-pos-x'));
    },
    set: function set(val) {
      this.el.style.setProperty('--tile-pos-x', val);
    }
  }, {
    key: 'y',
    get: function get() {
      return Number(this.el.style.getPropertyValue('--tile-pos-y'));
    },
    set: function set(val) {
      this.el.style.setProperty('--tile-pos-y', val);
    }
  }]);

  return Tile;
}();

Tile.fromElement = function (board, el) {
  return board[el.style.getPropertyValue('--tile-pos-y')][el.style.getPropertyValue('--tile-pos-x')];
};

Tile.isTile = function (el) {
  return Boolean(el.tagName) && el.tagName === 'SLIDER-TILE';
};

var createBoard = function createBoard(count) {
  return a(count, function (_r, y) {
    return a(count, function (_t, x) {
      return new Tile(x, y, eq(count - 1, x, y));
    });
  });
};

var isSolved = function isSolved(board) {
  return board.every(function (row) {
    return row.every(function (tile) {
      return tile.isValid;
    });
  });
};

var Puzzle = function () {
  function Puzzle(canvas, tileCount, solvedCallback) {
    _classCallCheck(this, Puzzle);

    this.canvas = canvas;
    this.tileCount = tileCount;
    this.solvedCallback = solvedCallback;

    this.src = canvas.getAttribute('src');
  }

  Puzzle.prototype.start = function start() {
    var _this = this;

    this.board = createBoard(this.tileCount);

    this.canvas.addEventListener('click', function (e) {
      if (Tile.isTile(e.target)) {
        var _document$getElements = document.getElementsByClassName('empty-tile');

        var emptyTile = _document$getElements[0];

        var toTile = Tile.fromElement(_this.board, emptyTile);
        var fromTile = Tile.fromElement(_this.board, e.target);

        if (distance(fromTile.x, fromTile.y, toTile.x, toTile.y) === 1) {
          _this.slideTile(toTile, fromTile);
        }
      }
    }, false);

    randomizePuzzle(this);
    updateBoard(this.board);

    if (!this.canvas.children.length) {
      this.canvas.style.setProperty('--tiles', this.board.length);

      if (this.src) {
        this.canvas.style.setProperty('--puzzle-src', 'url(' + this.src);
      }

      this.canvas.appendChild(this.board.reduce(function (acc, val) {
        return acc.concat(val);
      }, []).reduce(function (tiles, tile) {
        return tiles.appendChild(tile.el), tiles;
      }, document.createDocumentFragment()));
    }
  };

  Puzzle.prototype.slideTile = function slideTile(toTile, fromTile) {
    if (!isSolved(this.board)) {
      this.board[toTile.y][toTile.x] = fromTile;
      this.board[fromTile.y][fromTile.x] = toTile;

      updateBoard(this.board);

      if (isSolved(this.board)) {
        this.solvedCallback.call(null);
      }
    }
  };

  return Puzzle;
}();

function updateBoard(board) {
  board.forEach(function (row, posY) {
    row.forEach(function (tile, posX) {
      if (tile.x !== posX) tile.x = posX;
      if (tile.y !== posY) tile.y = posY;
    });
  });
}

function randomizePuzzle(puzzle) {
  var board = puzzle.board;

  var tileCount = board.length;
  var empty = board[tileCount - 1][tileCount - 1];

  randomize();

  if (!isSolvable()) {
    if (empty.y === 0 && empty.x <= 1) {
      swapTiles(tileCount - 2, tileCount - 1, tileCount - 1, tileCount - 1);
    } else {
      swapTiles(0, 0, 1, 0);
    }

    if (!isSolvable()) {
      // This occurred only once to me, retry randomizing
      randomizePuzzle(puzzle);
    }
  }

  function randomize() {
    var i = tileCount * tileCount - 1;

    while (i > 0) {
      var j = floor(random() * i);
      var xi = i % tileCount;
      var yi = floor(i / tileCount);
      var xj = j % tileCount;
      var yj = floor(j / tileCount);

      swapTiles(xi, yi, xj, yj);
      i--;
    }
  }

  function swapTiles(x1, y1, x2, y2) {
    var _ref = [board[y1][x1], board[y2][x2]];
    board[y2][x2] = _ref[0];
    board[y1][x1] = _ref[1];
  }

  function countInversions(i, j) {
    var inversions = 0;
    var tileNum = j * tileCount + i;
    var lastTile = tileCount * tileCount;
    var tileValue = board[i][j].y * tileCount + board[i][j].x;

    for (var q = tileNum + 1; q < lastTile; q++) {
      var k = q % tileCount;
      var l = floor(q / tileCount);
      var compValue = board[k][l].y * tileCount + board[k][l].x;

      if (tileValue > compValue && tileValue !== lastTile - 1) {
        inversions++;
      }
    }

    return inversions;
  }

  function sumInversions() {
    var inversions = 0;

    for (var j = 0; j < tileCount; j++) {
      for (var i = 0; i < tileCount; i++) {
        inversions += countInversions(i, j);
      }
    }

    return inversions;
  }

  function isSolvable() {
    return !((tileCount % 2 ? sumInversions() % 2 : sumInversions() + tileCount - (empty.y + 1)) % 2);
  }
}

function distance(x1, y1, x2, y2) {
  return abs(x1 - x2) + abs(y1 - y2);
}

function eq(val) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.every(function (v) {
    return v === val;
  });
}

function a(len, mapper) {
  return Array.apply(null, Array(len)).map(mapper);
}

function main() {
  var _document$getElements2 = document.getElementsByTagName('puzzle-board');

  var canvas = _document$getElements2[0];

  var tileCount = Number(canvas.getAttribute('tiles'));

  new Puzzle(canvas, tileCount).start();
}

main();

