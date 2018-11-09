# Compare module

This module contains all logic and components related to compare operations.

## Components

### AddToCompare

**Methods**
- `addToCart(product)` - adds passed product to the compare list

### Compare

**Computed**
- `items` - array of products that are currently in the comare list
- `allComparableAttributes` - returns array of attributes to campare

**Methods**
- `removeFromCompare(product)` - removes passed product from the compare list

**created hook**
- dispatch `compare/load` and `attribute/list` vuex action

**asyncData**
- prefetch data for SSR purposes

### CompareButton

**Computed**
- `isEmpty` - checks if compare list is empty

### Product

**Compued**
- `isOnCompare` - checks if product is on compare list

**Methods**
- `removeFromCompare` - removes passed product from compare list


