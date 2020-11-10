import path from 'path';
import { cache } from '@vue-storefront/core';
import { createMiddleware } from '@vue-storefront/core/server';

function rendererFactory (renderFn) {
  const renderer = this.nuxt.renderer;
  const renderRoute = renderer.renderRoute.bind(renderer);

  renderer.renderRoute = (route, context) => {
    const render = () => renderRoute(route, context)
    return renderFn(route, context, render)
  }
}

const createInvalidators = (options) => {
  const invalidatorsRaw = options.server.invalidators || []

  return invalidatorsRaw.map(invalidator => {
    if (typeof invalidator === 'string') {
      return require(path.resolve(invalidator)).default;
    }

    return invalidator
  })
}

const createDriver = (options) => {
  const { driver } = options.server
  const invalidators = createInvalidators(options)
  if (Array.isArray(driver)) {
    return require(path.resolve(driver[0])).default(driver[1], invalidators);
  }

  return require(path.resolve(driver)).default({}, invalidators);
}

function cacheModule (options) {
  cache.registerDriver(createDriver(options))
  const createRenderer = rendererFactory.bind(this)

  if (options.server.invalidateEndpoint) {
    const { middleware, extend } = createMiddleware({});

    extend((app) => {
      app.get(options.server.invalidateEndpoint, async (req, res) => {
        const driver = cache.getCacheDriver()
        await driver.invalidate({ req, res });

        res.send()
      })
    })

    this.addServerMiddleware(middleware);
    console.log('YES ENDPINT')
  }

  createRenderer(async (route, context, render) => {
    const driver = cache.getCacheDriver()
    const getTags = () => {
      if (context.req.vsfCache) {
        return Array.from(context.req.vsfCache.tags)
      }

      if (context.req.headers['cache-tags']) {
        return context.req.headers['cache-tags']
          .split(' ')
          .map(t => ({ prefix: t[0], value: t.substr(1) }));
      }

      return []
    }

    return driver.invoke({ route, context, getTags, render })
  });
}

export default cacheModule
