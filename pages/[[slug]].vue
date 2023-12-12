<template>
  <pre>You've visited the {{ formattedSlug }} page!</pre>
  <pre>
 There are {{ page.fields.sections.length }} sections on this entry, {{
      numberOfHeroSections
    }} of which are Hero sections.</pre
  >
  <ClientOnly>
    <PageSections />
  </ClientOnly>
</template>

<script setup lang="tsx">
import type { SingularBlock } from "~/lib/experiences";
import {
  mapBaselineContentfulEntry,
  parseExperiences,
} from "~/lib/experiences";
import Experience from "../components/Experience.vue";

const route = useRoute();
const formattedSlug = ref(route.params.slug || "/");

// TODO: Make pure SSG via server only fetched data
const { data } = await useAsyncData(
  `page: ${formattedSlug}`,
  async () => {
    const { $contentfulClient } = useNuxtApp();
    return await $contentfulClient.getEntries({
      content_type: "page",
      "fields.slug": formattedSlug.value,
      limit: 1,
      include: 10,
    });
  },
  { watch: [() => route.params.slug] }
);

const page = data.value.items[0];

const numberOfHeroSections = page.fields.sections.filter(
  (section: any) => section.sys?.contentType.sys.id === "hero"
).length;

const PageSections = () => {
  return page.fields.sections.map((section: SingularBlock) => {
    if (section.sys.contentType?.sys.id === "hero") {
      const baselineHeroEntry = mapBaselineContentfulEntry(section);
      const mappedExperiences = parseExperiences(section);
      return (
        <>
          <Experience
            baseline={baselineHeroEntry}
            key={baselineHeroEntry.id}
            experiences={mappedExperiences}
            component="Hero"
          />
        </>
      );
    }
  });
};
</script>
