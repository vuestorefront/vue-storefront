# CMS Prismic data extension
Now you can plug headless CMS to your vue storefront

#BEFORE USE!
1. Add line: `require('src/extensions/cms-prismic/index.js')` in file: `vue-storefront/src/extensions/index.js`
or for VSF 1.4: `extensionList.push(require('src/extensions/cms-prismic/index.js'))`
2. Make sure that in `vue-storefront-api` repo, the `cms-prismic` extension is installed
3. Add routes to your config/local.json file ( if you don't have one, copy default.json and name it local.json )
```
"prismic": {
      "typeAndTag": "http://localhost:8080/api/ext/cms-prismic/cmsPrismic/type/{{type}}?tag={{orderings}}",
      "contentId": "http://localhost:8080/api/ext/cms-prismic/cmsPrismic/id/{{contentId}}",
      "categorySlide": "http://localhost:8080/api/ext/cms-prismic/cmsPrismic/categorySlider/{{categorySliderId}}/{{categoryId}}"
    }
```
#To display Cms data
To display Cms Block import CmsData component and use it in template:

`import CmsPrismic from '@vue-storefront/extension-cms-prismic/components/CmsPrismic'`

Then display your content by
1. Type and tag 
 `<cms-prismic :type="'store-page'" :orderings="'store1'"/>`
 using two props:
- type = type in prismic repository of content
- orderings = tag of prismic content

2. Content Id 
 `<cms-prismic :content-id="'W5oNzSAAANpzjTfA'"/>`
 using one prop:
- contentId = id of your content

3. Category slider
 `<cms-prismic :content-id="'W5oNzSAAANpzjTfA'" :category-id="'12'"/>`
 using one prop:
- contentId = id of category slider
- categoryId = id of needed category

```
