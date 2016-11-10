import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('app-sidenav', 'Integration | Component | app sidenav', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`
    {{#app-sidenav}}
      template block text
    {{/app-sidenav}}
  `)

  assert.equal(this.$('md-list-item').length, 4)
  assert.equal(this.$('md-card-content').text().trim(), 'template block text')
})
