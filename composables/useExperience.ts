import {
  selectHasExperienceVariants,
  selectExperience,
  selectExperienceVariant,
} from "@ninetailed/experience.js";

import type {
  Baseline,
  ExperienceConfiguration,
  Profile,
  Reference,
  VariantRef,
} from "@ninetailed/experience.js";

import { useExperienceSelectionMiddleware } from "./useExperienceSelectionMiddleware";
import { ProfileStateKey } from "~/vuePlugins/ninetailed";

type Load<Variant extends Reference> = {
  status: "loading";
  loading: boolean;
  hasVariants: boolean;
  baseline: Baseline;
  experience: null;
  variant: Variant;
  variantIndex: 0;
  audience: null;
  isPersonalized: boolean;
  profile: null;
  error: null;
};

type Success<Variant extends Reference> = {
  status: "success";
  loading: boolean;
  hasVariants: boolean;
  baseline: Baseline;
  experience: ExperienceConfiguration<Variant> | null;
  variant: Variant;
  variantIndex: number;
  audience: { id: string } | null;
  isPersonalized: boolean;
  profile: Profile;
  error: null;
};

type Fail<Variant extends Reference> = {
  status: "error";
  loading: boolean;
  hasVariants: boolean;
  baseline: Baseline;
  experience: null;
  variant: Variant;
  variantIndex: 0;
  audience: null;
  isPersonalized: boolean;
  profile: null;
  error: Error;
};

type UseExperienceArgs<Variant extends Reference> = {
  baseline: Baseline;
  experiences: ExperienceConfiguration<Variant>[];
};

type UseExperienceResponse<Variant extends Reference> =
  | Load<Variant | VariantRef>
  | Success<Variant | VariantRef>
  | Fail<Variant | VariantRef>;

// TODO: Re-implement override for middleware application
// TODO: Figure out return typing
export const useExperience = <Variant extends Reference>({
  baseline,
  experiences,
}: UseExperienceArgs<Variant>): UseExperienceResponse<Variant> => {
  const profileState = inject(ProfileStateKey);
  const hasVariants = experiences
    .map((experience) => selectHasExperienceVariants(experience, baseline))
    .reduce((acc, curr) => acc || curr, false);

  // Middleware
  // Override result

  const baseReturn = {
    ...profileState?.value,
    hasVariants,
    baseline,
  };

  const emptyReturn = {
    ...baseReturn,
    experience: null,
    variant: baseline,
    variantIndex: 0,
    audience: null,
    isPersonalized: false,
    profile: null,
  };

  const experienceState = computed(() => {
    if (
      profileState?.value.status === "loading" ||
      profileState?.value.status === "error" ||
      !profileState?.value.profile
    ) {
      return emptyReturn;
    }

    const experience = selectExperience({
      experiences,
      profile: profileState.value.profile,
    });

    if (!experience) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return { ...emptyReturn, profile: profileState.value.profile };
    }

    // The correct experience is identified...
    // FIXME: Something wrong here, I keep getting the baseline returned.
    const { variant, index } = selectExperienceVariant({
      baseline,
      experience,
      profile: profileState.value.profile,
    });

    return {
      ...baseReturn,
      status: "success",
      loading: false,
      error: null,
      experience,
      variant,
      variantIndex: index,
      audience: experience.audience ? experience.audience : null,
      profile: profileState.value.profile,
      isPersonalized: true,
    };
  });

  return experienceState;

  const experienceSelectionMiddleware = useExperienceSelectionMiddleware({
    experiences,
    baseline,
    profile: profileState?.value.profile,
  });

  const overrideResult = ({
    experience: originalExperience,
    variant: originalVariant,
    variantIndex: originalVariantIndex,
    ...other
  }: UseExperienceResponse<Variant>): UseExperienceResponse<Variant> => {
    const { experience, variant, variantIndex } = experienceSelectionMiddleware(
      {
        experience: originalExperience,
        variant: originalVariant,
        variantIndex: originalVariantIndex,
      }
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return {
      ...other,
      audience: experience?.audience ? experience.audience : null,
      experience,
      variant,
      variantIndex,
    };
  };
};
