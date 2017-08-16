export function page (path) {
  return require('../pages/' + path + '.vue')
}

export function component (path) {
  return require('../components/' + path + '.vue')
}
