import * as core from "@actions/core";
import checker from "license-checker";

const ALLOWED_LICENSES = [
  "Artistic-2.0",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "BSD*",
  "BlueOak-1.0.0",
  "0BSD",
  "CC-BY-3.0",
  "CC0-1.0",
  "Custom: https://docs.vuestorefront.io/",
  "Custom: https://nuxtjs.org",
  "CC-BY-4.0",
  "Unlicense",
  "ISC",
  "MIT",
  "UNKNOWN",
  "LGPL-3.0",
  "Public Domain",
  "Python-2.0",
];

async function run(): Promise<void> {
  const projectPath = core.getInput("projectPath");
  try {
    core.info(`Checking licenses: --projectPath ${projectPath}`);
    checker.init(
      {
        start: projectPath,
        summary: true,
        onlyAllow: ALLOWED_LICENSES.join(";"),
      },
      function (error, packages) {
        // @ts-ignore
        core.info(checker.asSummary(packages));
        if (error) {
          core.setFailed(error.message);
        }
      },
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
