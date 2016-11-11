import { moduleFor, test } from 'ember-qunit'

moduleFor('service:best-time', 'Unit | Service | best time', {
})

test('it holds the best time in localstorage', function(assert) {
  localStorage.clear()
  localStorage.setItem('puzzle-slide-best-time', 100)

  let service = this.subject()

  assert.equal(service.get('value'), 100)
})

test('it holds the best time date in localstorage', function(assert) {
  localStorage.clear()
  localStorage.setItem('puzzle-slide-best-time-date', '2016-11-11T16:03:00')

  let service = this.subject()

  assert.deepEqual(service.get('date'), Date.parse('2016-11-11T16:03:00'))
})

test('it sets value into localstorage', function(assert) {
  localStorage.clear()

  let service = this.subject()

  service.set('value', 100)

  assert.equal(localStorage.getItem('puzzle-slide-best-time'), '100')
})

test('it sets a date when a time is set', function(assert) {
  localStorage.clear()

  let service = this.subject()

  service.set('value', 100)

  assert.ok(service.get('date') instanceof Date, 'value gets a timestamp')
  assert.ok(localStorage.getItem('puzzle-slide-best-time-date'))
})

test('it stores the latest result', function(assert) {
  localStorage.clear()
  localStorage.setItem('puzzle-slide-latest-time', 100)

  let service = this.subject()

  assert.equal(service.get('latest'), 100)
})

test('it sets latest into localstorage', function(assert) {
  localStorage.clear()

  let service = this.subject()

  service.set('latest', 100)

  assert.equal(localStorage.getItem('puzzle-slide-latest-time'), '100')
})

test('it stores the best time id', function(assert) {
  localStorage.clear()
  localStorage.setItem('puzzle-slide-best-time-id', 100)

  let service = this.subject()

  assert.equal(service.get('id'), '100')
})

test('it sets best time id into localstorage', function(assert) {
  localStorage.clear()

  let service = this.subject()

  service.set('id', 100)

  assert.equal(localStorage.getItem('puzzle-slide-best-time-id'), '100')
})
