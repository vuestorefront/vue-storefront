import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo, {})

export default function (ctx, inject) {
    inject('scrollTo', VueScrollTo.scrollTo)
}
