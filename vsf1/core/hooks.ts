import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

const {
  hook: beforeStoreViewChangedHook,
  executor: beforeStoreViewChangedExecutor
} = createMutatorHook<any, any>()

const {
  hook: afterStoreViewChangedHook,
  executor: afterStoreViewChangedExecutor
} = createListenerHook<any>()

const {
  hook: afterAppInitHook,
  executor: afterAppInitExecutor
} = createListenerHook<any>()

const {
  hook: beforeHydratedHook,
  executor: beforeHydratedExecutor
} = createMutatorHook<any, any>()

const {
  hook: afterProductThumbnailPathGeneratedHook,
  executor: afterProductThumbnailPathGeneratedExecutor
} = createMutatorHook<{ path: string, pathType: string, sizeX: number, sizeY: number }, { path: string }>()

const {
  hook: beforeLogRenderedHook,
  executor: beforeLogRenderedExecutor
} = createMutatorHook<{ type: string, message: any, tag: any, context: any, noDefaultOutput?: boolean }, { message: any, tag: any, context: any, noDefaultOutput?: boolean }>()

/** Only for internal usage in core */
const coreHooksExecutors = {
  afterAppInit: afterAppInitExecutor,
  beforeStoreViewChanged: beforeStoreViewChangedExecutor,
  afterStoreViewChanged: afterStoreViewChangedExecutor,
  beforeHydrated: beforeHydratedExecutor,
  afterProductThumbnailPathGenerate: afterProductThumbnailPathGeneratedExecutor,
  beforeLogRendered: beforeLogRenderedExecutor
}

const coreHooks = {
  /** Hook is fired right after whole application is initialized. Modules are registered and theme setted up */
  afterAppInit: afterAppInitHook,
  /** Hook is fired directly before changing current storeView (multistrore)
   * @param storeView Inside this function you have access to order object that you can access and modify. It should return order object.
  */
  beforeStoreViewChanged: beforeStoreViewChangedHook,
  /** Hook is fired right after storeView (multistore) is changed
   * @param storeView current storeView
  */
  afterStoreViewChanged: afterStoreViewChangedHook,
  beforeHydrated: beforeHydratedHook,
  afterProductThumbnailPathGenerate: afterProductThumbnailPathGeneratedHook,
  beforeLogRendered: beforeLogRenderedHook
}

export {
  coreHooks,
  coreHooksExecutors
}
