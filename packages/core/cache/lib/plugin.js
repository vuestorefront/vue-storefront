export default (ctx, inject) => {
  const options = <%= serialize(options) %>;
  const cache = {
    ...options,
    tagsSet: new Set()
  }
  ctx.req.$vsfCache = cache;
  ctx.ssrContext.req.$vsfCache = cache;
}
