# CMS Magento 2 data extension

To display cms data:
 - install `snowdog/module-cms-api` composer module in your Magento 2 instance
 - make sure that in vue-storefront-api repo the `cms-data` extension is installed
 - in your local.config file add:
 ```
 "cms": {
   "endpoint": "http://localhost:8080/api/ext/cms-data/cms{{type}}/{{cmsId}}"
 },
 ```
## Cms Page
To display CMS Page:
- in custom theme `themes/<theme-name>/index.js` import CmsPage component, add custom route and define page id in props, example:
```
import CmsPage from 'src/extensions/cms/components/CmsPage'

const routes = [
  // ... theme routes
  { name: 'custom-cms-page', path: '/custom-cms-page', component: CmsPage, props: {id: 4} }
]
```
- create custom page and call the `CmsPage` component there,
see `src/themes/default/pages/CustomCmsPage.vue`

## Cms Block
To display CmsBlock use in template:

`<cms-block :id="5"/>`

where `5` is a block identifier
