import { watch, ref } from "vue";
import type {
  ExperienceConfiguration,
  Profile,
  Reference,
} from "@ninetailed/experience.js-shared";
import { makeExperienceSelectMiddleware } from "@ninetailed/experience.js";

import { NinetailedKey } from "~/vuePlugins/ninetailed";

type UseExperienceSelectionMiddlewareArg<Variant extends Reference> = {
  experiences: ExperienceConfiguration<Variant>[];
  baseline: Reference;
  profile: Profile | null;
};

export const useExperienceSelectionMiddleware = <Variant extends Reference>({
  experiences,
  baseline,
  profile,
}: UseExperienceSelectionMiddlewareArg<Variant>) => {
  // TODO: Type guard undefined
  const ninetailed = inject(NinetailedKey);

  // FIXME: Reactivity hack? This implemenation causes an overflow.
  const currentTime = ref(Date.now());

  const experienceSelectionMiddleware = reactive(
    makeExperienceSelectMiddleware<Variant>({
      plugins: ninetailed?.plugins,
      experiences,
      baseline,
      profile,
      onChange: () => (currentTime.value = Date.now()),
    })
  );

  watch(
    currentTime,
    (time, prevTime, onCleanup) => {
      experienceSelectionMiddleware.addListeners();
      onCleanup(experienceSelectionMiddleware.removeListeners);
    },
    { immediate: true }
  );

  return experienceSelectionMiddleware.middleware;
};
