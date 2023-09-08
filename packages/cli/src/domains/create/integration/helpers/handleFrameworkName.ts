import { isCancel, select } from "@clack/prompts";
import { log } from "../../../../utils";

export const handleFrameworkName = async (
  framework: string
): Promise<string> => {
  let frameworkName = framework;

  if (!frameworkName) {
    frameworkName = (await select({
      message: "What framework do you want to use?",
      options: [
        { label: "Nuxt", value: "nuxt" },
        { label: "Next", value: "next" },
      ],
    })) as unknown as string;

    if (isCancel(frameworkName)) {
      log("SDK integration boilerplate generation has been canceled!");
      process.exit(0);
    }
  }

  return frameworkName;
};
