# CMS Magento 2 data extension

To display cms data:
 - install `snowdog/module-cms-api` composer module in your Magento 2 instance
 - make sure that in vie-storefront-api repo the `cms-data` extension ins installed
 - in your local.config file add:
 ```
 "cms": {
   "endpointBlock": "http://localhost:8080/api/ext/cms-data/cmsBlock/{{cmsBlockId}}",
   "endpointPage": "http://localhost:8080/api/ext/cms-data/cmsPage/{{cmsPageId}}"
 },
 ```
the root for pages is for now:
`/cms/:pageId`
to display static block import:
`import CmsBlock from 'src/extensions/cms/components/CmsBlock.vue'`
and use component `CmsBlock`


Usage in template:
`<cms-block id="5"/>`
where `5` is a block identifier
