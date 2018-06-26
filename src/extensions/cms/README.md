# CMS Magento 2 data extension

To display cms data:
 - install `snowdog/module-cms-api` composer module in your Magento 2 instance
 - make sure that in vue-storefront-api repo the `cms-data` extension is installed

## Cms Page
To display Cms Page:
- in custom theme `themes/<theme-name>/router/index.js` import `CmsData` component, add custom route and define props: `{id: :pageId, type: 'Page'}`, example:
```
import CmsData from 'src/extensions/cms/components/CmsData'

const routes = [
  // ... theme routes
  { name: 'custom-cms-page', path: '/custom-cms-page', component: CmsData, props: {id: 4, type: 'Page'} }
]
```
- create custom page and call the `CmsData` component there,
see `src/themes/default/pages/CustomCmsPage.vue` for detailed example.

## Cms Block
To display Cms Block use in template:

`<cms-data :id="5" :type="'Block'" />`

where `5` is a cms block identifier
