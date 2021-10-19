import Vue from 'vue'
import StoryblokVue from 'storyblok-vue'
import { integrationPlugin } from '@vue-storefront/core'

Vue.use(StoryblokVue)

export default integrationPlugin(({ integration }) => {
  integration.configure('sb', { ...<%= serialize(options) %> })
})
