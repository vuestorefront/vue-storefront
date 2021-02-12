/* eslint-disable */
import path from 'path';
import { Logger } from '@vue-storefront/core';

/**
 * Adds endpoint to invalidate cache
 */
function createInvalidationEndpoint (path, driver) {
  if (!path) {
    return;
  }

  this.addServerMiddleware({
    path,
    handler: async (req, res, next) => {
      try {
        await driver.invalidate({ req, res });
      } catch (error) {
        Logger.error('Cache driver thrown an error when invalidating cache! Operation skipped.');
        Logger.error(err);
      }

      next();
    }
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
    ? require(path.resolve(driver[0])).default(driver[1])
    : require(path.resolve(driver)).default({});
}

/**
 * Main VSF cache module.
 */
export default function cacheModule (options) {
  Logger.info('Installed Vue Storefront Cache plugin');

  // This part must be before the condition below
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    mode: 'server',
    options
  });

  if (!this.nuxt || !this.nuxt.renderer) {
    return;
  }

  // Create cache driver
  const driver = createDriver(options.driver)

  // Create invalidation endpoint if necessary
  createInvalidationEndpoint.call(this, options.invalidateEndpoint, driver);

  // Create renderer
  createRenderer.call(this, async (route, context, render) => {
    const getTags = () => {
      if (context.req.$vsfCache && context.req.$vsfCache.tagsSet) {
        return Array.from(context.req.$vsfCache.tagsSet);
      }

      return [];
    }

    try {
      return await driver.invoke({ route, context, getTags, render });
    } catch (err) {
      Logger.error('Cache driver thrown an error when fetching cache! Server will render fresh page.');
      Logger.error(err);
      return render();
    }
  });
}
