/* eslint-disable unicorn/prefer-top-level-await */
import * as core from '@actions/core';
import checker from 'license-checker-rseidelsohn';

import { ALLOWED_LICENSES } from './licenses';
import { EXCLUDE_NPM_PACKAGES } from './npmPackages';

async function run(): Promise<void> {
  const projectPath = core.getInput('projectPath');
  try {
    core.info(`Checking licenses: --projectPath ${projectPath}`);
    checker.init(
      {
        start: projectPath,
        summary: true,
        excludePackagesStartingWith: EXCLUDE_NPM_PACKAGES.join(';'),
        onlyAllow: ALLOWED_LICENSES.join(';'),
      },
      (error, packages) => {
        // @ts-expect-error: the library definition is wrong
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
