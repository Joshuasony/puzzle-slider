import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import wait from 'ember-test-helpers/wait'

moduleForComponent('leaderboard-list', 'Integration | Component | leaderboard list', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{leaderboard-list}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#leaderboard-list}}
      template block text
    {{/leaderboard-list}}
  `)

  assert.notOk(this.$().text().indexOf('template block text') > -1)
})

test('it highlights my best time', function(assert) {
  this.set('bestTime', { id: 42 })
  this.set('items', [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 42 },
    { id: 5 },
    { id: 6 }
  ])

  this.render(hbs`{{leaderboard-list items=items bestTime=bestTime}}`)

  return wait().then(() => {
    assert.equal(this.$('md-list-item').length, 6)
    assert.ok(this.$('md-list-item').eq(3).hasClass('leaderboard-mybest'), 5)
  })
})
