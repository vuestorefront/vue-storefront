const LandingPageComponent = () => import(/* webpackChunkName: "vsf-cms-landing-page" */ 'icmaa-cms/pages/LandingPage.vue')

export default [
  { name: 'icmaa-cms-landing-page', path: '/icmaa-cms-landingpage/:identifier', component: LandingPageComponent }
]
