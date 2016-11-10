import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('game-timer', 'Integration | Component | game timer', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{game-timer}}`)

  assert.equal(this.$().text().trim(), '00:00.000')

  // Template block usage:
  this.render(hbs`
    {{#game-timer}}
      template block text
    {{/game-timer}}
  `)

  assert.equal(this.$().text().trim(), '00:00.000')
})
