// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // Homepage pre-rendered at build time
    "/": { prerender: true },
  },
  runtimeConfig: {
    public: {
      ninetailedClientId: "",
      ninetailedEnvironment: "",
    },
  },
});
