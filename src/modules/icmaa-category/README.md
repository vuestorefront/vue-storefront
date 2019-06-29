# `icmaa-category` module

Create category list landing pages.

## Configs

Add the following line to your themes `router/index.js`:

```
const IcmaaCategoryList = () => import(/* webpackChunkName: "vsf-category-list" */ 'src/modules/icmaa-category/pages/List.vue')

let routes = [
  …
  { name: 'icmaa-category-list', path: '/icmaa-category-list/:parentCategoryId', component: IcmaaCategoryList }
  …
]
```

## Todo

[ ] Add caching  
