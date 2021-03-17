import { integrationPlugin } from '@vue-storefront/core'

export default integrationPlugin(({ integration }) => {
  integration.configure('sb', { ...<%= serialize(options) %> })
})
