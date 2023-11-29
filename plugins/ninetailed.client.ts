// This is the Nuxt-specific plugin, which takes the Vue plugin and does two things:
// 1. Loads Ninetailed client-side only due to this file's suffix
// 2. Tracks each page view by watching the route

import { defineNuxtPlugin } from "nuxt/app";
import VueNinetailed from "../vuePlugins/ninetailed";
import { NinetailedKey } from "~/vuePlugins/ninetailed/symbols";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const route = useRoute();

  nuxtApp.vueApp.use(VueNinetailed, {
    clientId: config.public.ninetailedClientId,
    environment: config.public.ninetailedEnvironment,
  });

  const ninetailedInstance = inject(NinetailedKey);

  if (ninetailedInstance) {
    const { page } = ninetailedInstance.ninetailed;
    watch(
      () => route.fullPath,
      () => {
        page();
      },
      { immediate: true }
    );
  }
});
