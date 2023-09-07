import git from "isomorphic-git";
import validateGitRepositoryURL from "./validateGitRepositoryURL";

/** Extracts a suggestion for git repository URL from error. */
const extractSuggestionFromError = async (
  error: unknown
): Promise<string | null> => {
  if (error instanceof git.Errors.UnknownTransportError) {
    if (error.data.suggestion) {
      const valid = await validateGitRepositoryURL(error.data.suggestion);

      if (!valid) return error.data.suggestion;
    }
  }

  return null;
};

export default extractSuggestionFromError;
