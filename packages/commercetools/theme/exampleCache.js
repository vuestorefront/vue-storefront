/* eslint-disable */

const CacheDriver = (options, invalidators) => {
  console.log('driver called', options);

  return {
    invoke: async ({ getTags, render }) => {

      const res = await render();
      console.log('invoke called 2', getTags());

      return res;
    },
    invalidate: ({ req, res }) => {
      console.log('invalidate called', req);
    }
  };
};

export default CacheDriver;
