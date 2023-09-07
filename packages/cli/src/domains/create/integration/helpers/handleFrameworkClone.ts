import { spinner } from "@clack/prompts";
import { cloneGitRepository } from "../../../../utils";

export const handleFrameworkClone = async (
  directoryName: string,
  framework: string
): Promise<void> => {
  const sp = spinner();

  sp.start("Cloning SDK boilerplate...");

  if (framework === "nuxt") {
    await cloneGitRepository({
      projectDir: `${directoryName}/playground/app`,
      gitRepositoryURL: "https://github.com/vuestorefront/nuxt-sdk-playground",
    });
  }

  if (framework === "next") {
    await cloneGitRepository({
      projectDir: `${directoryName}/playground/app`,
      gitRepositoryURL: "https://github.com/vuestorefront/next-sdk-playground",
    });
  }

  sp.stop("SDK boilerplate has been cloned successfully!");
};
