/* eslint-disable */

const CacheDriver = (options, invalidators) => {
  console.log('driver called', options);

  return {
    invoke: async ({ getTags, render, context }) => {

      const res = await render();
      context.res.setHeader('X-Cache-Tags', getTags().join(' '))
      
      return res;
    },
    invalidate: ({ req, res }) => {
      console.log('invalidate called', req);
    }
  };
};

export default CacheDriver;
