const Home = () => import('src/themes/capybara/pages/Home.vue')
const Category = () => import('src/themes/capybara/pages/Category.vue')

let routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'category', path: '/c/:slug', component: Category }
]

export default routes
