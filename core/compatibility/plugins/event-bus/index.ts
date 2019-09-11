import Vue from 'vue'
// will be replaced with new mechanism with code-completion (via modules), don't use if you don't need to
/**
 * Filter extension is for running async data filters as event handlers
 * Example:
 * let product = {}
 * EventBus.$filter('after-product-changed', (product) => {
 *  return Promise ((resolve, reject) => {
 *    product.sku = 'abc'
 *    resolve (product)
 *  })
 * })
 * EventBus.$filter('after-product-changed', (product) => {
 *  return Promise ((resolve, reject) => {
 *    product.name = 'ABC'
 *    resolve (product)
 *  })
 * })
 * EventBus.$emitFilter('after-product-changed', product).then((resultsFromEventHanlders) => {
 *  // here you have data modified by extensions
 *  // resultsFromEventHanlders = [ { sku: abc, name: 'ABC' }, { sku: abc, name: 'ABC' } ]
 * })
 */

class EventService<T, K extends keyof T> {
  private _vue: Vue
  public $dataFilters: T

  public constructor () {
    this._vue = new Vue()
  }

  public $on (eventType: K, listener: (...payload: T[K][]) => void) {
    this._vue.$on(eventType as string, listener)
  }

  public $emit (eventType: K, ...payload: T[K][]): any {
    this._vue.$emit(eventType as string, ...payload)
  }

  public get $filter () {
    return (eventType: K, callback: (payload: T[K]) => void) => {
      if (!this.$dataFilters[eventType]) {
        this.$dataFilters[eventType] = []
      }
      this.$dataFilters[eventType].push(callback)
    }
  }

  public get $emitFilter<K extends keyof T> () {
    return (eventType: K, ...args: T[K][]) => {
      this.$emit(eventType, ...args)
      const promises = []
      if (this.$dataFilters[eventType]) {
        for (let cb of this.$dataFilters[eventType]) {
          promises.push(cb(args))
        }
      }
      return Promise.all(promises)
    }
  }
}

const filterExt = {
  $dataFilters: {
    value: [],
    writable: true
  }, // data filters to be registered by extension developers
  $filter: {
    get: function () {
      return (eventName, callback) => {
        if (!this.$dataFilters[eventName]) {
          this.$dataFilters[eventName] = []
        }
        this.$dataFilters[eventName].push(callback)
      }
    }
  },
  $emitFilter: {
    get: function () {
      return (eventName, ...args) => {
        if (args.length === 1) {
          args = args[0]
        }
        this.$emit(eventName, args)
        let promises = []
        if (this.$dataFilters[eventName]) {
          for (let cb of this.$dataFilters[eventName]) {
            promises.push(cb(args))
          }
        }
        return Promise.all(promises)
      }
    }
  }
}
const EventBus = new Vue()
if (!EventBus.$dataFilters) {
  Object.defineProperties(EventBus, filterExt)
}

const EventBusPlugin = {
  install (Vue) {
    if (!Vue.prototype.$bus) { /** Vue.prototype.$bus is now @deprecated please do use `EventBus` instead */
      Object.defineProperties(Vue.prototype, {
        $bus: {
          get: function () {
            return EventBus
          }
        }
      })
    }
  }
}
export { EventBus as default, EventBusPlugin }
