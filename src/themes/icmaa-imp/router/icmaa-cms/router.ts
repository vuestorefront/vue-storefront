// Route components
const ServiceComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-service" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/Service.vue')
const ServiceRTEComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-service-rte" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/ServiceRTE.vue')
const ServiceSizeComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-service-size" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/ServiceSize.vue')
const ServiceContactComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-service-contact" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/ServiceContact.vue')
const ServiceWiderrufComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-service-widerruf" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/ServiceWiderruf.vue')
const AffiliateComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-affiliate" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/Affiliate.vue')
const TicketsComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-tickets" */ 'theme/pages/Tickets.vue')
const FestivalComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-festival" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/Festival.vue')
const INSDComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-impericon-never-say-die" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/ImpericonNeverSayDie.vue')
const NewsletterComponent = () => import(/* webpackChunkName: "vsf-icmaa-cms-page-custom-newsletter" */ 'theme/components/core/blocks/ICMAA/Cms/Pages/Newsletter.vue')

export const routes: any = [
  // Custom cms routes, like /service or /festivals
  { name: 'service', path: '/:identifier', component: ServiceComponent },
  { name: 'service-rte', path: '/:identifier', component: ServiceRTEComponent },
  { name: 'service-size', path: '/:identifier', component: ServiceSizeComponent },
  { name: 'service-contact', path: '/:identifier', component: ServiceContactComponent },
  { name: 'service-widerruf', path: '/:identifier', component: ServiceWiderrufComponent },
  { name: 'affiliate', path: '/:identifier', component: AffiliateComponent },
  { name: 'tickets', path: '/:identifier', component: TicketsComponent },
  { name: 'festival', path: '/:identifier', component: FestivalComponent },
  { name: 'impericon-never-say-die', path: '/:identifier', component: INSDComponent },
  { name: 'newsletter', path: '/:identifier', component: NewsletterComponent }
]
