import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('puzzle-slide', 'Integration | Component | puzzle slide', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{puzzle-slide}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#puzzle-slide}}
      template block text
    {{/puzzle-slide}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
