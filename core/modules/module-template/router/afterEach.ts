import { Route } from 'vue-router'

export function afterEach(to: Route, from: Route) {
  console.log(`We have just entered ${to.name} from ${from.name}.`)
}