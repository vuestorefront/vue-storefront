/* eslint-disable */
import { isAbsolute, resolve } from 'path';
import { Logger } from '@vue-storefront/core';

/**
 * Helper function that imports default handler by package name
 */
function requirePackage (name) {
  const path = isAbsolute(name) || name.startsWith('.')
    ? resolve(process.cwd(), name)
    : require.resolve(name, { paths: [ process.cwd() ] });

  return require(path).default;
}

/**
 * Adds endpoint to invalidate cache
 */
function createInvalidationEndpoint (driver, options) {
  if (!options || !options.endpoint || !options.invalidators) {
    return;
  }

  const handler = async (request, response) => {
    try {
      // Resolve invalidator paths to packages
      const invalidators = options.invalidators.map(invalidator => {
        return typeof invalidator === 'string'
          ? requirePackage(invalidator)
          : invalidator;
      });

      // Get tags from all invalidators
      const tags = invalidators.reduce((tags, invalidator) => {
        const newTags = invalidator({ request, response, options });
        return tags.concat(newTags);
      }, []);


      // Call driver invalidator with all tags
      await driver.invalidate({
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
  return Array.isArray(driver)
    ? requirePackage(driver[0])(driver[1])
    : requirePackage(driver)();
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
  createInvalidationEndpoint.call(this, driver, options.server);

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
