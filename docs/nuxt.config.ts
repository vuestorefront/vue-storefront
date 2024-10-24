// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["sf-docs-base"],
  routeRules: {
    "/middleware/guides/orchestration": {
      redirect: "/middleware/guides/federation",
    },
  },
});

