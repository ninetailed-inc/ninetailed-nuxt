<template>
  <div>
    <div>{{ time }}</div>
    <button @click="forceUpdateProfile">Force Update Profile</button>
    <button @click="forceUpdate">Force Update</button>
    <button @click="resetProfile">Reset Profile</button>
    <nav>
      <NuxtLink to="/"> Home </NuxtLink>
      <NuxtLink to="/pricing"> Pricing </NuxtLink>
    </nav>
    <NuxtPage />
    <ClientOnly>
      <pre>{{ profileState }}</pre>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { NinetailedKey, ProfileStateKey } from "./vuePlugins/ninetailed";
import type { Ninetailed, ProfileState } from "@ninetailed/experience.js";
import type { Ref } from "vue";

let ninetailed: Ninetailed | undefined;
let profileState: Ref<ProfileState> | undefined;

const time = ref(Date.now());

function resetProfile() {
  ninetailed?.reset();
}

function forceUpdate() {
  time.value = Date.now();
}

function forceUpdateProfile() {
  ninetailed?.page();
}

if (process.client) {
  ninetailed = inject(NinetailedKey);
  profileState = inject(ProfileStateKey);
}
</script>
