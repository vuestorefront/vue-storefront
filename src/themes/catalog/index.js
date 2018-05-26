const Home = () => import(/* webpackChunkName: "page-Home" */'./pages/Home.vue')
const Category = () => import(/* webpackChunkName: "page-Category" */'./pages/Category.vue')
const Product = () => import(/* webpackChunkName: "page-Product" */'./pages/Product.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/c/:slug', component: Category },
  { path: '/p/:parentSku/:slug/:childSku', component: Product, name: 'product' }
]

export default function (app, router, store) {
  router.addRoutes(routes)
}
