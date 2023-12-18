export default defineNuxtConfig({
  modules: ["../../src/module.ts"],
  vsfSdk: {
    middleware: {
      apiUrl: "http://localhost:4000",
    },
  },
});
