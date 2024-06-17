// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["sf-docs-base"],
  vite: {
    define: {
      __NUXT_ASYNC_CONTEXT__: false,
    },
  },
});
