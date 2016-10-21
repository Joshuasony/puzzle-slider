import Ember from 'ember'

const { Helper: { helper } } = Ember

export function eq([ arg1, ...args ]) {
  return args.every(arg => arg === arg1)
}

export default helper(eq)
