// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
