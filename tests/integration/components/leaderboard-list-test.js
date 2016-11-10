import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

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

  assert.notOk(this.$().text().includes('template block text'))
})
