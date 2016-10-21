import Ember from 'ember'

const { Service, computed } = Ember

export default Service.extend({
  isCompleted: computed({
    get() {
      return Boolean(Number(localStorage.getItem('puzzle-slide-intro')))
    },
    set(key, value) {
      localStorage.setItem('puzzle-slide-intro', Number(value))

      return Boolean(Number(value))
    }
  })
})
