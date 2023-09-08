import { spawn } from "child_process";
import fs from "fs";
import { spinner } from "@clack/prompts";
import picocolors from "picocolors";
import { t } from "i18next";
import { logSimpleInfoMessage } from "./terminalHelpers";

/** Install and enable GraphQL Magento module */
const handleGraphQL = async (
  magentoDirName: string,
  writeLog: (message: string) => void
) => {
  const options = {
    cwd: magentoDirName,
    shell: true,
  };

  const sp = spinner();

  const increaseQueryDepthAndComplexity = async () => {
    const data = fs.readFileSync(
      `${magentoDirName}/src/vendor/magento/module-graph-ql/etc/di.xml`,
      "utf8"
    );

    const result = data.replace(
      /<argument name="queryComplexity" xsi:type="number">300<\/argument>/g,
      '<argument name="queryComplexity" xsi:type="number">1500</argument>'
    );

    fs.writeFileSync(
      `${magentoDirName}/src/vendor/magento/module-graph-ql/etc/di.xml`,
      result,
      "utf8"
    );

    fs.writeFileSync(
      `${magentoDirName}/src/vendor/magento/module-graph-ql/etc/di.xml`,
      result,
      "utf8"
    );
  };

  return new Promise((resolve, reject) => {
    const child = spawn(
      "bin/composer require caravelx/module-graphql-config && bin/magento module:enable Caravel_GraphQlConfig && bin/magento setup:upgrade && bin/magento setup:di:compile && bin/magento setup:static-content:deploy -f",
      options
    );

    sp.start(
      picocolors.cyan(t("command.generate_store.progress.graphql_start"))
    );

    child.stdout.on("data", (data) => {
      writeLog(data.toString());
    });

    child.stderr.on("data", (data) => {
      writeLog(data.toString());
    });

    child.on("exit", async (code) => {
      console.log(picocolors.red(code));
      if (code === 0) {
        await increaseQueryDepthAndComplexity();
        sp.stop(
          picocolors.green(t("command.generate_store.progress.graphql_end"))
        );
        resolve(1);
      } else {
        sp.stop(
          picocolors.red(t("command.generate_store.progress.graphql_failed"))
        );
        logSimpleInfoMessage(t("command.generate_store.magento.failed_log"));
        reject();
      }
    });
  });
};

export default handleGraphQL;
