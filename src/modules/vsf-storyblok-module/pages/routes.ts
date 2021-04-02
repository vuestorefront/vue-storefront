const StoryblokPage = () => import(/* webpackChunkName: "vsf-storyblok" */ './Storyblok.vue')

export const StoryblokRoutes = [
  {
    name: 'about',
    path: '/about',
    component: StoryblokPage
  },
  {
    name: 'petsies-custom-stuffed-animal-manufacture',
    path: '/bulk-custom-stuffed-animal-manufacture',
    component: StoryblokPage
  },
  {
    name: 'storyblok-single-component-visual-editor-mode',
    path: '/storyblok-empty',
    component: StoryblokPage,
    meta: { layout: 'empty' }
  }
]
