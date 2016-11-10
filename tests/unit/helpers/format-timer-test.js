import { formatTimer } from 'puzzle-slide-app/helpers/format-timer'
import { module, test } from 'qunit'

module('Unit | Helper | format timer')

test('it works', assert => {
  let tests = [
    [ 42, '00:00.420' ],
    [ 42.4, '00:00.420' ],
    [ 42.5, '00:00.420' ],
    [ 42.9, '00:00.420' ],
    [ 1000, '00:01.000' ],
    [ 1500, '00:01.500' ],
    [ 10500, '00:10.500' ],
    [ 60000, '01:00.000' ]
  ]

  tests.forEach(([ value, expected ]) =>
    assert.equal(formatTimer([ value ]), expected)
  )
})
