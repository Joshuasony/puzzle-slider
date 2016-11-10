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
  })
})
