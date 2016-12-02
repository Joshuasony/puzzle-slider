import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import wait from 'ember-test-helpers/wait'

moduleForComponent('puzzle-slide', 'Integration | Component | puzzle slide', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide}}
  `)

  return wait().then(() => {
    assert.ok(this.$().text().indexOf('00:00.000') > -1)
    assert.ok(this.$().text().indexOf('play_arrow') > -1)
    assert.ok(this.$('puzzle-board').length)
    assert.equal(this.$('slider-tile').length, 16)
  })
})

test('it can set the tile amount', function(assert) {
  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide tiles=3 initialTileState=null}}
  `)

  return wait().then(() => {
    assert.equal(this.$('slider-tile').length, 9)
  })
})

test('it can set the initial puzzle state', function(assert) {
  this.set('state', [
    [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
    [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
    [ [ 2, 0 ], [ 2, 2 ], [ 2, 1 ] ]
  ])

  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide tiles=3 initialTileState=state}}
  `)

  return wait()
    .then(() => {
      let expectedState = [
        [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
        [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
        [ [ 2, 0 ], [ 2, 2 ], [ 2, 1 ] ]
      ]

      let tiles = this.$('slider-tile').toArray()
      let i = 0

      expectedState.forEach((row, y) =>
        row.forEach(([ posY, posX ], x) => {
          let tile = tiles[i++]

          assert.equal(
            tile.getAttribute('style'),
            `--tile-x:${x}; --tile-y:${y}; ` +
            `--tile-pos-x:${posX}; --tile-pos-y:${posY};`
          )
        })
      )
    })
})

test('it shuffles initial state if none was given', function(assert) {
  this.set('state', null)

  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide tiles=3 initialTileState=state}}
  `)

  return wait()
    .then(() => {
      let notExpectedState = [
        [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
        [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
        [ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ] ]
      ]

      let tiles = this.$('slider-tile').toArray()
      let i = 0
      let state = []

      notExpectedState.forEach(row => {
        let actualRow = []

        state.push(actualRow)
        row.forEach(() => {
          let tile = tiles[i++]

          actualRow.push([
            tile.style.getPropertyValue('--tile-pos-y') | 0,
            tile.style.getPropertyValue('--tile-pos-x') | 0
          ])
        })
      })

      assert.notDeepEqual(state, notExpectedState)
    })
})

test('it emits slide events', function(assert) {
  let clickedTile = {}

  this.set('playing', false)

  this.set('state', [
    [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
    [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
    [ [ 2, 2 ], [ 2, 0 ], [ 2, 1 ] ]
  ])

  this.set('onslide', tile => clickedTile = tile)

  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide
      playing = playing
      tiles = 3
      initialTileState = state
      onslide = (action onslide)
      }}
  `)

  return wait()
    .then(() => {
      this.$('slider-tile').eq(3).click()

      assert.ok(this.get('playing'), 'sliding a tile starts the game')
      assert.deepEqual(clickedTile, [ 0, 1 ])
    })
})

test('it emits solved events', function(assert) {
  let solveTime

  this.set('state', [
    [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
    [ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
    [ [ 2, 2 ], [ 2, 0 ], [ 2, 1 ] ]
  ])

  this.set('onsolved', time => solveTime = time)

  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide tiles=3 initialTileState=state onsolved=(action onsolved)}}
  `)

  return wait()
    .then(() => {
      this.$('slider-tile').eq(6).click()
      this.$('slider-tile').eq(7).click()

      assert.ok(solveTime)
      assert.ok(Number.isFinite(solveTime))
    })
})

test('the play button', function(assert) {
  this.set('playing', false)

  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide playing=playing}}
  `)

  return wait()
    .then(() => {
      this.$('[md-font-icon="play-arrow"]').click()
      assert.ok(
        this.get('playing'),
        'clicking the play button starts the game'
      )
      return wait()
    })
    .then(() => {
      this.$('[md-font-icon="replay"]').click()
      assert.notOk(
        this.get('playing'),
        'clicking the replay button stops the game'
      )
      return wait()
    })
    .then(() => {
      this.$('[md-font-icon="play-arrow"]').click()
      assert.ok(
        this.get('playing'),
        'clicking the play button restarts the game'
      )
    })
})
