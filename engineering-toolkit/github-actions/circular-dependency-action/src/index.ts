import * as core from '@actions/core';
const { parseDependencyTree, parseCircular, prettyCircular } = require('dpdm');


async function run(): Promise<void> {
  try {
    const filesPath = core.getInput('filesPath');
    const tree = await parseDependencyTree(filesPath, {});
    
    core.info('Test message');
    core.info(JSON.stringify(tree));
    const circulars = parseCircular(tree);

    core.info('-------');
    core.info(circulars.length);

    core.info('-------');

    core.info(prettyCircular(circulars));

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();