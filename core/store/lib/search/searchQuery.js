class SearchQuery {
  /**
    */
  constructor () {
    this._availableFilters = []
    this._appliedFilters = []
    this._queries = []
    this._searchText = ''
    console.log('create SearchQuery object')
  }

  /**
    * @return {Array} array of all available filters objects
    */
  getAvailableFilters () {
    return this._availableFilters
  }

  /**
    * @return {Array} array of applied filters objects
    */
  getAppliedFilters () {
    return this._appliedFilters
  }

  /**
    * @return {Array} array of queries objects
    */
  getQueries () {
    return this._queries
  }

  /**
    * @return {String}
    */
  getSearchText () {
    return this._searchText
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
    * @param {String} type // {range, term, terms}
    * @param {String} key
    * @param {Object} value
    * @param {Object} scope // default, catalog, catalogsearch, quicksearch
    * @return {Object}
    */
  applyFilter ({type, key, value, scope = 'default', options = Object}) {
    switch (type) {
      case 'range':
        // check if range value has correct format
        let range = {}
        if (value.hasOwnProperty('lt')) { range.lt = value.lt }
        if (value.hasOwnProperty('lte')) { range.lte = value.lte }
        if (value.hasOwnProperty('gt')) { range.gt = value.gt }
        if (value.hasOwnProperty('gte')) { range.gte = value.gte }
        if (Object.keys(range).length !== 0 && range.constructor === Object) {
          this._appliedFilters.push({
            attribute: key,
            type: type,
            value: value,
            scope: scope,
            options: options
          })
        } else {
          console.log('Filter was not added. Please provide correct range value with format like { \'gte\': 3, \'lte\': 4 }')
        }
        break
      case 'terms':
        // value can has only String, Array or numeric type
        this._appliedFilters.push({
          attribute: key,
          type: type,
          value: value,
          scope: scope,
          options: options
        })
        break
      case 'match':
        // value can has only String, Array or numeric type
        this._appliedFilters.push({
          attribute: key,
          type: type,
          value: value,
          scope: scope,
          options: options
        })
        break
      case 'term':
        // value can has only String, Array or numeric type
        if (typeof value !== 'object') {
          this._appliedFilters.push({
            attribute: key,
            type: type,
            value: value,
            scope: scope,
            options: options
          })
        }
        break
      case 'bool':
        // value can has only String, Array or numeric type
        if (typeof value === 'object') {
          this._appliedFilters.push({
            attribute: key,
            type: type,
            value: value,
            scope: scope,
            options: options
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
    * @param {Object} options // { eg price options ] }
    * @return {Object}
    */
  addAvailableFilter ({type,
    field,
    options = {}}) {
    // value can has only String, Array or numeric type

    this._availableFilters.push({
      type: type,
      field: field,
      options: options
    })

    return this
  }

  /**
  * @param {Array} filters
  * @return {Object}
  */
  setAvailableFilters (filters) {
    this._availableFilters = filters
    return this
  }

  /**
  * @param {String} searchText
  * @return {Object}
  */
  setSearchText (searchText) {
    this._searchText = searchText
    return this
  }
}

export default SearchQuery
