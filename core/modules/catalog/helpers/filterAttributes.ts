import config from 'config'

export default function filterAttributes ({
  filterValues,
  filterField,
  blacklist,
  idsList,
  codesList
}: {
  filterValues: string[],
  filterField: string,
  blacklist: string[],
  idsList: any,
  codesList: any
}) {
  return filterValues.filter(fv => {
    if (config.entities.product.standardSystemFields.indexOf(fv) >= 0) {
      return false
    }
    if (fv.indexOf('.') >= 0) {
      return false
    }
    if (blacklist !== null && blacklist.includes(fv)) {
      return false
    }
    if (filterField === 'attribute_id') {
      return (typeof idsList[fv] === 'undefined' || idsList[fv] === null)
    }
    if (filterField === 'attribute_code') {
      return (typeof codesList[fv] === 'undefined' || codesList[fv] === null)
    }
  })
}
