# CMS Magento 2 data extension

To display cms data:
 - install `snowdog/module-cms-api` composer module in your Magento 2 instance, [snowdog/module-cms-api on github](https://github.com/SnowdogApps/magento2-cms-api)
 - make sure that in `vue-storefront-api` repo the `cms-data` extension is installed

## Cms Block
To display Cms Block import CmsData component and use it in template:

`import CmsData from 'src/extensions/cms/components/CmsData'`

`<cms-data :id="5" :type="'Block'" />`
where `5` is a cms block identifier from Magento 2 instance

## Cms Page
To display Cms Page:

1. Cms page content like a block
- in custom theme create new page with custom route
- import CmsData component and use it in template:
`import CmsData from 'src/extensions/cms/components/CmsData'`

`<cms-data :id="5" :type="'Page'" />`
where `5` is a cms page identifier from Magento 2 instance

2. Cms page content as a page component:
- in custom theme `themes/<theme-name>/router/index.js` import `CmsData` component, add custom route and define props: `{id: :pageId, type: 'Page'}`, example:
```
import CmsData from 'src/extensions/cms/components/CmsData'

const routes = [
  // ... theme routes
  { name: 'custom-cms-page', path: '/custom-cms-page', component: CmsData, props: {id: 4, type: 'Page'} }
]
```
- create custom page and call the `CmsData` component there:
`<cms-data />`
