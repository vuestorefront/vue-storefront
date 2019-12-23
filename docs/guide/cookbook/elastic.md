# Ch 2. Elasticsearch in the VSF context

In this chapter, we are going to cover : 
[[toc]]

## 0. Introduction
_Elasticsearch_ is the choice of _Vue Storefront_ for its data store as naturally as there must be reasons behind this. 
By its name, you can deduce _Elastic_ to mean scalable, extendable, distributed and type-agnostic which is great in this big data era while _Search_ implies indexing, filter, _Read_ among _CRUD_ which shows its focus. So far so good, then, what is all this fuss about Elasticsearch? 

_Elasticsearch_ is a full-text search and analysis engine based on _Apache Lucene_ by its definition. It employs inverted index which means _documents_ are indexed via all the unique _terms_ occurred and the ability to take advantage of assembling the per-field data structures can explain why _Elasticsearch_ is ultrafast. 

The other strong point is, notably, it's inborn distributed. Experience from a single node elasticsearch and multiple clusters of it is almost identical and doing so is painless as it works out of the box. There are virtually tons of points to make for why _Elasticsearch_ is your elected mid-stop between datahouse and storefront. Now let's move on to how it's implemented in _Vue Storefront_. 

_Vue Storefront_ defines itself backend-agnostic PWA e-commerce solution where _Vue Storefront_ is a storefront as the name dictates, and _Elasticsearch_ works as a datastore for _catalog_ and its sibling data such as _taxrule_, _products_ and so on. When a storefront requests information about a product, then it fetches _index_ of _documents_ about the _term_ queried from _Elasticsearch_ without traversing it to the source web store (be it Magento) so it skips all the heavy loading of the store whose database behind also is not concered. 

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
_Elasticsearch_ has been under massive upgrade with interval so intense as only two weeks exist between `6.7` and `7.0`. Can you feel the heat of the community? While we can enjoy the improvement and enhancement of the _Elastic Stack_, there is a list to check before smooth upgrade. And it also works just the same way as you need to fix _Vue Storefront_ stack for compatibility with _Elasticsearch 7.x_. 

As _Vue Storefront_ stack is mostly associated with _Elasticsearch_ through _Vue Storefront API_, you should fix files for _Vue Storefront API_ along with a few callers for it from _Vue Storefront_ too. However, most changes take place in core parts of the platform on purpose so the labor has been minimized for your inner peace. Still, _configs_ and/or _migration_ need fixes where it's necessary. This recipe walks you through how to do it one by one. 


### 1. Preparation
 - You need to have [setup _Vue Storefront_ stack](setup) including _Vue Storefront API_. 
 - ES7 is supported from _Vue Storefront_ version `1.11` and up. You should have it accordingly. 
 - ES7 is supported from _Vue Storefront API_ version `1.11` and up. You should have it accordingly too. 

### 2. Recipe
 1. First off, you should put mapping for _Elasticsearch 7_ which only allows one _document_ per single _index_.

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