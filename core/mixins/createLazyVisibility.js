import camelCase from 'lodash-es/camelCase'

const getMainPropName = (scope) => camelCase(`${scope}LazyVisibilityMetadata`)
const getMethodName = (scope) => camelCase(`${scope}LazyVisibility`)

/**
 * Creates mixin that exposes method 'lazyVisibility' and data 'lazyVisibilityMetadata'
 * If you want to use it multiple times in one component then you need to create it with different scope.
 * Options:
 * - scope - changing scope will change method and data names. For example:
 * { scope: 'product' } will result in 'productLazyVisibility' and 'productLazyVisibilityMetadata'
 * - onRouteChange - will be repeated each time when route is changed (by default it's called only once)
 */
const createLazyVisibilityMixin = ({
  scope = '',
  onRouteChange = false
} = {}) => ({
  data () {
    return {
      [getMainPropName(scope)]: {
        loading: false,
        loaded: false,
        path: ''
      }
    }
  },
  methods: {
    [getMethodName(scope)] (callback) {
      return async (isVisible) => {
        // we don't care if component is NOT visible
        if (!isVisible) return

        // make call only once
        if (this[getMainPropName(scope)].loaded && !onRouteChange) return

        // reset state because route is changed (component may be same)
        if (this[getMainPropName(scope)].path !== this.$route.path) {
          this[getMainPropName(scope)].loading = false
          this[getMainPropName(scope)].loaded = false
        }

        // make call
        if (!this[getMainPropName(scope)].loaded && !this[getMainPropName(scope)].loading) {
          this[getMainPropName(scope)].path = this.$route.path
          this[getMainPropName(scope)].loading = true
          await callback()
          this[getMainPropName(scope)].loading = false
          this[getMainPropName(scope)].loaded = true
        }
      }
    }
  }
})

export default createLazyVisibilityMixin
