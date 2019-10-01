const IcmaaCategoryList = () => import(/* webpackChunkName: "vsf-category-list" */ 'icmaa-category/pages/List.vue')

export default [
  { name: 'icmaa-category-list', path: '/icmaa-category-list/:parentCategoryId', component: IcmaaCategoryList }
]
