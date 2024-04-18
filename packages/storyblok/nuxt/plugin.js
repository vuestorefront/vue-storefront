import Vue from 'vue'
import {StoryblokVue} from '@storyblok/vue-2'
import { integrationPlugin } from '@vue-storefront/core'

Vue.use(StoryblokVue)

export default integrationPlugin(({ integration }) => {
  integration.configure('sb', { ...<%= serialize(options) %> })
})
