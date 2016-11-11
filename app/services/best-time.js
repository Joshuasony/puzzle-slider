import Ember from 'ember'
import { formatTimer } from '../helpers/format-timer'

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

  latest: computed({
    get() {
      return Number(localStorage.getItem('puzzle-slide-latest-time')) || 0
    },
    set(key, value) {
      localStorage.setItem('puzzle-slide-latest-time', Number(value))

      return Number(value) || 0
    }
  }),

  id: computed({
    get() {
      return localStorage.getItem('puzzle-slide-best-time-id')
    },
    set(key, value) {
      localStorage.setItem('puzzle-slide-best-time-id', value)

      return value
    }
  })
})
