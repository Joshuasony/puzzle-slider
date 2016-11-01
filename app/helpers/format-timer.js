/* eslint-disable no-magic-numbers */
import Ember from 'ember'

import {
  padStart,
  padEnd
} from 'ember-pad/utils/pad'

const { Helper: { helper } } = Ember

export function formatTimer([ time ]) {
  let milliseconds = padEnd(~~(time) % 1000, 3)
  let seconds = padStart(~~(time / 1000) % 60, 2)
  let minutes = padStart(~~(time / (1000 * 60)) % 60, 2)

  return `${minutes}:${seconds}.${milliseconds}`
}

export default helper(formatTimer)
