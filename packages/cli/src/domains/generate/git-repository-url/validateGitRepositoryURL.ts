import git from "isomorphic-git";
import http from "isomorphic-git/http/node";
import { resolveToError } from "../error";

/** Validates received git repository URL by trying to get its remote info. */
const validateGitRepositoryURL = async (url: string): Promise<null | Error> => {
  try {
    await git.getRemoteInfo2({
      url,
      http,
    });
    return null;
  } catch (error: unknown) {
    return resolveToError(error);
  }
};

export default validateGitRepositoryURL;
