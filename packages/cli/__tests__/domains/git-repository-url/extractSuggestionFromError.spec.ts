import git from "isomorphic-git";
import {
  extractSuggestionFromError,
  validateGitRepositoryURL,
} from "../../../src/domains/generate/git-repository-url";

jest.mock(
  "../../../src/domains/generate/git-repository-url/validateGitRepositoryURL"
);

type ValidateGitRepositoryURL = jest.MockedFunction<
  typeof validateGitRepositoryURL
>;

describe("extractSuggestionFromError | unit tests", () => {
  it("extracts suggested git repository URL", async () => {
    const error = new git.Errors.UnknownTransportError(
      "git@github.com:vuestorefront/test-store.git",
      "ssh",
      "https://github.com/vuestorefront/test-store.git"
    );

    (
      validateGitRepositoryURL as ValidateGitRepositoryURL
    ).mockResolvedValueOnce(null);

    expect(await extractSuggestionFromError(error)).toBe(
      "https://github.com/vuestorefront/test-store.git"
    );
  });

  it("returns 'null' when there's no suggestion", async () => {
    const errorA = new git.Errors.UnknownTransportError(
      "git@github.com:vuestorefront/test-store.git",
      "ssh"
    );

    expect(await extractSuggestionFromError(errorA)).toBeNull();

    const errorB = new git.Errors.UrlParseError(
      "https://github.com/companyvue-storefront-template.git"
    );

    expect(await extractSuggestionFromError(errorB)).toBeNull();

    const errorC = new Error("The button exploded!");

    expect(await extractSuggestionFromError(errorC)).toBeNull();
  });

  it("checks if suggestion is valid before returning it", async () => {
    (
      validateGitRepositoryURL as ValidateGitRepositoryURL
    ).mockResolvedValueOnce(new Error("An expected error"));

    const errorA = new git.Errors.UnknownTransportError(
      "git@github.com:vuestorefront/test-store.git",
      "ssh",
      "https://github.com/vuestorefront/test-store.git"
    );

    expect(await extractSuggestionFromError(errorA)).toBeNull();

    (
      validateGitRepositoryURL as ValidateGitRepositoryURL
    ).mockResolvedValueOnce(null);

    const errorB = new git.Errors.UnknownTransportError(
      "git@github.com:vuestorefront/test-store.git",
      "ssh",
      "https://github.com/vuestorefront/test-store.git"
    );

    expect(await extractSuggestionFromError(errorB)).toBe(
      "https://github.com/vuestorefront/test-store.git"
    );
  });
});
