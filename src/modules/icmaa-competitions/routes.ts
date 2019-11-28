const CompetitionComponent = () => import(/* webpackChunkName: "vsf-competition" */ './pages/Competition.vue')

export default [
  { name: 'icmaa-competition', path: '/icmaa-competition/:identifier', component: CompetitionComponent }
]
