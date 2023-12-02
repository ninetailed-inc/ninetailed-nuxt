<template>
  <!-- TODO: Use loading component -->
  <render />
</template>

<script setup lang="tsx">
import { useExperience } from "~/composables/useExperience";
import type {
  Baseline,
  ExperienceConfiguration,
  Reference,
} from "@ninetailed/experience.js";

// TODO: Type all the things
const props = defineProps<{
  experiences: ExperienceConfiguration<Reference>[];
  component: string; // Notice this is a string so this can use resolveComponent to figure this out
  loadingComponent?: any;
  passthroughProps?: any;
  baseline: Baseline; // Use explicit prop name, rather than spread syntax of React?
}>();

const experienceState = useExperience({
  baseline: props.baseline,
  experiences: props.experiences,
});

// WARNING: This implementation requires that any possible resolved components are globally registered. See ~/plugins/possibleExperienceComponents.ts
// See: https://vuejs.org/guide/components/registration.html for documentation
// See: https://github.com/nuxt/nuxt/issues/14036 for in-practice inquiry about component polymorphism
const MyRenderComponent = resolveComponent(props.component);

const render = () => {
  // TODO: Investigate JSX typing
  // TODO: Add pass through props
  return (
    <>
      <div>static</div>
      <MyRenderComponent {...experienceState.value.variant}></MyRenderComponent>
      <div>{JSON.stringify(experienceState.value.status, null, 2)}</div>
      <div>{JSON.stringify(experienceState.value.variantIndex, null, 2)}</div>
      <div>{JSON.stringify(experienceState.value.isPersonalized, null, 2)}</div>
      <div>{JSON.stringify(experienceState.value.experience, null, 2)}</div>
    </>
  );
};
</script>
