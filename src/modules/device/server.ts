// import { serverHooks } from '@vue-storefront/core/server/hooks';
// import config from 'config';
// import deviceLibrary from './logic';

// serverHooks.beforeBuildCacheKey(({ req, site }) => {
//   const tests = deviceLibrary(req.headers['user-agent'], config.device.tests);
//   const device = tests.isDesktop ? 'desktop' : 'non-desktop';
//   return `page:${device}:${site}:${req.url}`;
// })
