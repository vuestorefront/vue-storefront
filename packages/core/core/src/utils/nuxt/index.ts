export const registerIntegration = (fn) => (ctx, inject) => {
  const configure = ({ settings, tag }) => {
    if ((process as any).server) {
      ctx.req['$' + tag] = settings;
    }

    inject(tag, settings);
  };

  return fn({ ...ctx, vsf: { configure } }, inject);
};
