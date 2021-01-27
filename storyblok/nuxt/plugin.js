import { integrationPlugin } from '@vue-storefront/storyblok'

export default integrationPlugin(({ integration }) => {
  integration.configure({ ...<%= serialize(options) %> })
});
