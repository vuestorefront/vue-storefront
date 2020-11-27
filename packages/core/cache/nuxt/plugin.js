/* eslint-disable */
export default (ctx) => {
  const options = <%= serialize(options) %>;
  const cache = {
    ...options,
    tagsSet: new Set()
  }
  ctx.req.$vsfCache = cache;
}
