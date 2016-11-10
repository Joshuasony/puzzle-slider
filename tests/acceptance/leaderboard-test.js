import Ember from 'ember'
import { test } from 'qunit'
import moduleForAcceptance from 'puzzle-slide-app/tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | leaderboard')

const { $ } = Ember

test('visiting /leaderboard', assert => {
  visit('/leaderboard')

  andThen(() => {
    assert.equal(currentURL(), '/leaderboard')
    assert.ok($('vertical-collection').length)
  })
})
