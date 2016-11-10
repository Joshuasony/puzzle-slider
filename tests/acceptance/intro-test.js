import Ember from 'ember'
import { test } from 'qunit'
import moduleForAcceptance from 'puzzle-slide-app/tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | intro')

const { $ } = Ember

test('visiting /intro', assert => {
  visit('/intro')

  andThen(() => {
    assert.equal(currentURL(), '/intro')
  })
})

test('visiting / for the first time redirects to /intro', assert => {
  localStorage.clear()

  visit('/')

  andThen(() => {
    assert.equal(currentURL(), '/intro')
  })
})

test('stepping through the intro', assert => {
  visit('/intro')

  andThen(() => {
    assert.equal(currentURL(), '/intro')

    $('.slick-dots')
      .find('li')
      .eq(2)
      .click()
  })

  andThen(() => {
    $('.md-button').click()
  })

  andThen(() => {
    assert.equal(currentURL(), '/play')
  })
})

test('visiting / after finishing the intro redirects to /play', assert => {
  localStorage.setItem('puzzle-slide-intro', '1')

  visit('/')

  andThen(() => {
    assert.equal(currentURL(), '/play')
  })
})
