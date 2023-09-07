import { Command } from "@oclif/core";
import { t } from "i18next";
import * as path from "path";
import { intro, isCancel, spinner, note } from "@clack/prompts";
import picocolors from "picocolors";
import { getIntegration } from "../../domains/generate/integration";
import { getProjectName } from "../../domains/generate/project-name";
import {
  cloneGitRepository,
  terminateGitRepository,
} from "../../domains/generate/git-repository";
import {
  copyEnv,
  installMg2Prompt,
  getMagentoDetails,
} from "../../domains/generate/magento2/functions";
import {
  logSimpleWarningMessage,
  simpleLog,
} from "../../domains/generate/magento2/functions/terminalHelpers";

import { installMagento } from "../../domains/generate/magento2/installMagento";
import {
  checkDocker,
  getMagentoDomainName,
} from "../../domains/generate/magento2/docker";
import installDeps from "../../domains/generate/magento2/functions/installDeps";
import checkNode from "../../domains/generate/magento2/functions/checkNode";
import checkYarn from "../../domains/generate/magento2/functions/checkYarn";
import { handleProjectDiretoryExists } from "../../domains/generate/directory/handleProjectDiretoryExists";
import { initLogger } from "../../domains/generate/logging/logger";

export default class GenerateStore extends Command {
  static override description = t("command.generate_store.description");

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {};

  static override args = [];

  async run(): Promise<void> {
    let magentoDomain = "";
    const sp = spinner();

    const { writeLog, deleteLog } = initLogger();

    intro(t("command.generate_store.message.intro"));

    // get project name
    const projectName = await getProjectName(
      t("command.generate_store.input.project_name")
    );

    const projectDir = path.resolve(projectName);

    // check if project directory exists and ask for overwrite
    await handleProjectDiretoryExists({
      projectName,
      projectDir,
      sp,
    });

    // get integration
    const integration = await getIntegration({
      message: t("command.generate_store.input.integration"),
      customIntegrationRepositoryMessage: t(
        "command.generate_store.input.custom_integration_repository"
      ),
    });

    const { name: integrationName } = integration;
    const isMagento2 = integrationName === "Magento 2";

    await checkNode(writeLog);
    await checkYarn(writeLog);

    // install Magento 2 if needed
    if (isMagento2) {
      const isInstallMagento = await installMg2Prompt(
        t("command.generate_store.magento.install")
      );

      if (isCancel(isInstallMagento)) {
        logSimpleWarningMessage(t("command.generate_store.message.canceled"));
        process.exit(0);
      }

      if (isInstallMagento) {
        await checkDocker(writeLog);

        const { magentoDirName, magentoAccessKey, magentoSecretKey } =
          await getMagentoDetails(projectName);

        magentoDomain = await getMagentoDomainName(
          t("command.generate_store.magento.domain")
        );

        await installMagento({
          isInstallMagento,
          magentoDirName,
          magentoDomain,
          magentoAccessKey,
          magentoSecretKey,
          writeLog,
        });
      } else {
        magentoDomain = await getMagentoDomainName(
          t("command.generate_store.magento.domain")
        );
      }
    }

    // generate VSF project
    sp.start(t("command.generate_store.progress.vsf_start"));
    await cloneGitRepository({
      projectDir,
      gitRepositoryURL: integration.gitRepositoryURL,
    });

    // copy .env file if Magento 2 integration
    if (isMagento2) {
      await copyEnv(projectDir, magentoDomain);
    }
    await terminateGitRepository(projectDir);

    sp.stop(picocolors.green(t("command.generate_store.progress.vsf_end")));

    // install dependencies
    await installDeps(projectDir, writeLog);

    // show success message
    if (integration.documentationURL) {
      note(
        t("command.generate_store.message.configure", {
          documentationURL: integration.documentationURL,
        })
      );
    }

    deleteLog();

    simpleLog(t("command.generate_store.message.cd_message"));
    simpleLog(
      t<string>("command.generate_store.message.cd_directory", {
        projectName,
      }),
      picocolors.magenta
    );
    simpleLog(t("command.generate_store.message.start"));
    simpleLog(
      t<string>("command.generate_store.message.start_command", {
        projectName,
      }),
      picocolors.magenta
    );

    simpleLog("");

    simpleLog("Happy coding! 🎉", picocolors.green);

    this.exit(0);
  }
}
