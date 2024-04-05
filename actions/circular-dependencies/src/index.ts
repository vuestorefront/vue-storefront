/* eslint-disable unicorn/prefer-top-level-await */
import * as core from '@actions/core';
import { parseDependencyTree, parseCircular, prettyCircular } from 'dpdm';

async function run(): Promise<void> {
  try {
    const filesPath = core.getInput('filesPath');
    const tree = await parseDependencyTree(filesPath, {});
    const circulars = parseCircular(tree);

    if (circulars.length > 0) {
      core.warning(`Detected ${circulars.length} circular dependencies between the files`);
      core.info(prettyCircular(circulars));
    } else {
      core.info('No circular dependencies');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
