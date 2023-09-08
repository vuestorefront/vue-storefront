import git from "isomorphic-git";
import { cloneGitRepository } from "../../../src/domains/generate/git-repository";

jest.mock("isomorphic-git");

describe("cloneGitRepository | unit tests", () => {
  it("clones git repository to the project directory", async () => {
    const projectDir = "~/Projects/test-store";

    const gitRepositoryURL =
      "https://github.com/vuestorefront/test-template.git";

    jest.spyOn(git, "clone").mockResolvedValueOnce();

    await cloneGitRepository({
      projectDir,
      gitRepositoryURL,
    });

    expect(git.clone).toHaveBeenCalledWith(
      expect.objectContaining({
        dir: projectDir,
        url: gitRepositoryURL,
      })
    );
  });
});
