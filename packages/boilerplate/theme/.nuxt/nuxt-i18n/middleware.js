import middleware from '../middleware'

/** @type {import('@nuxt/types').Middleware} */
middleware.nuxti18n = async (context) => {
  const { app, isHMR } = context

  if (isHMR) {
    return
  }

  const [status, redirectPath, preserveQuery] = await app.i18n.__onNavigate(context.route)
  if (status && redirectPath) {
    const query = preserveQuery ? context.route.query : undefined
    context.redirect(status, redirectPath, query)
  }
}
