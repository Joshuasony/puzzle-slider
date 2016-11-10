import { moduleForComponent, /* test, */ skip } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('puzzle-slide', 'Integration | Component | puzzle slide', {
  integration: true
})

skip('it renders', function(assert) {
  this.render(hbs`
    <div id="subtoolbar"></div>
    {{puzzle-slide}}
  `)

  assert.ok(this.$().text().includes('00:00.000'))
  assert.ok(this.$().text().includes('play_arrow'))

  this.render(hbs`
    <div id="subtoolbar"></div>
    {{#puzzle-slide}}
      template block text
    {{/puzzle-slide}}
  `)

  assert.ok(this.$().text().includes('00:00.000'))
  assert.ok(this.$().text().includes('play_arrow'))
})
