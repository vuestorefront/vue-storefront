import { intro } from "@clack/prompts";
import { Command } from "@oclif/core";
import picocolors from "picocolors";
import { t } from "i18next";
import { initLogger } from "../domains/generate/logging/logger";
import {
  checkDocker,
  getMagentoDomainName,
} from "../domains/generate/magento2/docker";
import { getMagentoDetails } from "../domains/generate/magento2/functions";
import { installMagento } from "../domains/generate/magento2/installMagento";
import { simpleLog } from "../domains/generate/magento2/functions/terminalHelpers";

export default class M2Only extends Command {
  static override description = "Install local Magento 2 instance";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    const { writeLog, deleteLog } = initLogger();

    intro("Welcome to the Magento 2 local instance installer!");

    await checkDocker(writeLog);

    const { magentoDirName, magentoAccessKey, magentoSecretKey } =
      await getMagentoDetails();

    const magentoDomain = await getMagentoDomainName(
      t("command.generate_store.magento.domain")
    );

    await installMagento({
      isInstallMagento: true,
      magentoDirName,
      magentoDomain,
      magentoAccessKey,
      magentoSecretKey,
      writeLog,
    });

    deleteLog();

    simpleLog("Happy coding! 🎉", picocolors.green);

    this.exit(0);
  }
}
