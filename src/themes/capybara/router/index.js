import Home from '../pages/Home.vue'
// import config from 'config'

let routes = [
  { component: Home, path: '/' }
]

// if (!config.products.useShortCatalogUrls) {
//   routes = routes.concat([
//     { name: 'category', path: '/c/:slug', component: Category },
//   ])
// } else {
//   routes = routes.concat([
//     { name: 'category', path: '/:slug', component: Category }
//   ])
// }

export default routes
