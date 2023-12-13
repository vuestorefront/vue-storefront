export default defineNuxtConfig({
  modules: ["../../src/module.ts"],
  vsfSdk: {
    apiBaseUrl: "localhost:4000",
    apiProtocol: "http",
    apiSubpath: "",
    isMultistoreEnabled: false,
  },
});
