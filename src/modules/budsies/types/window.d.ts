declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Feature modules augment this namespace.
  interface BudsiesGlobal {}

  interface Window {
    budsies?: BudsiesGlobal
  }
}

export {}
