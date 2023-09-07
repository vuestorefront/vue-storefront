import * as fs from "fs";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node";

type Options = {
  projectDir: string;
  gitRepositoryURL: string;
  ref?: string;
};

/** Clones git repository to the project directory displaying a progress bar. */
export const cloneGitRepository = async (options: Options): Promise<void> => {
  const { projectDir, gitRepositoryURL } = options;

  await git.clone({
    fs,
    http,
    dir: projectDir,
    url: gitRepositoryURL,
  });
};
