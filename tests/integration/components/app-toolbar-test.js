import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('app-toolbar', 'Integration | Component | app toolbar', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{app-toolbar}}`)

  assert.ok(this.$().text().includes('Puzzle ITC Slider'))

  // Template block usage:
  this.render(hbs`
    {{#app-toolbar}}
      template block text
    {{/app-toolbar}}
  `)

  assert.ok(this.$().text().includes('Puzzle ITC Slider'))
  assert.notOk(this.$().text().includes('template block text'))
})
