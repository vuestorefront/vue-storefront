export default defineNuxtConfig({
  modules: ["../../src/module.ts"],
  vsf: {
    middleware: {
      apiUrl: "http://localhost:4000",
    },
  },
});
