# Database tool

Vue Storefront gets it's all data from [vue-storefront-api](https://github.com/DivanteLtd/vue-storefront-api) endpoints, operating on top of Elastic Search data store.

If You installed the project using `npm run installer` command then, the database has been set up, data imported from demo-dump and everything should be just fine.
After some more extensive data operations - like custom imports using [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront) or [magento1-vsbridge](https://github.com/DivanteLtd/magento1-vsbridge) there is a need to re-index the ElasticSearch and setup the proper metadata for fields.

The main reason You know You must reindex the database is kind of the following error You get from vue-storefront console:

```json
Error: {"root_cause":[{"type":"illegal_argument_exception","reason":"Fielddata is disabled on text fields by default. Set fielddata=true on [created_at] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory. Alternatively use a keyword field instead."}],"type":"search_phase_execution_exception","reason":"all shards failed","phase":"query","grouped":true,"failed_shards":[{"shard":0,"index":"vue_storefront_catalog_1521776807","node":"xIOeZW2lTwaprGXh6YLyCA","reason":{"type":"illegal_argument_exception","reason":"Fielddata is disabled on text fields by default. Set fielddata=true on [created_at] in order to load fielddata in memory by uninverting the inverted index. Note that this can however use significant memory. Alternatively use a keyword field instead."}}]}
```

In this case there is a db tool inside your local `vue-storefront-api` installation to the rescue.

## Re-indexing existing database

Please go to `vue-storefront-api` directory and run:
`npm run db rebuild`

This command will:
- reindex your currently set (in the `config/local.json` config file) elastic search index to temp-one,
- put the right elastic search mappings on top of the temp index,
- drop the original index,
- create the alias with original name to the temp one - so You can use original name without any reference chcanges.

You can specify different (than this set in `config/local.json`) index name by running:
`npm run db rebuild -- --indexName=custom_index_name`

## Creating the new index

If you like to create new, empty index please run:
`npm run db new`

This tool will drop your current index and create new, empty one with all the metafields set.


You can specify different (than this set in `config/local.json`) index name by running:
`npm run db rebuild -- --indexName=custom_index_name`
