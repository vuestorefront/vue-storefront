import { confirm, select } from "@clack/prompts";
import execa from "execa";
import { log } from ".";

export type PackageManager = "npm" | "yarn";

const checkPackageManager = async (
  packageManager: PackageManager
): Promise<boolean> => {
  try {
    await execa(packageManager, ["--version"], { stdio: "ignore" });
  } catch (error) {
    return false;
  }

  return true;
};

export const getPkgManager = async (
  pkgManager?: PackageManager
): Promise<PackageManager> => {
  let packageManager = pkgManager || "yarn";

  packageManager = (await select({
    message: "What package manager do you want to use?",
    options: [
      { label: "NPM", value: "npm" },
      { label: "Yarn", value: "yarn" },
    ],
  })) as unknown as PackageManager;

  const isPackageManagerExists = await checkPackageManager(packageManager);

  if (!isPackageManagerExists) {
    const useAnotherPackageManager = await confirm({
      message: `Package manager ${packageManager} not found. Do you want to use another package manager?`,
      active: "Yes",
    });

    if (useAnotherPackageManager) {
      if (packageManager === "npm") {
        packageManager = "yarn";
      } else {
        packageManager = "npm";
      }

      return await getPkgManager(packageManager);
    }
    log("Please install package manager and try again.");
    process.exit(1);
  }

  return packageManager;
};
