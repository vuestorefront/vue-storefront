import { Route } from 'vue-router'

export function beforeEach(to: Route, from: Route, next) {
  console.log('We are going to visit', to.name)
  next()
}