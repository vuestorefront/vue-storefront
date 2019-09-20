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

type EventCallback<T> = (payload: T) => Promise<void>

type EventDataFilters<T> = {
  [K in keyof T]: EventCallback<T[K]>[]
}

class EventService<T> {
  private _vue: Vue
  private $dataFilters: EventDataFilters<T>

  public constructor () {
    this._vue = new Vue()
  }

  public $off<K extends keyof T> (eventType: K, listener: (payload?: T[K]) => any) {
    this._vue.$off(eventType as string, listener)
  }

  public $on<K extends keyof T> (eventType: K, listener: (payload?: T[K]) => any) {
    this._vue.$on(eventType as string, listener)
  }

  public $emit<K extends keyof T> (eventType: K, payload?: T[K]): void {
    this._vue.$emit(eventType as string, payload)
  }

  public get $filter () {
    return <K extends keyof T>(eventType: K, callback: EventCallback<T[K]>) => {
      if (!this.$dataFilters[eventType]) {
        this.$dataFilters[eventType] = []
      }
      this.$dataFilters[eventType].push(callback)
    }
  }

  public get $emitFilter () {
    return <K extends keyof T>(eventType: K, payload: T[K]): Promise<any[]> => {
      this.$emit(eventType, payload)
      const promises = []
      if (this.$dataFilters[eventType]) {
        for (let cb of this.$dataFilters[eventType]) {
          promises.push(cb(payload))
        }
      }
      return Promise.all(promises)
    }
  }
}

const EventBus = new EventService<Events>()

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
