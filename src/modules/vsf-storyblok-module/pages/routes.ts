const StoryblokPage = () => import(/* webpackChunkName: "vsf-storyblok" */ './StoryblokPage.vue')
const StoryblokBlock = () => import(/* webpackChunkName: "vsf-storyblok" */ './StoryblokBlock.vue')

export const StoryblokRoutes = [
  {
    name: 'storyblok-page',
    path: '/stub',
    component: StoryblokPage
  },
  {
    name: 'storyblok-block',
    path: '/stub',
    component: StoryblokBlock
  },
  {
    name: 'storyblok-single-component-visual-editor-mode',
    path: '/storyblok-empty',
    component: StoryblokPage,
    meta: { layout: 'empty' }
  }
]
