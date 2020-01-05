# Ch 2. Elasticsearch in the VSF context

In this chapter, we are going to cover : 
[[toc]]

## 0. Introduction
_Elasticsearch_ is the choice of _Vue Storefront_ for its data store as naturally as there must be reasons behind this. 
By its name, you can deduce _Elastic_ to mean scalable, extendable, distributed and type-agnostic which is great in this big data era while _Search_ implies indexing, filter, _Read_ among _CRUD_ which shows its focus. So far so good, then, what is all this fuss about Elasticsearch? 

_Elasticsearch_ is a full-text search and analysis engine based on _Apache Lucene_ by its definition. It employs inverted index which means _documents_ are indexed via all the unique _terms_ occurred and the ability to take advantage of assembling the per-field data structures can explain why _Elasticsearch_ is ultrafast. 

The other strong point is, notably, it's inborn distributed. Experience from a single node elasticsearch and multiple clusters of it is almost identical and doing so is painless as it works out of the box. There are virtually tons of points to make for why _Elasticsearch_ is your elected mid-stop between datahouse and storefront. Now let's move on to how it's implemented in _Vue Storefront_. 

_Vue Storefront_ defines itself backend-agnostic PWA e-commerce solution where _Vue Storefront_ is a storefront as the name dictates, and _Elasticsearch_ works as a datastore for _catalog_ and its sibling data such as _taxrule_, _products_ and so on. When a storefront requests information about a product, then it fetches _index_ of _documents_ about the _term_ queried from _Elasticsearch_ without traversing it to the source web store (be it Magento) so it skips all the heavy loading of the store whose database behind also is not concered which makes customers happy for pleasant experience. 

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
_Elasticsearch_ has been under massive upgrade with interval so intense as only two weeks exist between release of `6.7` and `7.0`. Can you feel the heat of the community? While we can enjoy the improvement and enhancement of the _Elastic Stack_, there is a list to check before smooth upgrade. And it also works just the same way as you need to fix _Vue Storefront_ stack for compatibility with _Elasticsearch 7.x_. 

As _Vue Storefront_ stack is mostly associated with _Elasticsearch_ through _Vue Storefront API_, you should fix files for _Vue Storefront API_ along with a few callers for it from _Vue Storefront_. However, most changes take place in core parts of the platform on purpose so your labor will have been minimized for your inner peace. Still, _configs_ and/or _migration_ need fixes where it's necessary. This recipe walks you through how to do it one by one. 


### 1. Preparation
 - You need to have [setup _Vue Storefront_ stack](setup) including _Vue Storefront API_. 
 - ES7 is supported from _Vue Storefront_ version `1.11` and up. You should have it accordingly. 
 - ES7 is supported from _Vue Storefront API_ version `1.11` and up. You should have it accordingly too. 
 - ES7 is supported from _mage2vuestorefront_ with branch `feature/es7`. You should have it too.  

### 2. Recipe
 0. You should fix `docker-compose.nodejs.yml` file as linked _Elasticsearch_ container should be updated like below : 

<div id="d-nodejs-yml">

</div>
<script>
var dNodejsYml = Diff2Html.getPrettyHtml(
  '--- a/docker-compose.nodejs.yml\n+++ b/docker-compose.nodejs.yml\n@@ -6,7 +6,7 @@ services:\n       context: .\n       dockerfile: docker/vue-storefront-api/Dockerfile\n     depends_on:\n-      - es1\n+      - es7\n       - redis\n     env_file: docker/vue-storefront-api/default.env\n     environment:\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById('d-nodejs-yml').innerHTML = dNodejsYml;
</script>


 1. `docker-compose` for _Elasticsearch 7_ is included in `1.11`. Let's run the docker container for _Elasticsearch 7_ from **Vue Storefront API root path** as follows : 
 ```bash
docker-compose -f docker-compose.elastic7.yml -f docker-compose.nodejs.yml up
 ```
:::tip TIP
You can run it in the _detach_ mode with option flag `-d` as in 
 ```bash
docker-compose -f docker-compose.elastic7.yml -f docker-compose.nodejs.yml up -d
 ```
:::

 2. You will see the screen as below : 
 ```bash
Starting es7 ... 
Starting vuestorefrontapi_redis_1 ... 
Starting vuestorefrontapi_redis_1
Starting vuestorefrontapi_redis_1 ... done
Attaching to es7, vuestorefrontapi_redis_1
es7      | OpenJDK 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated in version 9.0 and will likely be removed in a future release.
redis_1  | 1:C 23 Dec 18:00:28.554 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
redis_1  | 1:C 23 Dec 18:00:28.554 # Redis version=4.0.14, bits=64, commit=00000000, modified=0, pid=1, just started
redis_1  | 1:C 23 Dec 18:00:28.554 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
redis_1  | 1:M 23 Dec 18:00:28.555 * Running mode=standalone, port=6379.
redis_1  | 1:M 23 Dec 18:00:28.555 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
redis_1  | 1:M 23 Dec 18:00:28.555 # Server initialized
redis_1  | 1:M 23 Dec 18:00:28.556 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
redis_1  | 1:M 23 Dec 18:00:28.556 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
redis_1  | 1:M 23 Dec 18:00:28.556 * DB loaded from disk: 0.000 seconds
redis_1  | 1:M 23 Dec 18:00:28.556 * Ready to accept connections
es7      | {"type": "server", "timestamp": "2019-12-23T18:00:30,129+0000", "level": "INFO", "component": "o.e.e.NodeEnvironment", "cluster.name": "docker-cluster", "node.name": "be374d24f82e",  "message": "using [1] data paths, mounts [[/ (overlay)]], net usable_space [149.4gb], net total_space [250.9gb], types [overlay]"  }
es7      | {"type": "server", "timestamp": "2019-12-23T18:00:30,133+0000", "level": "INFO", "component": "o.e.e.NodeEnvironment", "cluster.name": "docker-cluster", "node.name": "be374d24f82e",  "message": "heap size [494.9mb], compressed ordinary object pointers [true]"  }
es7      | {"type": "server", "timestamp": "2019-12-23T18:00:30,135+0000", "level": "INFO", "component": "o.e.n.Node", "cluster.name": "docker-cluster", "node.name": "be374d24f82e",  "message": "node name [be374d24f82e], node ID [e8P_hrouSEKIWnylBaelVw], cluster name [docker-cluster]"  }
# abridged ...
 ```
 :vhs: You may also watch it in [bash playback :movie_camera:](https://asciinema.org/a/NcfdFuMkJ5LWzVbgb7m35coOV)

 You might notice the script spawns two containers, one of which is for `redis` while the other is for `elasticsearch 7`. (`kibana` container is optional from `1.11`)

 3. Visit `localhost:9200` from your browser then it should print likewise as follows :
```text
{
  "name" : "be374d24f82e",
  "cluster_name" : "docker-cluster",
  "cluster_uuid" : "3Gk6anHkQU--5TmenJkdrw",
  "version" : {
    "number" : "7.3.2",
    "build_flavor" : "default",
    "build_type" : "docker",
    "build_hash" : "1c1faf1",
    "build_date" : "2019-09-06T14:40:30.409026Z",
    "build_snapshot" : false,
    "lucene_version" : "8.1.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

 4. Fix `local.json` to update configuration for `indexTypes` and `apiVersion` under `elasticsearch` as follows :

<div id="d-local-json">

</div>
<script>
var dLocalJson = Diff2Html.getPrettyHtml(
  '--- a/config/local.json\n+++ b/config/local.json\n@@ -2,8 +2,6 @@\n     \"host\": \"localhost\",\n     \"port\": 9200,\n     \"protocol\": \"http\",\n-    \"user\": \"elastic\",\n-    \"password\": \"changeme\",\n     \"min_score\": 0.01,\n     \"indices\": [\n       \"vue_storefront_catalog\",\n@@ -13,10 +11,11 @@\n     \"indexTypes\": [\n       \"product\",\n       \"category\",\n-      \"cms\",\n+      \"cms_block\",\n+      \"cms_page\",\n       \"attribute\",\n       \"taxrule\",\n       \"review\"\n     ],\n-    \"apiVersion\": \"5.6\"\n-  }, \n+    \"apiVersion\": \"7.1\"\n+  }, ',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById('d-local-json').innerHTML = dLocalJson;
</script>


 5. Once _Elasticsearch 7_ instance is up and running, then run the new script which creates index with the proper data types of fields applied.
```bash
yarn db7 new
```

This is because you should newly put mapping for _Elasticsearch 7_ which only allows one _document_ per single _index_. [more info](https://www.elastic.co/guide/en/elasticsearch/reference/current/breaking-changes-7.0.html)

 The screen spits log as follows : 
```bash
yarn run v1.21.1
$ node scripts/db7.js new
** Hello! I am going to create NEW ES index
Public index alias does not exists aliases_not_found_exception
Public index alias does not exists aliases_not_found_exception
Public index alias does not exists aliases_not_found_exception
Public index alias does not exists aliases_not_found_exception
Public index alias does not exists aliases_not_found_exception
Public index alias does not exists aliases_not_found_exception
Public index alias does not exists aliases_not_found_exception
Done in 2.27s.
```
 :vhs: You may also watch it in [bash playback :movie_camera:](https://asciinema.org/a/UErONnmqK1m2EFNkWRrG0E6p4)

Don't worry about `aliases_not_found_exception`. It simply means it failed to cleanse the orphaned aliases since there was none to delete in the first place.

 6. Check if the mapping has been created successfully from the terminal against Elasticsearch API : 
```bash
curl -XGET 'http://localhost:9200/_mapping?pretty=true'
```

 Result should be shown as : 
```bash
{
  "vue_storefront_catalog_cms_block" : {
    "mappings" : {
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
  },
  "vue_storefront_catalog_review" : {
    "mappings" : { }
  },
  "vue_storefront_catalog_taxrule" : {
    "mappings" : {
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
    }
  },

# ... abridged ...

  "vue_storefront_catalog_category" : {
    "mappings" : {
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
        "position" : {
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
    }
  }
}
``` 
You can find each index has only its single mapping with convention `${indexName}_${entityType}`.

 7. Next thing is, pumping data from source web store to the newly created ES7 index. Go to _mage2vuestorefront_ directory and fix `apiVersion` inside `elasticsearch` node in `config.js`.

<div id="d-config-js">

</div>
<script>
var dConfigJs = Diff2Html.getPrettyHtml(
  '--- a/src/config.js\n+++ b/src/config.js\n@@ -61,7 +61,7 @@ module.exports = {\n   },\n \n   elasticsearch: {\n-    apiVersion: process.env.ELASTICSEARCH_API_VERSION || \'5.6\'\n+    apiVersion: process.env.ELASTICSEARCH_API_VERSION || \'7.1\' \n   },\n \n   redis: {\n',
  {inputFormat: 'diff', showFiles: false, matching: 'none', outputFormat: 'line-by-line'}
);
document.getElementById('d-config-js').innerHTML = dConfigJs;
</script>

 With this change in `config.js`, `mage2vuestorefront` knows how to deal with your _Elasticsearch_ whose version is higher than `6`. 

 8. Now teach the machine your configuration using shell `ENV` as following example : 
 ```bash
 export TIME_TO_EXIT=2000
 export MAGENTO_CONSUMER_KEY=lv1unkldzkcex68l3eojut4j66qqho8w
 export MAGENTO_CONSUMER_SECRET=zhkuqvweo0bsg14noujqje49x3wht0qr
 export MAGENTO_ACCESS_TOKEN=z6ftgc5005212bc6lnszxa7d7ocl8hgc
 export MAGENTO_ACCESS_TOKEN_SECRET=h8tikjq9sz7tqm6hyhdfgs96krb6qzyk
 
 export MAGENTO_URL=http://local.magento/rest # Replace the url with your Magento 2 URL
 export INDEX_NAME=vue_storefront_catalog # This will be the base name of the index we use
 ```
 Type them in a shell then your `ENV` remembers the variables until the session expires. 
 
 :::tip TIP
 If you don't know how to get those credentials, please take a look at [data import](/guide/cookbook/data-import.html#_2-2-recipe-b-using-on-premise)
 :::
 
 
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />

## 4. Extend Elasticsearch entities for VSF
Online shops normally have certain types of models and scenarios in common. (Because shops are shops in the end! What do you expect from shops? ;)) They are well known to the community and most of e-commerce software already implemented them into their frameworks as expected which is good. Those are represented as entities, namely, _Catalog_, _Customer_, _Order_, _Promotion_ and more. Since _Vue Storefront_ functions as the gorgeous gateway to those e-commerce backend, it also needs to mirror those entities as smooth as possible.  

 The large part of main entities are already implemented in VSF `core` as expected but you might still need to add or remove additional entities as you want it to fulfill your mission. This recipe will give you an idea of how to do it. 

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />


## 5. VSF Configuration pertaining to Elasticsearch
There is a handful of configuration you can tweak in `local.json` in order to modify how _Vue Storefront_ behaves in conjunction with _Elasticsearch_. 

### 1. Preparation
### 2. Recipe
### 3. Peep into the kitchen (what happens internally)
### 4. Chef's secret (protip)
<br />
<br />


## 6. Peripheral Tools available for Elasticsearch
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
