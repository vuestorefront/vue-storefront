import NoJSExample from '../pages/NoJSExample.vue'
import RawOutputExample from '../pages/RawOutputExample.vue'
import NoLayoutAppendPrependExample from '../pages/NoLayoutAppendPrependExample.vue'

export const routes = [
  { path: '/raw-output-example.xml', component: RawOutputExample, meta: { layout: 'empty' } },
  { path: '/append-prepend.html', component: NoLayoutAppendPrependExample, meta: { layout: 'empty' } },
  { path: '/no-js.html', component: NoJSExample, meta: { layout: 'default' } }
]
