import { removeFileOrDirectory } from "../../../src/domains/generate/directory";
import { terminateGitRepository } from "../../../src/domains/generate/git-repository";

jest.mock("../../../src/domains/generate/directory");

type Mock = jest.MockedFunction<typeof removeFileOrDirectory>;

describe("terminateGitRepository | unit tests", () => {
  it("removes '.git' folder", async () => {
    (removeFileOrDirectory as Mock).mockResolvedValueOnce(
      Promise.resolve(true)
    );

    await terminateGitRepository("~/Projects/test-store");

    expect(removeFileOrDirectory).toHaveBeenCalledWith(
      "~/Projects/test-store/.git"
    );
  });
});
