import path from 'path';
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
  // This part must be before the condition below
  const resolvedDriver = createDriver(options)
  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    mode: 'server',
    options: {
      ...options.server,
      driver: resolvedDriver
    }
  });

  if (!this.nuxt || !this.nuxt.renderer) {
    return
  }
  const createRenderer = rendererFactory.bind(this)

  if (options.server.invalidateEndpoint) {
    const { middleware, extend } = createMiddleware({});

    extend((app) => {
      app.get(options.server.invalidateEndpoint, async (req, res) => {
        await resolvedDriver.invalidate({ req, res });

        res.send()
      })
    })

    this.addServerMiddleware(middleware);
  }

  createRenderer(async (route, context, render) => {
    const getTags = () => {
      if (context.req.$vsfCache && context.req.$vsfCache.tagsSet) {
        return Array.from(context.req.$vsfCache.tagsSet)
      }

      return []
    }

    try {
      return await resolvedDriver.invoke({ route, context, getTags, render });
    } catch (err) {
      console.error('Your cache driver thrown an error!')
      console.error('Server is going to render fresh page (cacheless)')
      console.error(err)
      return render();
    }
  });


}

export default cacheModule
