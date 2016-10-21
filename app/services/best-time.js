/* eslint-disable no-magic-numbers */
import Ember from 'ember'

import {
  padStart,
  padEnd
} from 'ember-pad/utils/pad'

const { Service, computed } = Ember

export default Service.extend({
  value: computed({
    get() {
      return Number(localStorage.getItem('puzzle-slide-best-time')) || 0
    },
    set(key, value) {
      this.set('date', new Date)
      localStorage.setItem('puzzle-slide-best-time', Number(value))

      return Number(value) || 0
    }
  }),

  date: computed({
    get() {
      return Date.parse(
        localStorage.getItem('puzzle-slide-best-time-date')
      )
    },
    set(key, value) {
      localStorage.setItem('puzzle-slide-best-time-date', value)

      return value
    }
  }),

  formatted: computed('value', function() {
    let time = this.get('value')
    let milliseconds = padEnd(~~(time) % 1000, 3)
    let seconds = padStart(~~(time / 1000) % 60, 2)
    let minutes = padStart(~~(time / (1000 * 60)) % 60, 2)

    return `${minutes}:${seconds}.${milliseconds}`
  })
})
