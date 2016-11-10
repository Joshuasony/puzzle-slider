import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('app-toolbar', 'Integration | Component | app toolbar', {
  integration: true
})

test('it renders', function(assert) {
  this.render(hbs`{{app-toolbar}}`)

  assert.ok(this.$().text().indexOf('Puzzle ITC Slider') > -1)

  this.render(hbs`
    {{#app-toolbar}}
      template block text
    {{/app-toolbar}}
  `)

  assert.ok(this.$().text().indexOf('Puzzle ITC Slider') > -1)
  assert.notOk(this.$().text().indexOf('template block text') > -1)
})

test('it can toggle the sidebar', function(assert) {
  let toggledSidebar = false

  this.set('paperSidenav', {
    toggle() {
      toggledSidebar = true
    }
  })
  this.render(hbs`{{app-toolbar paperSidenav=paperSidenav}}`)

  this.$('.md-button').click()

  assert.ok(toggledSidebar)
})
