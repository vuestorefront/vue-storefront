import git from "isomorphic-git";
import { t, TFunction } from "i18next";
import { stdin, MockSTDIN } from "mock-stdin";
import {
  getGitRepositoryURL,
  validateGitRepositoryURL,
} from "../../../src/domains/generate/git-repository-url";
import { wait } from "../../../src/domains/generate/async";
import { identity } from "../../../src/domains/generate/math";

jest.mock("i18next");
jest.mock(
  "../../../src/domains/generate/git-repository-url/validateGitRepositoryURL"
);

const ENTER_KEY = "\x0D";
const BACKSPACE_KEY = "\x08";

type MockValidate = jest.MockedFunction<typeof validateGitRepositoryURL>;

describe("getGitRepositoryURL", () => {
  let io: MockSTDIN;
  let output = "";

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

  beforeEach(() => {
    io = stdin();
    output = "";

    jest.spyOn(process.stdout, "write").mockImplementation((message) => {
      output += message as string;
      return true;
    });
  });

  it("gets git repository URL from user", async () => {
    const answer = async () => {
      expect(output).toContain(
        "🌍  What's the URL of the custom integration's git repository?"
      );

      io.send(" ");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain(
        "🌍  What's the URL of the custom integration's git repository?"
      );

      io.send(BACKSPACE_KEY);
      io.send("https://github.com/x/x.git");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("domain.git_repository_url.was_not_found");

      io.send(BACKSPACE_KEY.repeat(5));
      io.send("https://github.com/x/y.git");
      io.send(ENTER_KEY);
    };

    wait(100).then(answer);

    (validateGitRepositoryURL as MockValidate)
      .mockResolvedValueOnce(new git.Errors.UrlParseError(" "))
      .mockResolvedValueOnce(
        new git.Errors.NotFoundError("https://github.com/x/x.git")
      )
      .mockResolvedValueOnce(null);

    const gitRepositoryURL = await getGitRepositoryURL(
      "🌍  What's the URL of the custom integration's git repository?"
    );

    expect(gitRepositoryURL).toBe("https://github.com/x/y.git");
  });

  describe("when user input unsupported git repository URL", () => {
    it("allow user to select suggestion as answer", async () => {
      const answer = async () => {
        expect(output).toContain(
          "🌍  What's the URL of the custom integration's git repository?"
        );

        io.send("git@github.com:x/x.git");
        io.send(ENTER_KEY);

        await wait(100);

        expect(output).toContain("domain.git_repository_url.was_not_found");

        // Cleanup the output.
        output = "";

        io.send("git@github.com:x/y.git");
        io.send(ENTER_KEY);

        await wait(100);

        expect(output).toContain("domain.git_repository_url.suggestion");

        io.send("Y");
        io.send(ENTER_KEY);
      };

      wait(100).then(answer);

      (validateGitRepositoryURL as MockValidate)
        .mockResolvedValueOnce(
          new git.Errors.UnknownTransportError(
            "git@github.com:x/x.git",
            "ssh",
            "https://github.com/x/y.git"
          )
        )
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(
          new git.Errors.UnknownTransportError(
            "git@github.com:x/y.git",
            "ssh",
            "https://github.com/x/y.git"
          )
        )
        .mockResolvedValueOnce(null);

      const result = await getGitRepositoryURL(
        "🌍  What's the URL of the custom integration's git repository?"
      );

      expect(result).toBe("https://github.com/x/y.git");
    });
  });
});
