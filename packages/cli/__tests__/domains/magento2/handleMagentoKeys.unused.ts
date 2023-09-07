import { t, TFunction } from "i18next";
import { stdin, MockSTDIN } from "mock-stdin";
import { wait } from "../../../src/domains/generate/async";
import { identity } from "../../../src/domains/generate/math";
import handleMagentoKeys from "../../../src/domains/generate/magento2/prompts/handleMagentoKeys";

jest.mock("i18next");

const ENTER_KEY = "\x0D";

describe("handleMagentoKeys | Magento tests", () => {
  let io: MockSTDIN;
  let output = "";

  beforeEach(() => {
    io = stdin();
    output = "";

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (t as jest.MockedFunction<TFunction>).mockImplementation(identity);

    jest.spyOn(process.stdout, "write").mockImplementation((message) => {
      output += message;
      return true;
    });
  });

  it("get Magento access keys from the user", async () => {
    const answer = async () => {
      expect(output).toContain("command.generate_store.magento.access_key");

      io.send("12345");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("command.generate_store.magento.secret_key");

      io.send("12345");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("▪▪▪▪▪");
    };

    wait(100).then(answer);

    const magentoKeys = await handleMagentoKeys();

    expect(magentoKeys.accessKey).toBe("12345");
    expect(magentoKeys.secretKey).toBe("12345");
  });
});
