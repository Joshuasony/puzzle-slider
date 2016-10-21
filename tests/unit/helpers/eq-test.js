/* eslint-disable */
import { eq } from 'puzzle-slide-app/helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.ok(eq([42, 42, 42, 42, 42]));
  assert.ok(!eq([42, 42, 42, 43, 42]));
});

