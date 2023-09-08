import { Command } from "@oclif/core";
import { t } from "i18next";
import GenerateStore from "./generate/store";

export default class Init extends Command {
  static override description = t("command.generate_store.description");

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {};

  public async run(): Promise<void> {
    const generateStore = new GenerateStore(this.argv, this.config);

    return generateStore.run.bind(this).call(this);
  }
}
