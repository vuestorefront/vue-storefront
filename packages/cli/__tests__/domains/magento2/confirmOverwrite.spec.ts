import { t, TFunction } from "i18next";
import { stdin, MockSTDIN } from "mock-stdin";
import mockFileSystem from "mock-fs";
import { wait } from "../../../src/domains/generate/async";
import { identity } from "../../../src/domains/generate/math";
import confirmOverwrite from "../../../src/domains/generate/magento2/prompts/confirmOverwrite";

jest.mock("i18next");

const ENTER_KEY = "\x0D";

describe("confirmOverwrite | Magento tests", () => {
  let io: MockSTDIN;
  let output = "";

  beforeEach(() => {
    io = stdin();
    output = "";

    mockFileSystem({
      magentoDir: {
        "getting-started.md": "# Getting Started\n",
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

    jest.spyOn(process.stdout, "write").mockImplementation((message) => {
      output += message;
      return true;
    });
  });

  afterEach(() => {
    mockFileSystem.restore();
  });

  it("user can confirm overwrite", async () => {
    const answer = async () => {
      expect(output).toContain("command.generate_store.magento.overwrite");

      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("command.generate_store.progress.delete_start");

      await wait(100);

      expect(output).toContain("command.generate_store.progress.delete_end");
    };

    wait(100).then(answer);

    await confirmOverwrite({
      message: "command.generate_store.magento.overwrite",
      magentoDirName: "magentoDir",
    });
  });
});
