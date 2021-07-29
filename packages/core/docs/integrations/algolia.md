# Algolia <Badge text="Opensource" type="info" />

## Introduction

This package provides integration with [Algolia](https://www.algolia.com/).

## Installation

1. Provide data in certain shape to algolia
2. Configure indices
3. Configure it in middleware

### Existing adapter
Depending on platform you want to connect with you will need dedicated adapter. We share an adapter for commercetools out of the box. To work with it, you have 
### Indexing products in Algolia

### Basic Algolia configuration
Currently, indexer provided by ChangeCX is indexing both categories and products in two separated indices. 

#### Make categories searchable
At first we have to make categories searchable so we will be able to find category corresponding for the current route.

1. In Algolia's dashboard, open index with your categories and go to **Configuration** tab.
2. Open **Facets** settings and under `Attributes for faceting` section add:
- `path.de`,
- `path.en`,
- `path.it`,
- `slug.de`,
- `slug.en`,
- `slug.it`.
3. Click **Review and Save Settings** button. Then confirm by clicking **Save Settings** button.

### Make products searchable by categories
We will filter products by category's slug on category's view. That's why we need to add possibility to filter products by `categories.slug` param. Let's do it.

1. In Algolia's dashboard, open index with your products and go to **Configuration** tab.
2. Open **Facets** settings and under `Attributes for faceting` section add:
- `categories.slug`.
3. Click **Review and Save Settings** button. Then confirm by clicking **Save Settings** button.

### Adding faceted filters for products
If we want to implement [faceted filtering](https://www.prefixbox.com/blog/faceted-filtering/) for products we have to register desired attributes as `attributesForFaceting`.

1. In Algolia's dashboard, open index with your products and go to **Configuration** tab.
2. Open **Facets** settings and under `Attributes for faceting` section add attributes you want to filter by.
3. Click **Review and Save Settings** button. Then confirm by clicking **Save Settings** button.

#### Adding sort for products
In order to implement sort, Algolia requires from us to create a replica of main products' index. 

1. In Algolia's dashboard, open index with your products and go to **Replicas** tab.
2. Click `Create Replica Index` button.
3. Name your replica's index, select `Standard Replica`, click `Create replica`.
4. Click `Review and Save Settings` button. Then confirm by clicking **Save Settings** button.
5. Switch to newly created index and go to **Configuration** tab.
6. Open **Ranking and Sorting** settings and click `Add sort-by attribute`.
7. Provide field you want to sort by. Then you can also specify if it is *Descending* or *Ascending*.
8. Click **Review and Save Settings** button. Then confirm by clicking **Save Settings** button.
9. Go to **Browse** tab and make sure products are sorted in a way they supposed to.

#### No synchronization of `attributesForFaceting` in replicas
Be careful, if you are modifying `attributesForFaceting` in original index - these changes won't be applied automaticaly in replicas - you have to apply there too manually. 

### Implementing in VSF2
#### Installation
#### Configuration
#### Category's view
#### Search
#### Breadcrumbs on Product's view (???)