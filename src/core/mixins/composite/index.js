import EventBus from '@vue-storefront/core/plugins/event-bus'

export default {
  beforeCreated () {
    const eventName = this.$options.name.toLowerCase() + '-before-created'
    console.debug(eventName)
    EventBus.$emit(eventName, this)
  },
  created () {
    const eventName = this.$options.name.toLowerCase() + '-after-created'
    console.debug(eventName)
    EventBus.$emit(eventName, this)
  },
  beforeMount () {
    const eventName = this.$options.name.toLowerCase() + '-before-mount'
    console.debug(eventName)
    EventBus.$emit(eventName, this)
  },
  mounted () {
    const eventName = this.$options.name.toLowerCase() + '-after-mounted'
    console.debug(eventName)
    EventBus.$emit(eventName, this)
  }

}
