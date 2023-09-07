import { t, TFunction } from "i18next";
import { stdin, MockSTDIN } from "mock-stdin";
import { wait } from "../../../src/domains/generate/async";
import { identity } from "../../../src/domains/generate/math";
import isGenerateSampleData from "../../../src/domains/generate/magento2/prompts/isGenerateSampleData";

jest.mock("i18next");

const ENTER_KEY = "\x0D";

describe("isGenerateSampleData | Magento tests", () => {
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

  it("user can select if they want to generate sample data", async () => {
    const answer = async () => {
      expect(output).toContain("command.generate_store.magento.sample_data");

      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("Yes");
    };

    wait(100).then(answer);

    await isGenerateSampleData("command.generate_store.magento.sample_data");
  });

  it("user can cancel the sample data prompt", async () => {
    const answer = async () => {
      expect(output).toContain("command.generate_store.magento.sample_data");

      io.send("n");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("No");
    };

    wait(100).then(answer);

    await isGenerateSampleData("command.generate_store.magento.sample_data");
  });
});
