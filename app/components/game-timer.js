/* eslint-disable no-magic-numbers */
import Ember from 'ember'

import {
  padStart,
  padEnd
} from 'ember-pad/utils/pad'

export default Ember.Component.extend({
  tagName: 'game-timer',

  fps: 24,

  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  isUpdating: false,
  isRunning: false,
  startTime: null,
  lastFrame: null,

  init(...args) {
    this._super(...args)
    this.reset()
  },

  start() {
    this.isRunning = true
    this.startTime = performance.now()
    this.lastFrame = this.startTime
    this.run(this.startTime)
  },

  stop() {
    this.isRunning = false
  },

  reset() {
    this.stop()
    this.update(0)
  },

  run(now) {
    if (!this.isRunning) {
      return
    }

    requestAnimationFrame(t => this.run(t))

    let delta = now - this.lastFrame
    let interval = 1000 / this.fps

    if (delta > interval) {
      this.lastFrame = now - (delta % interval)
      this.update(now - this.startTime)
    }
  },

  update(diff) {
    let milliseconds = ~~(diff) % 1000
    let seconds = ~~(diff / 1000) % 60
    let minutes = ~~(diff / (1000 * 60)) % 60

    this.set('minutes', padStart(minutes, 2))
    this.set('seconds', padStart(seconds, 2))
    this.set('milliseconds', padEnd(milliseconds, 3))
  },

  willDestroyElement() {
    this.stop()
  }
})
