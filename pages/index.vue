<template>
  <h1>Welcome home</h1>
  <ClientOnly>
    <Experience
      :baseline="baselineHero"
      :experiences="mappedExperiences"
      :component="'Hero'"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { parseExperiences } from "~/lib/experiences";

// TODO: Make pure SSG via server only fetched data
const { data } = await useAsyncData("page", async () => {
  const { $contentfulClient } = useNuxtApp();
  return await $contentfulClient.getEntries({
    content_type: "page",
    "fields.slug": "/",
    limit: 1,
    include: 10,
  });
});

const page = data.value.items[0];
const baselineHero = page.fields.sections.find(
  (section) => section.sys.contentType.sys.id === "hero"
);
const mappedExperiences = parseExperiences(baselineHero);
</script>
