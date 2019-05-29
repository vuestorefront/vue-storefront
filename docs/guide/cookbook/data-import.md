# Chapter 1. Data Imports 

In this chapter, we will cover : 
- [Introduction](#_0-introduction)
- [Data Migration for Elasticsearch](#_1-data-migration-for-elasticsearch)
- [Data pump](#_2-data-pump)
- [Data imports and tools](#_3-data-imports-and-tools)
## 0. Introduction
When you decide to migrate your web store to Vue Storefront, the first thing you need to do is filling the store (Elasticsearch) with data. This chapter deals with all the hassles related to data migration for Vue Storefront. 
<br />
<br />

## 1. Data Migration for Elasticsearch

Vue Storefront uses Elasticsearch as a primary data store. Additionally Vue Storefront uses Redis for a cache layer and Kue for queue processing. 
Although all these data stores are basically schema-free, some mappings and meta data should be imported for setting Elasticsearch indices and so forth. 

Vue Storefront uses a data-migration mechanism based on [node-migrate](https://github.com/tj/node-migrate). 

### 1. Preparation
You need a [Vue Storefront API](https://github.com/DivanteLtd/vue-storefront-api) instance [installed](setup.html) on your machine to run the migration. <br />
You need an Elasticsearch instance  [running](setup.html) into which the data will be migrated
### 2. Recipe
1. Run a node script from **Vue Storefront API root path** which is configured out of the box.
```bash
npm run migrate
```
which runs the migrations in `migrations` folder. 

2. Successful result as follows : 
```bash
> vue-storefront-api@1.9.0 migrate /home/dex/code/vue/vue-backend
> node node_modules/migrate/bin/migrate

Elasticsearch INFO: 2019-05-29T09:41:04Z
  Adding connection to http://localhost:9200/

  up : 1513602693128-create_new_index.js
Elasticsearch DEBUG: 2019-05-29T09:41:04Z
  starting request {
    "method": "DELETE",
    "path": "/*/_alias/vue_storefront_catalog",
    "query": {}
  }
  

Elasticsearch DEBUG: 2019-05-29T09:41:04Z
  Request complete

Public index alias does not exists [aliases_not_found_exception] aliases [vue_storefront_catalog] missing, with { resource.type="aliases" & resource.id="vue_storefront_catalog" }
Elasticsearch DEBUG: 2019-05-29T09:41:04Z
  starting request {
    "method": "DELETE",
    "path": "/vue_storefront_catalog",
    "query": {}
  }
  
  ... # abridged 

Elasticsearch DEBUG: 2019-05-29T09:41:08Z
  Request complete

{ acknowledged: true }
  up : 1530101328854-local_es_config_fix.js
Searching for deprecated parameters in file '/home/dex/code/vue/vue-backend/config/custom-environment-variables.json'...
File '/home/dex/code/vue/vue-backend/config/custom-environment-variables.json' updated.
Searching for deprecated parameters in file '/home/dex/code/vue/vue-backend/config/local.json'...
File '/home/dex/code/vue/vue-backend/config/local.json' updated.

  migration : complete
  
```
You may also watch it in [bash playback](https://asciinema.org/a/C9z7daIJAog0xPhNlzwoHhBl4)

3. In order to verify whether mapping is successfully done or not, you may send a `curl` request against Elasticsearch API as follows : 
```bash
curl -XGET 'http://localhost:9200/_mapping?pretty=true'
``` 
:::tip Note
Please replace `http://localhost:9200` with your Elasticsearch endpoint if you configured it manually.
:::
4. Result will be as follows if it was successfully imported (abridged) : 

<!--![elasticsearch migration result](../images/es-map-result.png)-->
```bash
{
  "vue_storefront_catalog" : {
    "mappings" : {
      "category" : {
        "properties" : {
          "created_at" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "is_active" : {
            "type" : "boolean"
          },
          "parent_id" : {
            "type" : "integer"
          },
          "product_count" : {
            "type" : "integer"
          },
          "slug" : {
            "type" : "keyword"
          },
          "updated_at" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "url_key" : {
            "type" : "keyword"
          },
          "url_path" : {
            "type" : "keyword"
          }
        }
      },
      "product" : {
        "properties" : {
          "Color_options" : {
            "type" : "keyword"
          },
          "Size_options" : {
            "type" : "keyword"
          },
          "category_gear" : {
            "type" : "integer"
          },
          "category_ids" : {
            "type" : "long"
          },
          "color" : {
            "type" : "integer"
          },
          "color_options" : {
            "type" : "integer"
          },
          "configurable_children" : {
            "properties" : {
              "has_options" : {
                "type" : "boolean"
              },
              "price" : {
                "type" : "float"
              },
              "sku" : {
                "type" : "keyword"
              },
              "special_price" : {
                "type" : "float"
              },
              "url_key" : {
                "type" : "keyword"
              }
            }
          },
          "configurable_options" : {
            "properties" : {
              "attribute_id" : {
                "type" : "long"
              },
              "default_label" : {
                "type" : "text"
              },
              "frontend_label" : {
                "type" : "text"
              },
              "label" : {
                "type" : "text"
              },
              "store_label" : {
                "type" : "text"
              },
              "values" : {
                "properties" : {
                  "default_label" : {
                    "type" : "text"
                  },
                  "frontend_label" : {
                    "type" : "text"
                  },
                  "label" : {
                    "type" : "text"
                  },
                  "store_label" : {
                    "type" : "text"
                  },
                  "value_index" : {
                    "type" : "keyword"
                  }
                }
              }
            }
          },
          "created_at" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "description" : {
            "type" : "text"
          },
          "eco_collection" : {
            "type" : "integer"
          },
          "eco_collection_options" : {
            "type" : "integer"
          },
          "erin_recommends" : {
            "type" : "integer"
          },
          "gender" : {
            "type" : "integer"
          },
          "has_options" : {
            "type" : "integer"
          },
          "id" : {
            "type" : "long"
          },
          "material" : {
            "type" : "integer"
          },
          "name" : {
            "type" : "text"
          },
          "news_from_date" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "news_to_date" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "pattern" : {
            "type" : "text"
          },
          "position" : {
            "type" : "integer"
          },
          "price" : {
            "type" : "float"
          },
          "required_options" : {
            "type" : "integer"
          },
          "size" : {
            "type" : "integer"
          },
          "size_options" : {
            "type" : "integer"
          },
          "sku" : {
            "type" : "keyword"
          },
          "slug" : {
            "type" : "keyword"
          },
          "special_from_date" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "special_price" : {
            "type" : "float"
          },
          "special_to_date" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "status" : {
            "type" : "integer"
          },
          "tax_class_id" : {
            "type" : "integer"
          },
          "updated_at" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "url_key" : {
            "type" : "keyword"
          },
          "url_path" : {
            "type" : "keyword"
          },
          "visibility" : {
            "type" : "integer"
          },
          "weight" : {
            "type" : "integer"
          }
        }
      },
      "cms_block" : {
        "properties" : {
          "creation_time" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "id" : {
            "type" : "long"
          },
          "identifier" : {
            "type" : "keyword"
          },
          "update_time" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          }
        }
      },
      "attribute" : {
        "properties" : {
          "attribute_id" : {
            "type" : "long"
          },
          "id" : {
            "type" : "long"
          },
          "options" : {
            "properties" : {
              "value" : {
                "type" : "text"
              }
            }
          }
        }
      },
      "taxrule" : {
        "properties" : {
          "id" : {
            "type" : "long"
          },
          "rates" : {
            "properties" : {
              "rate" : {
                "type" : "float"
              }
            }
          }
        }
      },
      "cms_page" : {
        "properties" : {
          "creation_time" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          },
          "id" : {
            "type" : "long"
          },
          "identifier" : {
            "type" : "keyword"
          },
          "update_time" : {
            "type" : "date",
            "format" : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
          }
        }
      }
    }
  }
}

```


### 3. Peep into the kitchen (what happens internally) 
![architecture-data-import-part](../images/GitHub-Architecture-VS-data-import.png)
We worked on the part in the red rectangle of the architecture as a preparation for data import. 

What we did in a simple term, we taught Elasticsearch types and sorts of data(mapping, also known as schema) we will use for Vue Storefront API later on. 

Upon running `npm run migrate`, it runs the pre-configured [migration scripts](https://github.com/DivanteLtd/vue-storefront-api/tree/master/migrations) using [node-migrate](https://github.com/tj/node-migrate). If you take a closer look into the migration scripts, you will notice the ultimate js file which is located at [`./src/lib/elastic.js`](https://github.com/DivanteLtd/vue-storefront-api/blob/master/src/lib/elastic.js) that does the actual labor for migration.
 If you take one more closer look in the `elastic.js` file, you will also find all the schema files are located under [`./config`](https://github.com/DivanteLtd/vue-storefront-api/tree/master/config) folder.
 What those scripts do can be divided into steps as per the file name.
 It first creates index from index schema, then import schema from `elastic.schema.[types].json` files. It will then reindex them, and delete temporary index. Finally it will work a few workarounds to deal with deprecated process. 

  Now, you are all set to proceed to pump your data into the store. 
  
### 4. Chef's secret (protip)
#### Deal with `index not found exception` 
If you encountered with the exception as follows during the migration script :

![index_not_found_exception](../images/sss.png)

It means you don't have the temporary index `vue_storefront_caalog_temp` which is required. 
Solution is :
```bash
npm run restore
```
This will create the necessary temporary index, then the necessary temp index will be deleted by the steps mentioned [above](#_3-peep-into-the-kitchen-what-happens-internally) when the migration is finished

#### Add a new migration script
You might need to write your own migration script. In that case, you can do so by adding a file under the `./migrations` directory though this is not a recommended way. `node-migrate` provides you with the cli command for the purpose as follows : 
```bash
npm run migrate create name-of-migration
``` 
This wil create a migration script template under `./migration` folder with the standard naming convention.
 [more info](https://github.com/tj/node-migrate#creating-migrations)

:::tip Example
The example migration shows how to manipulate product mappings as follows : 
:::
```js
// Migration scripts use: https://github.com/tj/node-migrate
'use strict';

let config = require('config');
let common = require('./.common');

module.exports.up = function(next) {
  // example of adding a field to the schema
  // other examples: https://stackoverflow.com/questions/22325708/elasticsearch-create-index-with-mappings-using-javascript,
  common.db.indices
    .putMapping({
      index: config.elasticsearch.indices[0],
      type: 'product',
      body: {
        properties: {
          slug: { type: 'string' }, // add slug field
          suggest: {
            type: 'completion',
            analyzer: 'simple',
            search_analyzer: 'simple',
          },
        },
      },
    })
    .then(res => {
      console.dir(res, { depth: null, colors: true });
      next();
    });
};

module.exports.down = function(next) {
  next();
};
```

#### Execute migration multiple times
If you run a migration multiple times using `npm run migrate`, it will only run the migration once and subsequent execution will be ignored and only repeat the result as follows :

![migration complete](../images/npm-run-migrate-result.png)

This happens because `node-migrate` knows it was already executed before by checking with `./migrate` file so that you won't need it repeating. Should you, however, need to run it more than once, you can do it by deleting `./migrate` file. 

<br />
<br />
<br />


## 2. Data pump
### 1. Preparation
We need 
### 2. Recipe
### 3. Peep into the kitchen (what happens internally) 
### 4. Chef's secret (protip)

<br />
<br />
<br />

## 3. Data imports and tools
### 1. Preparation
We need 
### 2. Recipe
### 3. Peep into the kitchen (what happens internally) 
### 4. Chef's secret (protip)

