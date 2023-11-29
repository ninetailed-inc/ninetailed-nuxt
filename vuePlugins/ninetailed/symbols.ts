// symbols.ts
import type { InjectionKey } from "vue";
import type { Ninetailed, ProfileState } from "@ninetailed/experience.js";

export const NinetailedKey: InjectionKey<{
  ninetailed: Ninetailed;
  profile: Ref<ProfileState>;
}> = Symbol("Ninetailed");
