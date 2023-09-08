import git from "isomorphic-git";
import { validateGitRepositoryURL } from "../../../src/domains/generate/git-repository-url";

describe("validateGitRepositoryURL | unit tests", () => {
  const url = "https://github.com/vuestorefront/test-template.git";

  describe("when receives a valid git repository URL", () => {
    beforeEach(() => {
      jest.spyOn(git, "getRemoteInfo2").mockResolvedValueOnce({
        protocolVersion: 2,
        capabilities: {
          agent: "git/github-gf33fef312227",
          fetch: "shallow wait-for-done filter",
          "ls-refs": "unborn",
          "server-option": true,
          "object-format": "sha1",
        },
      });
    });

    it("uses git remote info to check it", async () => {
      await validateGitRepositoryURL(url);

      expect(git.getRemoteInfo2).toHaveBeenCalledWith(
        expect.objectContaining({
          url,
        })
      );
    });

    it("returns null", async () => {
      expect(await validateGitRepositoryURL(url)).toEqual(null);
    });
  });
});
