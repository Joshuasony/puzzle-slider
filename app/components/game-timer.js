/* eslint-disable no-magic-numbers */
import Ember from 'ember'

import {
  padStart,
  padEnd
} from 'ember-pad/utils/pad'

const { floor } = Math

export default Ember.Component.extend({
  tagName: 'game-timer',

  fps: 24,

  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  isUpdating: false,
  startTime: null,
  lastFrame: null,

  interval: Ember.computed('fps', function() {
    return 1000 / this.get('fps')
  }),

  init(...args) {
    this._super(...args)
    this.update(0)
  },

  start() {
    this.startTime = performance.now()
    this.lastFrame = this.startTime
    this.run(this.startTime)
  },

  run(now) {
    requestAnimationFrame(t => this.run(t))

    let delta = now - this.lastFrame
    let interval = this.get('interval')

    if (delta > interval) {
      this.lastFrame = now - (delta % interval)
      this.update(now - this.startTime)
    }
  },

  update(diff) {
    let milliseconds = floor(diff) % 1000
    let seconds = floor(diff / 1000) % 60
    let minutes = floor(diff / (1000 * 60)) % 60

    this.set('minutes', padStart(minutes, 2))
    this.set('seconds', padStart(seconds, 2))
    this.set('milliseconds', padEnd(milliseconds, 3))
  }
})
