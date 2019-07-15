import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { Logger } from '@vue-storefront/core/lib/logger'

// @deprecated from 2.0
export default {
  beforeCreated () {
    const eventName = this.$options.name.toLowerCase() + '-before-created'
    Logger.debug(eventName, 'event')()
    EventBus.$emit(eventName, this)
  },
  created () {
    const eventName = this.$options.name.toLowerCase() + '-after-created'
    Logger.debug(eventName, 'event')()
    EventBus.$emit(eventName, this)
  },
  beforeMount () {
    const eventName = this.$options.name.toLowerCase() + '-before-mount'
    Logger.debug(eventName, 'event')()
    EventBus.$emit(eventName, this)
  },
  mounted () {
    const eventName = this.$options.name.toLowerCase() + '-after-mounted'
    Logger.debug(eventName, 'event')()
    EventBus.$emit(eventName, this)
  }

}
