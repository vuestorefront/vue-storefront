import * as path from "path";
import mockFS from "mock-fs";
import { t, TFunction } from "i18next";
import { stdin, MockSTDIN } from "mock-stdin";
import { wait } from "../../../src/domains/generate/async";
import { identity } from "../../../src/domains/generate/math";
import { getDirectory } from "../../../src/domains/generate/directory";

jest.mock("i18next");

const ENTER_KEY = "\x0D";
const BACKSPACE_KEY = "\x08";

describe("getDirectory | integration test", () => {
  let io: MockSTDIN;
  let output = "";

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

  beforeEach(() => {
    io = stdin();
    output = "";

    mockFS({
      src: {
        "index.js": 'console.log("Hello world!");',
      },
    });

    jest.spyOn(process.stdout, "write").mockImplementation((message) => {
      output += message as string;
      return true;
    });
  });

  afterEach(() => {
    mockFS.restore();
  });

  it("asks user to input a directory", async () => {
    const answer = async () => {
      expect(output).toContain("What's the directory?");

      io.send("test");
      io.send(ENTER_KEY);

      await wait(50);

      expect(output).toContain("domain.directory.was_not_found");

      io.send(BACKSPACE_KEY.repeat(4));
      io.send("src");
      io.send(ENTER_KEY);
    };

    wait(100).then(answer);

    const directory = await getDirectory("What's the directory?");

    expect(directory).toBe(path.resolve("src"));
  });
});
