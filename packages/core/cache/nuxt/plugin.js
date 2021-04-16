/* eslint-disable */
export default (ctx) => {
  const options = <%= serialize(options) %>;
 
  ctx.req.$vsfCache = {
    ...options,
    tagsSet: new Set()
  };
}
