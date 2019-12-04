import forEach from 'lodash-es/forEach'
import bodybuilder from 'bodybuilder'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Logger } from '@vue-storefront/core/lib/logger'

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

  protected query: bodybuilder.Bodybuilder
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
    this.query = bodybuilder()

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
   * Returns bodybuilder object representation of current string
   * @returns {bodybuilder.Bodybuilder}
   */
  public getSearchQuery (): bodybuilder.Bodybuilder {
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
    return JSON.stringify(this.getSearchQuery().build())
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
      .filter('terms', 'visibility', [2, 3, 4])
      .filter('terms', 'status', [0, 1])

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
    this.filterAttributeIsNullAndIsNotNull(
      { key, value, isOr },
      'query'
    )

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeIsNull ({ key, value, isOr }: FilterOptions): this {
    this.filterAttributeIsNullAndIsNotNull(
      { key, value, isOr },
      'notQuery'
    )

    return this
  }

  /**
   * @param {string} keyword
   * @returns {this}
   */
  protected filterAttributeIsNullAndIsNotNull ({ key, isOr }: FilterOptions, keyword: string = 'query'): this {
    if (isOr) {
      this.query.orQuery('bool', (b) => {
        return b[keyword]('exists', key, null)
      })
    } else {
      this.query[keyword]('exists', key, null)
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
    if (isOr) {
      this.query.orQuery('range', key, { [keyword]: value })
    } else {
      this.query.query('range', key, { [keyword]: value })
    }

    return this
  }

  /**
   * @returns {this}
   */
  protected filterAttributeValue ({ key, value, isOr }: FilterOptions): this {
    if (isOr) {
      if (value === null) {
        this.query.orQuery('bool', (b) => {
          return b.notQuery('exists', key)
        })
      } else {
        this.query.orQuery('terms', key, this.getArrayFilterValue(value))
      }
    } else {
      if (value === null) {
        this.query.notQuery('exists', key)
      } else {
        this.query.query('terms', key, this.getArrayFilterValue(value))
      }
    }

    return this
  }

  /**
   * @returns {this}
   */
  protected filterNotAttributeValue ({ key, value, isOr }: FilterOptions): this {
    if (isOr) {
      if (value === null) {
        this.query.orQuery('exists', key)
      } else {
        this.query.orQuery('bool', (b) => {
          return b.notQuery('terms', key, this.getArrayFilterValue(value))
        })
      }
    } else {
      if (value === null) {
        this.query.query('exists', key)
      } else {
        this.query.notQuery('terms', key, this.getArrayFilterValue(value))
      }
    }

    return this
  }

  /**
   * @param {any[]} value
   * @returns {any[]}
   */
  protected getArrayFilterValue (value: any): any[] {
    if (!Array.isArray(value)) {
      return [value]
    }

    return value
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
