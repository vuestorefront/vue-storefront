export function page (path) {
  return require('core_pages/' + path + '.vue') // using webpack path alias  - core_pages = src/pages
}

export function component (path) {
  return require('core_components/' + path + '.vue') // using webpack path alias  - core_pages = src/components
}
