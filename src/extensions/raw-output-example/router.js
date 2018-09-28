import NoJSExample from './pages/NoJSExample.vue'
import RawOutputExample from './pages/RawOutputExample.vue'

export default [
  { path: '/raw-output-example.xml', component: RawOutputExample, meta: { layout: 'empty' } },
  { path: '/no-js.html', component: NoJSExample, meta: { layout: 'default' } }
]
