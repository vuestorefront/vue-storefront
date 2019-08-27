import { createListenerHook, createMutatorHook } from '@vue-storefront/core/lib/hooks'

const { hook: beforeStoreViewChangeHook, executor: beforeStoreViewChangeExecutor }: {
  hook: (storeViewMutator: (storeView: any) => any) => void,
  executor: any
} = createMutatorHook()

const { hook: afterStoreViewChangeHook, executor: afterStoreViewChangeExecutor }: {
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
  beforeStoreViewChange: beforeStoreViewChangeExecutor,
  afterStoreViewChange: afterStoreViewChangeExecutor,
  beforeHydrated: beforeHydratedExecutor,
  afterProductThumbnailPathGenerate: afterProductThumbnailPathGeneratedExecutor
}

const coreHooks = {
  /** Hook is fired right after whole application is initialized. Modules are registered and theme setted up */
  afterAppInit: afterAppInitHook,
  /** Hook is fired directly before changing current storeView (multistrore)
   * @param storeView Inside this function you have access to order object that you can access and modify. It should return order object.
  */
  beforeStoreViewChange: beforeStoreViewChangeHook,
  /** Hook is fired right after storeView (multistore) is changed
   * @param storeView current storeView
  */
  afterStoreViewChange: afterStoreViewChangeHook,
  beforeHydrated: beforeHydratedHook,
  afterProductThumbnailPathGenerate: afterProductThumbnailPathGeneratedHook
}

export {
  coreHooks,
  coreHooksExecutors
}
