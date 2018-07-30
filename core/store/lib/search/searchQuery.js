class SearchQuery {
  /**
    */
  constructor () {
    this._filters = []
    this._queries = []
    this._aggregations = []
    this._seartchText = ''
    console.log('create SearchQuery object')
  }

  /**
    * @return {Array} array of filters objects
    */
  getFilters () {
    return this._filters
  }

  /**
    * @return {Array} array of queries objects
    */
  getQueries () {
    return this._queries
  }

  /**
    * @return {Array} array of aggregations objects
    */
  getAggregations () {
    return this._aggregations
  }

  /**
    * @return {String}
    */
  getSearchText () {
    return this._seartchText
  }

  /**
    * @param {String} key
    * @param {Object} value
    * @param {String} type // { match_all, match, terms, nested }
    * @param {String} boolType // { query, orQuery, andQuery, notQuery }
    * @return {Object}
    */
  addQuery ({key, value, type = 'terms', boolType = 'query'}) {
    // value can has only String, Array or numeric type
    if (value !== null) {
      this._queries.push({
        attribute: key,
        value: value,
        type: type,
        boolType: boolType
      })
    } else {
      console.log('Values has wrong format. Please use format like { \'value\': "3" }')
    }

    return this
  }

  /**
    * @param {String} type // {range, term}
    * @param {String} key
    * @param {Object} value
    * @return {Object}
    */
  addFilter (type, key, value, extraOption = Object) {
    switch (type) {
      case 'range':
        // check if range value has correct format
        let range = {}
        if (value.hasOwnProperty('lt')) { range.lt = value.lt }
        if (value.hasOwnProperty('lte')) { range.lte = value.lte }
        if (value.hasOwnProperty('gt')) { range.gt = value.gt }
        if (value.hasOwnProperty('gte')) { range.gte = value.gte }
        if (Object.keys(range).length !== 0 && range.constructor === Object) {
          this._filters.push({
            attribute: key,
            type: type,
            value: value,
            extraOption: extraOption
          })
        } else {
          console.log('Filter was not added. Please provide correct range value with format like { \'gte\': 3, \'lte\': 4 }')
        }
        break
      case 'term' || 'terms':
        // value can has only String, Array or numeric type
        if (typeof value !== 'object') {
          this._filters.push({
            attribute: key,
            type: type,
            value: value,
            extraOption: extraOption
          })
        }
        break
      case 'bool':
        // value can has only String, Array or numeric type
        if (typeof value === 'object') {
          this._filters.push({
            attribute: key,
            type: type,
            value: value,
            extraOption: extraOption
          })
        }
        break
      default:
        console.log('Sorry, we do not suport ' + type + 'filter type')
    }

    return this
  }

  /**
    * @param {String} key
    * @param {String} type // { match_all, match, terms, nested }
    * @return {Object}
    */
  addAggregation ({type,
    field,
    options = {},
    name = '',
    subaggregations = {}}) {
    // value can has only String, Array or numeric type

    this._aggregations.push({
      type: type,
      field: field,
      options: options,
      name: name,
      subaggregations: subaggregations
    })

    return this
  }

  /**
  * @param {String} searchText
  * @return {Object}
  */
  setSearchText (searchText) {
    this._seartchText = searchText
    return this
  }
}

export default SearchQuery
