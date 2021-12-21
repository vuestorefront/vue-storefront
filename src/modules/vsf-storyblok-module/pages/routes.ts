import Vue, { ComponentOptions, AsyncComponent } from 'vue'
import { RouteConfig } from 'vue-router/types/router'

const StoryblokPage = () => import(/* webpackChunkName: "vsf-storyblok" */ './StoryblokPage.vue')
const StoryblokBlock = () => import(/* webpackChunkName: "vsf-storyblok" */ './StoryblokBlock.vue')

export const StoryblokRoutes: RouteConfig[] = [
  {
    name: 'storyblok-page',
    path: '/stub',
    component: StoryblokPage as unknown as ComponentOptions<Vue> | typeof Vue | AsyncComponent
  },
  {
    name: 'storyblok-block',
    path: '/stub',
    component: StoryblokBlock as unknown as ComponentOptions<Vue> | typeof Vue | AsyncComponent
  },
  {
    name: 'storyblok-single-component-visual-editor-mode',
    path: '/storyblok-empty',
    component: StoryblokPage as unknown as ComponentOptions<Vue> | typeof Vue | AsyncComponent,
    meta: { layout: 'empty' }
  }
]
