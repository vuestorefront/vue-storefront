declare const fet: typeof fetch;

declare module 'isomorphic-fetch' {
  export const fetch: typeof fet;
  export default fetch;
}
