class EventBusFacade {
  constructor () {
    this.listeners = Object.create(null)
    this.$dataFilters = []
  }

  $on (eventName, callback) {
    if (Array.isArray(eventName)) {
      eventName.forEach(name => this.$on(name, callback))
      return this
    }

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = []
    }
    this.listeners[eventName].push(callback)
    return this
  }

  $once (eventName, callback) {
    const once = (...args) => {
      this.$off(eventName, once)
      callback.apply(this, args)
    }
    once.callback = callback
    return this.$on(eventName, once)
  }

  $off (eventName, callback) {
    if (!eventName) {
      this.listeners = Object.create(null)
      return this
    }

    if (Array.isArray(eventName)) {
      eventName.forEach(name => this.$off(name, callback))
      return this
    }

    const listeners = this.listeners[eventName]
    if (!listeners) {
      return this
    }
    if (!callback) {
      delete this.listeners[eventName]
      return this
    }

    for (let index = listeners.length - 1; index >= 0; index--) {
      const listener = listeners[index]
      if (listener === callback || listener.callback === callback) {
        listeners.splice(index, 1)
        break
      }
    }
    return this
  }

  $emit (eventName, ...args) {
    const listeners = this.listeners[eventName]
    if (!listeners) {
      return this
    }

    listeners.slice().forEach(listener => listener.apply(this, args))
    return this
  }

  $filter (eventName, callback) {
    if (!this.$dataFilters[eventName]) {
      this.$dataFilters[eventName] = []
    }
    this.$dataFilters[eventName].push(callback)
  }

  $emitFilter (eventName, ...args) {
    const payload = args.length === 1 ? args[0] : args
    this.$emit(eventName, payload)
    const filters = this.$dataFilters[eventName] || []
    return Promise.all(filters.map(callback => callback(payload)))
  }
}

const EventBus = new EventBusFacade()

export default EventBus
