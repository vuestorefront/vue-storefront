import fs from "fs";

const nextConfigPath = "./playground/app/next.config.js";
const nuxtConfigPath = "./playground/app/nuxt.config.ts";

export const getFrameworkName = (): string => {
  if (fs.existsSync(nextConfigPath)) {
    return "next";
  }

  if (fs.existsSync(nuxtConfigPath)) {
    return "nuxt";
  }

  const noFramework = "Could not detect framework. No page will be generated.";

  console.warn(noFramework);

  return noFramework;
};
