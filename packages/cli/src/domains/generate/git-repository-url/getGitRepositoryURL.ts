import { t } from "i18next";
import git from "isomorphic-git";
import { text, isCancel, cancel, confirm } from "@clack/prompts";
import extractSuggestionFromError from "./extractSuggestionFromError";
import validateGitRepositoryURL from "./validateGitRepositoryURL";

import { simpleLog } from "../magento2/functions/terminalHelpers";

const validateURL = async (url: string): Promise<void | any> => {
  const error = await validateGitRepositoryURL(url);

  if (error) {
    simpleLog(
      error instanceof git.Errors.UrlParseError
        ? t<string>("domain.git_repository_url.is_invalid")
        : t<string>("domain.git_repository_url.was_not_found")
    );
  }

  return error;
};

const suggestURL = async (url: string): Promise<string | null> => {
  const suggestion = await extractSuggestionFromError(url);
  return suggestion ?? null;
};

/** Gets a git repository URL from user's input. */
const getGitRepositoryURL = async (message: string): Promise<string> => {
  // URL
  const answer = await text({
    message,
  });

  if (isCancel(answer)) {
    cancel("Installation cancelled");
    return "";
  }

  // Validation
  const validateResult = await validateURL(answer as string);

  if (!validateResult) return answer as string;

  // Suggestion
  const suggestion = await suggestURL(validateResult);

  if (suggestion) {
    const suggestionAnswer = await confirm({
      message: t("domain.git_repository_url.suggestion", { suggestion }),
    });

    if (isCancel(suggestionAnswer)) {
      cancel("Installation cancelled");
      return "";
    }

    if (suggestionAnswer) return suggestion;
  }

  return getGitRepositoryURL(message);
};

export default getGitRepositoryURL;
