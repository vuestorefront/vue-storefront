import { spawn } from "child_process";
import { spinner } from "@clack/prompts";
import picocolors from "picocolors";
import { t } from "i18next";

/** Generate sample data and upgrade */
const handleSampleData = async (
  magentoDirName: string,
  writeLog: (message: string) => void
) => {
  const options = {
    cwd: magentoDirName,
    shell: true,
  };

  const sp = spinner();

  return new Promise((resolve, reject) => {
    const sampleData = spawn(
      "bin/magento sampledata:deploy && bin/magento setup:upgrade",
      options
    );

    sp.start(
      picocolors.cyan(t("command.generate_store.progress.sample_data_start"))
    );

    sampleData.stdout.on("data", (data) => {
      writeLog(data.toString());
    });

    sampleData.stderr.on("data", (data) => {
      writeLog(data.toString());
    });

    sampleData.on("close", (code) => {
      if (code === 0) {
        sp.stop(
          picocolors.green(t("command.generate_store.progress.sample_data_end"))
        );
        resolve(1);
      } else {
        sp.stop(
          picocolors.red(
            t("command.generate_store.progress.sample_data_failed")
          )
        );
        reject();
      }
    });
  });
};

export default handleSampleData;
