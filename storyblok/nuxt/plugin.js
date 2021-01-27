import { integrationPlugin } from '@vuestorefront/storyblok'

export default integrationPlugin(({ integration }) => {
  integration.configure({ ...<%= serialize(options) %> })
});
