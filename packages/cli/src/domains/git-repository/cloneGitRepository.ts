import { CliUx } from '@oclif/core';
import * as fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

type Options = {
  projectDir: string;
  gitRepositoryURL: string;
};

/** Clones git repository to the project directory displaying a progress bar. */
const cloneGitRepository = async (options: Options): Promise<void> => {
  const { projectDir, gitRepositoryURL } = options;

  const bar = CliUx.ux.progress({
    fps: 64,
    format: '{bar} || {percentage}%',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
  });

  bar.start();

  await git.clone({
    fs,
    http,
    dir: projectDir,
    url: gitRepositoryURL,
    onProgress(progress) {
      bar.update(progress.loaded);

      if (progress.total !== undefined) {
        bar.setTotal(progress.total);
      }
    }
  });

  bar.stop();
};

export default cloneGitRepository;
