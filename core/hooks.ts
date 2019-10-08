import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

const { hook: beforeStoreViewChangedHook, executor: beforeStoreViewChangedExecutor }: {
  hook: (storeViewMutator: (storeView: any) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterStoreViewChangedHook, executor: afterStoreViewChangedExecutor }: {
  hook: (storeViewListener: (storeView?: any) => void) => void,
  executor: any
} = createListenerHook()

const { hook: afterAppInitHook, executor: afterAppInitExecutor }: {
  hook: (appInitListener: () => void) => void,
  executor: any
} = createListenerHook()

const { hook: beforeHydratedHook, executor: beforeHydratedExecutor }: {
  hook: (hydratedMutator: (initialState: any) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterProductThumbnailPathGeneratedHook, executor: afterProductThumbnailPathGeneratedExecutor }: {
  hook: (productThumbnailPathGenerateMutator: (result: { path: string, sizeX: number, sizeY: number }) => { path: string }) => void,
  executor: any
} = createMutatorHook()

/** Only for internal usage in core */
const coreHooksExecutors = {
  afterAppInit: afterAppInitExecutor,
  beforeStoreViewChanged: beforeStoreViewChangedExecutor,
  afterStoreViewChanged: afterStoreViewChangedExecutor,
  beforeHydrated: beforeHydratedExecutor,
  afterProductThumbnailPathGenerate: afterProductThumbnailPathGeneratedExecutor
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
  afterProductThumbnailPathGenerate: afterProductThumbnailPathGeneratedHook
}

export {
  coreHooks,
  coreHooksExecutors
}
