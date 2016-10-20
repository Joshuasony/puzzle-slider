/* eslint-disable no-magic-numbers */
import Ember from 'ember'

import {
  padStart,
  padEnd
} from 'ember-pad/utils/pad'

const { Component } = Ember

const isAndroid = /Android/.test(navigator.userAgent)
const isAndroid4 = /Android 4\./.test(navigator.userAgent)
const isFirefox = /Firefox/.test(navigator.userAgent)

export default Component.extend({
  tagName: 'game-timer',

  fps: isAndroid || isFirefox ? 18 : 24,

  minutes: 0,
  seconds: 0,
  _minutes: '00',
  _seconds: '00',
  isUpdating: false,
  isRunning: false,
  startTime: null,
  endTime: null,
  lastFrame: null,
  msEl: null,

  animate: !isAndroid4,

  start() {
    this.isRunning = true
    this.startTime = performance.now()
    this.lastFrame = this.startTime
    this.run(this.startTime)
  },

  stop() {
    this.isRunning = false
    this.endTime = performance.now()
  },

  reset() {
    this.isRunning = false
    this.endTime = null
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

    if (minutes !== this.minutes) {
      this.minutes = minutes
      this.set('_minutes', padStart(minutes, 2))
    }

    if (seconds !== this.seconds) {
      this.seconds = seconds
      this.set('_seconds', padStart(seconds, 2))
    }

    this.msEl.textContent = padEnd(milliseconds, 3)
  },

  willDestroyElement() {
    this.stop()
  },

  didInsertElement() {
    this.msEl = this.element.getElementsByClassName('ms')[0]
  }
})
