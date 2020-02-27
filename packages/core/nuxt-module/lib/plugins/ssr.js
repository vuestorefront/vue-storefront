
const ssrPlugin = (context) => {
  if (!process.server) {
    window.__VSF_STATE__ = context.nuxtState.vsfState;
  }
};

export default ssrPlugin;
