import { SearchQuery } from 'storefront-query-builder'
import { Logger } from '@vue-storefront/core/lib/logger'
import forEach from 'lodash-es/forEach'
import Product from '@vue-storefront/core/modules/catalog/types/Product'

export interface RuleSets {
  [ruleSetKey: string]: {
    [ruleKey: string]: Rule
  }
}

export interface Rule {
  continue?: boolean,
  if: Record<string, any>,
  then: Record<string, any>
}

export interface FilterOptions {
  key: string,
  value: any,
  isOr: boolean
}

class Rules {
  protected rules: { [ruleKey: string]: Rule }
  protected product: Product
  protected type: string

  protected query: SearchQuery
  protected isBuild: boolean = false
  protected validRules: { [ruleKey: string]: Rule } = {}
  protected filter: { and: Record<string, any>, or: Record<string, any> } = {
    and: {},
    or: {}
  }

  protected assertionMap: Record<string, string> = {
    'not null': 'assertAttributeNotNull',
    'is null': 'assertAttributeIsNull'
  }

  protected filterMap: Record<string, string> = {
    'not null': 'filterAttributeNotNull',
    'is null': 'filterAttributeIsNull',
    'current': 'filterAttributeSameAsCurrent',
    'not current': 'filterAttributeNotSameAsCurrent',
    'greater': 'filterAttributeGreaterOrEqual',
    'lower': 'filterAttributeLowerOrEqual'
  }

  /**
   * @param {Product} product
   * @param  {string} type
   */
  public constructor (product: Product, type: string = 'crosssell', rules: Record<string, any>) {
    if (!rules[type]) {
      return
    }

    this.rules = rules[type]
    this.type = type
    this.product = product
    this.query = new SearchQuery()

    this.addDefaultFilter()

    forEach(this.rules, (rule, ruleKey) => {
      if (!this.isValid(rule, ruleKey)) {
        return
      }

      this.addFilter(rule.then)
      this.validRules[ruleKey] = rule

      if (!rule.continue || rule.continue === false) {
        return false
      }
    })

    this.debug()
  }

  /**
   * Returns SearchQuery object representation of current string
   * @returns {SearchQuery}
   */
  public getSearchQuery (): SearchQuery {
    if (!this.isBuild) {
      forEach(this.filter, (filters, andOrKey) => {
        const isOr = andOrKey === 'or'
        forEach(filters, filter => {
          const { key, value } = filter
          this[filter.method]({ key, value, isOr })
        })
      })

      this.isBuild = true
    }

    return this.query
  }

  /**
   * @returns {string}
   */
  protected getElasticSearchQueryString (): string {
    return JSON.stringify(this.getSearchQuery())
  }

  /**
   * @param {Rule} rule
   * @param {string} key
   * @returns {boolean}
   */
  protected isValid (rule: Rule, key: string): boolean {
    if (!rule.if || Object.values(rule.if).length === 0) {
      return true
    }

    let check = true
    forEach(rule.if, (value: string, attribute: string) => {
      if (!this.assert(attribute, value)) {
        check = false
        return false
      }
    })

    return check
  }

  /**
   * @param {string} attribute
   * @param {string} value
   * @returns {boolean}
   */
  protected assert (attribute: string, value: string): boolean {
    let method = this.assertionMap[value] || 'assertAttributeSameAs'
    return this[method](attribute, value)
  }

  /**
   * @param {string} attribute
   * @param {string} value
   * @returns {boolean}
   */
  protected assertAttributeNotNull (attribute: string, value: string): boolean {
    return this.product[attribute] && this.product[attribute] !== null
  }

  /**
   * @param {string} attribute
   * @param {string} value
   * @returns {boolean}
   */
  protected assertAttributeIsNull (attribute: string, value: string): boolean {
    return !this.assertAttributeNotNull(attribute, value)
  }

  /**
   * @param {string} attribute
   * @param {string|any[]} value
   * @param {boolean} assertion
   * @returns {boolean}
   */
  protected assertAttributeSameAs (attribute: string, value: string|any[]): boolean {
    const productValue = this.product[attribute]
    if (!Array.isArray(value)) {
      value = [value]
    }

    if (Array.isArray(productValue)) {
      return productValue.find(v => value.includes(v))
    } else {
      return value.includes(productValue)
    }
  }

  /**
   * @returns {this}
   */
  protected addDefaultFilter (): this {
    this.query
      .applyFilter({ key: 'stock', value: '', scope: 'default' })
      .applyFilter({ key: 'visibility', value: { in: [2, 3, 4] } })
      .applyFilter({ key: 'status', value: { in: [0, 1] } })

    return this
  }

  /**
   * @param {Rule} rule
   * @param {boolean} isOr
   * @returns {this}
   */
  protected addFilter (filter: Record<string, any>, isOr: boolean = false): this {
    forEach(filter, (value, key) => {
      if (key === 'or') {
        this.addFilter(value, true)
        return
      }

      const method = this.filterMap[value] || 'filterAttributeValue'
      const andOr = isOr ? 'or' : 'and'
      this.filter[andOr][key] = {
        method, key, value
      }
    })

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeNotNull ({ key, value, isOr }: FilterOptions): this {
    this.filterAttributeIsNullAndIsNotNull({ key, value, isOr }, false)
    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeIsNull ({ key, value, isOr }: FilterOptions): this {
    this.filterAttributeIsNullAndIsNotNull({ key, value, isOr }, true)
    return this
  }

  /**
   * @param {string} operator
   * @returns {this}
   */
  protected filterAttributeIsNullAndIsNotNull ({ key, isOr }: FilterOptions, exists: boolean): this {
    if (isOr) {
      const operator = exists ? 'or' : 'nor'
      this.query.applyFilter({ key, value: { [operator]: null } })
    } else {
      const operator = exists ? 'in' : 'nin'
      this.query.applyFilter({ key, value: { [operator]: null } })
    }

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeSameAsCurrent ({ key, value, isOr }: FilterOptions): this|boolean {
    value = this.product[key]
    if (!value) {
      return this
    }

    this.filterAttributeValue({ key, value, isOr })

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeNotSameAsCurrent ({ key, value, isOr }: FilterOptions): this|boolean {
    value = this.product[key]
    if (!value) {
      return this
    }

    this.filterNotAttributeValue({ key, value, isOr })

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeGreaterOrEqual ({ key, value, isOr }: FilterOptions): this {
    this.filterAttributeLowerOrGreaterOrEqual(
      { key, value, isOr },
      'gte'
    )

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeLowerOrEqual ({ key, value, isOr }: FilterOptions): this {
    this.filterAttributeLowerOrGreaterOrEqual(
      { key, value, isOr },
      'lte'
    )

    return this
  }

  /**
   * @param {string} keyword
   * @returns {this}
   */
  protected filterAttributeLowerOrGreaterOrEqual ({ key, value, isOr }: FilterOptions, keyword: string = 'lte'): this {
    const operator = isOr ? 'or' + (keyword.charAt(0).toUpperCase() + keyword.substr(1)) : keyword
    this.query.applyFilter({ key, value: { [operator]: value } })
    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeValue ({ key, value, isOr }: FilterOptions): this {
    const operator = isOr ? 'or' : 'in'
    this.query.applyFilter({ key, value: { [operator]: value } })

    return this
  }

  /**
   * @returns {this}
   */
  protected filterNotAttributeValue ({ key, value, isOr }: FilterOptions): this {
    const operator = isOr ? 'nor' : 'nin'
    this.query.applyFilter({ key, value: { [operator]: value } })

    return this
  }

  /**
   * @returns {object}
   */
  public debug (): Record<string, any> {
    const debugMessage: Record<string, any> = {
      ruleSet: this.type,
      rules: this.validRules,
      query: this.getElasticSearchQueryString()
    }

    Logger.log('Recommendation rules: ', 'icmaaRecommendations', debugMessage)()

    return debugMessage
  }
}

export default Rules
