import Vue from 'vue'
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Counter from '../components/Counter.vue'
import Topics from '../components/Topics.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/Topics', component: Topics },
    { path: '/Counter', component: Counter },
    { path: '/About', component: About }
  ]
})

export default router
