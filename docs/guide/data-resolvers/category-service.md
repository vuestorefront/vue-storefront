# CategoryService

## Methods

#### `getCategories (serachOptions: DataResolver.CategorySearchOptions) => Promise<DataResolver.Category[]>`

It fetches categories by given parameters. If the `config.entities.optimize` is enabled, the `includeFields` and `excludeFields` are set accordingly to `config.entities.category.includeFields` and `config.entities.category.excludeFields`.
