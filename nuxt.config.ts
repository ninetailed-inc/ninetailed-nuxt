// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  image: {
    contentful: {},
  },
  modules: ["@nuxt/image"],
  routeRules: {
    // Demo purposes only!
    "/**": { isr: 5 },
  },
  runtimeConfig: {
    public: {
      ninetailedClientId: "",
      ninetailedEnvironment: "",
      contentfulSpaceId: "",
      contentfulEnvironment: "",
      contentfulDeliveryToken: "",
    },
    contentfulPreviewToken: "",
  },
});
