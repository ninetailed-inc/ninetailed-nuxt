<template>
  <div>
    <NuxtLink to="/"> Home </NuxtLink>
    <NuxtLink to="/pricing"> Pricing </NuxtLink>
    <NuxtPage />
    <pre>{{ ninetailed }}</pre>
    <!-- <NuxtWelcome /> -->
  </div>
</template>

<script setup lang="ts">
import { NinetailedKey } from "./vuePlugins/ninetailed/symbols";

const ninetailed = inject(NinetailedKey);
</script>
