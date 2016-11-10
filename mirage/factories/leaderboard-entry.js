import { Factory, faker } from 'ember-cli-mirage'

export default Factory.extend({
  name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
  date: faker.date.recent,
  time: () => faker.random.number({ min: 1000, max: 999999, precision: 0.001 })
})
