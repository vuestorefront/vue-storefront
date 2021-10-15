import git, { GitProgressEvent } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import cli from 'cli-ux';
import * as path from 'path';
import * as fs from 'fs';

export const cloneProject = async (
  {
    name,
    gitLink,
    dryRun
  }: {
    name: string, gitLink: string, dryRun: boolean,
  }) => {
  const cwd = process.cwd();
  const dir = path.join(cwd, name);

  const bar = cli.progress({
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    format: '||{bar} || {percentage}% ',
    fps: 100
    // stream: process.stdout
  });

  bar.start();

  if (!dryRun) {
    await git.clone({
      fs,
      http,
      dir,
      url: gitLink,
      onProgress: (progress: GitProgressEvent) => {
        bar.update(progress.loaded);

        const barReset = progress.total === undefined || progress.loaded === 1 || progress.loaded < progress.total;
        const barStop = progress.loaded >= bar.getTotal() || progress.loaded >= progress.total;

        if (barStop) {
          bar.stop();
        }

        if (barReset) {
          bar.update(progress.loaded);
        }
      }
    });
  }

  return dir;
};
