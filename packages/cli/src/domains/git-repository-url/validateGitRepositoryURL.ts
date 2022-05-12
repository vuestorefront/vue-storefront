import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import { resolveToError } from '../error';

type Validation =
  | [valid: true, error: null]
  | [valid: false, error: Error];

/** Validates received git repository URL by trying to get its remote info. */
const validateGitRepositoryURL = async (url: string): Promise<Validation> => {
  try {
    await git.getRemoteInfo2({
      url,
      http
    });
    return [true, null];
  } catch (error: unknown) {
    return [false, resolveToError(error)];
  }
};

export default validateGitRepositoryURL;
