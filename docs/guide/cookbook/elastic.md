# Ch 2. Elasticsearch in the VSF context

In this chapter, we are going to cover : 
[[toc]]

## 0. Introduction
Elasticsearch is the choice of _Vue Storefront_ for its data store as naturally as there must be reasons behind this. 
By its name, you can deduce _Elastic_ to mean scalable, extendable, distributed and type-agnostic which is great in this big data era while _Search_ implies indexing, filter, _Read_ among _CRUD_ which shows its focus. So far so good, then, what is all this fuss about Elasticsearch? 

Elasticsearch is a full-text search and analysis engine based on Apache Lucene by its definition. It employs inverted index which means _documents_ are indexed via all the unique _terms_ occurred and the ability to take advantage of assembling the per-field data structures can explain why Elasticsearch is ultrafast. 

The other strong point is, notably, it's inborn distributed. Experience from a single node elasticsearch and multiple clusters of it is almost identical and doing so is painless as it works out of the box. There are virtually tons of points to make for why Elasticsearch is your elected mid-stop between datahouse and storefront. Now let's move on to how it's implemented in _Vue Storefront_. 

_Vue Storefront_ defines itself backend-agnostic PWA e-commerce solution where _Vue Storefront_ is a storefront as the name dictates, and Elasticsearch works as a datastore for _catalog_ and its sibling data such as _taxrule_, _products_ and so on. When a storefront requests information about a product, then it fetches _index_ of _documents_ about the _term_ queried from Elasticsearch without traversing it to the source web store (be it Magento) so it skips all the heavy loading of the store whose database behind also is not concered. 

Without much further ado, let's see what's served as an appetizer :)
<br />
<br />

## Appetizer. Where Elasticsearch fits in VSF

<br />
<br />

## 1. Set Elasticsearch up and running for VSF
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 2. _Elastic_ and _Search_ in VSF
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 3. Now ES7 is also supported in VSF
Elasticsearch has been under massively intense upgrade with interval

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 4. Peripheral Tools available for Elasticsearch
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

<!-- 
## 6. 
### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br /> -->