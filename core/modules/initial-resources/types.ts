export interface InitialResourcesElement {
  filters: string[],
  regexps?: RegExp[],
  type?: 'script' | 'style',
  onload?: boolean,
  rel?: 'prefetch' | 'preload'
}
