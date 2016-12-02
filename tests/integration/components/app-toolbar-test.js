import Ember from 'ember'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

const { Service } = Ember

moduleForComponent('app-toolbar', 'Integration | Component | app toolbar', {
  integration: true,

  beforeEach() {
    this.register('service:paper-sidenav', Service.extend({
      toggled: false,
      toggle() {
        this.toggled = !this.toggled
      }
    }))
    this.inject.service('paper-sidenav', { as: 'paperSidenav' })
  }
})

test('it renders', function(assert) {
  this.render(hbs`{{app-toolbar}}`)

  assert.ok(this.$().text().indexOf('Puzzle Slider') > -1)

  this.render(hbs`
    {{#app-toolbar currentRouteName="play"}}
      template block text
    {{/app-toolbar}}
  `)

  assert.ok(this.$().text().indexOf('Puzzle Slider') > -1)
  assert.notOk(this.$().text().indexOf('template block text') > -1)
})

test('it can toggle the sidebar', function(assert) {
  this.render(hbs`{{app-toolbar currentRouteName="play"}}`)

  assert.notOk(this.get('paperSidenav.toggled'))

  this.$('.md-button').click()

  assert.ok(this.get('paperSidenav.toggled'))
})
