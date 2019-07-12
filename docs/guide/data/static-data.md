# Static Data support in Vue Storefront

In Vue Storefront, we can use CMS Static Blocks and CMS Static Pages from Magento 2.

From version 1.6, thanks to @yuriboyko  we have a better solution for static data—it's added to the Elasticsearch database and is using qraphQL query, displayed on the storefront.

### How it works?

The data are synchronized with ElasticSearch from Magento 2 on the adapter level in `mage2vuestorefront`

After synchronized basic Magento 2 data, run `node --harmony cli.js blocks` and `node --harmony cli.js pages`. Make sure you have `SnowdogApps/magento2-cms-api`, it’s required to compile Magento WYSIWYG data and variable into HTML code. Unfortunately, the widgets are not fully supported, so try to avoid them.

Static data are pumped to ElasticSearch db with entityTypes:

- `cms_block` for blocks
- `cms_page` for pages

Using a new CMS Core Module and two components (for CMS Block and for CMS Page) we easily display on storefront. Check out the example CMS Page Component.

The route for the CMS Page is set in the default theme:

```js
{ name: 'cms-page', path: '/i/:slug', component: CmsPage }])
```

So your cms page with `about_us` identifier (in Magento 2 admin URL key) will be found at: `<project_base_url>/i/about_us`

## Provide your own static data for Vue Storefront

You don’t have to use Magento 2 to provide the static data. You can pump the ElasticSearch database with your own data.

1. Add you data with appropriate types:
- `cms_block` for blocks
- `cms_page` for pages

2. Keep data schema:
- Blocks:
```
type CmsBlock @doc(description: "CMS block defines all CMS block information") {
    identifier: String @doc(description: "CMS block identifier")
    title: String @doc(description: "CMS block title")
    content: String @doc(description: "CMS block content")
    creation_time: String @doc(description: "Timestamp indicating when the CMS block was created")
    store_id: Int @doc(description: "Store Id of CMS block")
}
```
- Pages:
```
type CmsPages @doc(description: "CMS page defines all CMS page information") {
    page_id: Int @doc(description: "Id of CMS page")
    title: String @doc(description: "CMS page title")
    identifier: String @doc(description: "URL key of CMS page")
    content: String @doc(description: "CMS page content")
    content_heading: String @doc(description: "CMS page content heading")
    meta_description: String @doc(description: "CMS page meta description")
    meta_keywords: String @doc(description: "CMS page meta keywords")
    store_id: Int @doc(description: "Store Id of CMS page")
}
```

