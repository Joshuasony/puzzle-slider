import { eq } from 'puzzle-slide-app/helpers/eq'
import { module, test } from 'qunit'

module('Unit | Helper | eq')

test('it works', assert => {
  assert.ok(eq([ 42, 42, 42, 42, 42 ]))
  assert.notOk(eq([ 42, 42, 42, 43, 42 ]))
})
