<template>
  <h1>
    {{ fields?.headline }}
  </h1>
</template>

<script setup lang="ts">
const { fields } = defineProps<{
  metadata: any;
  sys: any;
  fields: any;
}>();
</script>
