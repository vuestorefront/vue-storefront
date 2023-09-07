import { getFrameworkName } from "../../../../../utils";
import { writeNuxtPageMethod } from "../frameworkPages/nuxt-page";
import { writeNextPageMethod } from "../frameworkPages/next-page";

export const writePageMethod = async (name: string) => {
  const frameworkName = getFrameworkName();

  if (frameworkName === "nuxt") {
    await writeNuxtPageMethod(name);
  }

  if (frameworkName === "next") {
    await writeNextPageMethod(name);
  }
};
