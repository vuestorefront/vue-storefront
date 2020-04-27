# Data Migrations for Elacticsearch

Vue Storefront uses Elasticsearch as a primary data store. We're using Redis as a cache layer and Kue for queue processing.

Although all of these data stores are basically schema-free, some mappings and meta data should be used for setting ES indices and so forth.

Vue Storefront uses a data-migration mechanism based on [node-migrate](https://github.com/tj/node-migrate).

## Migration tool

We use node-migrate, which is pre-configured with npm, so we're using the following alias:

```bash
yarn migrate
```

which runs the migrations against `migrations` folder.

## How to add new migration?

You can add a new migration by simply adding a file to the `migrations` directory (not recommended) or using the command line tool:

```bash
yarn migrate create name-of-my-migration
```

The tool automatically generates the file under the `migrations` folder.

## Examples

The example migrations show how to manipulate products and mappings. Let's take a look at the mapping modification:

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

... and that's it :)
