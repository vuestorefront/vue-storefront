# CMS Magento 2 data extension

To display Cms data:
 - install `snowdog/module-cms-api` composer module in your Magento 2 instance, [snowdog/module-cms-api on github](https://github.com/SnowdogApps/magento2-cms-api)
 - make sure that in `vue-storefront-api` repo the `cms-data` extension is installed

## Cms Block
To display Cms Block import CmsData component and use it in template:

`import CmsData from 'src/modules/magento-2-cms/components/CmsData'`

we have to options to get Cms Block data:
1. by Magento `identifier`:
`<cms-data :identifier="'contact-us-info'" :type="'Block'" />`
where `contact-us-info` is a Cms Block `identifier` from Magento 2 instance

this option handles different `Store Views` - if multistore is enabled, it takes Cms Block by current Store View, if it's disabled, it set default Store View (`0`)

2. by Magento id
`<cms-data :id="5" :type="'Block'" />`
where `5` is a Magento id of Cms Block.
It doesn't handle differents Store Views so please use it only when multistore it's enabled/

## Cms Page
To display Cms Page:

1. Cms page content like a block
* in custom theme create new page with custom route
* import CmsData component and use it in template:
`import CmsData from '@vue-storefront/extension-magento2-cms/components/CmsData'`

call Cms Page like a Block using either Magento `identifier`:
`<cms-data :identifier="'about-us'" :type="'Page'" />`

or Magento `id`
`<cms-data :id="5" :type="'Page'" />`
where `5` is a cms page identifier from Magento 2 instance

Like Cms Block, the Cms Page by `identifier` handles different Store Views, Cms Page by `id` handles only Default Store View/

2. Cms page content as a page component:
- in custom theme `themes/<theme-name>/router/index.js` import `CmsData` component, add custom route and define props: `{identifier: :pageIdentifier, type: 'Page', sync: true}`, example:
```
import CmsData from '@vue-storefront/extension-magento2-cms/components/CmsData'

const routes = [
  // ... theme routes
  { name: 'cms-page-sync', path: '/cms-page-sync', component: CmsData, props: {identifier: 'about-us', type: 'Page', sync: true} }
]
```
Complete examples of usage and implementation you can find in Default theme:
1. `/cms-page-sync`, `src/themes/default/router/index.js`
