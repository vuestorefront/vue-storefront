/* eslint-disable */
import { isAbsolute, resolve } from 'path';
import { Logger } from '@vue-storefront/core';

/**
 * Adds endpoint to invalidate cache
 */
function createInvalidationEndpoint (driver, options) {
  if (!options || !options.endpoint || !options.key) {
    return;
  }

  const handler = async (request, response) => {
    try {
      // Remove leading slash and get URL params
      const params = new URLSearchParams(request.url.replace(/^\//, ''));
      const tags = params.get('tags').split(',');

      if (params.get('key') !== options.key) {
        throw new Error('Invalid or missing invalidation key.');
      }

      const handler = tags.includes('*')
        ? driver.invalidateAll
        : driver.invalidate;

      await handler({
        request,
        response,
        tags
      });

      response.writeHead(200);
    } catch (error) {
      Logger.error('Cache driver thrown an error when invalidating cache! Operation skipped.');
      Logger.error(error);

      response.writeHead(500);
    }

    response.end();
  };

  this.addServerMiddleware({
    path: options.endpoint,
    handler
  });
}

/**
 * Creates custom renderer to use cache as much as possible.
 */
function createRenderer (renderFn) {
  const renderer = this.nuxt.renderer;
  const renderRoute = renderer.renderRoute.bind(renderer);

  renderer.renderRoute = (route, context) => {
    const render = () => renderRoute(route, context)
    return renderFn(route, context, render)
  };
}

/**
 * Loads driver using path provided in the configuration.
 */
function createDriver (driver) {
  const resolveDriverPath = name => {
    if (isAbsolute(name) || name.startsWith('.')) {
      return resolve(process.cwd(), name);
    }
    
    return require.resolve(driver[0], { paths: [ process.cwd() ] });
  };

  return Array.isArray(driver)
    ? require(resolveDriverPath(driver[0])).default(driver[1])
    : require(resolveDriverPath(driver)).default({});
}

/**
 * Main VSF cache module.
 */
export default function cacheModule (options) {
  Logger.info('Installed Vue Storefront Cache plugin');

  // This part must be before the condition below
  this.addPlugin({
    src: resolve(__dirname, './plugin.js'),
    mode: 'server',
    options
  });

  if (!this.nuxt || !this.nuxt.renderer) {
    return;
  }

  // Create cache driver
  const driver = createDriver(options.driver)

  // Create invalidation endpoint if necessary
  createInvalidationEndpoint.call(this, driver, options.invalidation);

  // Create renderer
  createRenderer.call(this, async (route, context, render) => {
    const getTags = () => {
      const tags = context.req.$vsfCache && context.req.$vsfCache.tagsSet
        ? Array.from(context.req.$vsfCache.tagsSet)
        : [];
      
      return tags.map(({ prefix, value }) => `${prefix}${value}`);
    }

    try {
      return await driver.invoke({
        key: `page:${ route }`,
        route,
        context,
        render,
        getTags
      });
    } catch (err) {
      Logger.error('Cache driver thrown an error when fetching cache! Server will render fresh page.');
      Logger.error(err);
      return render();
    }
  });
}
