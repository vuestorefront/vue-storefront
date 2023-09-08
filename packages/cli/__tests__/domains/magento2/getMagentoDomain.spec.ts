import { t, TFunction } from "i18next";
import { stdin, MockSTDIN } from "mock-stdin";
import { wait } from "../../../src/domains/generate/async";
import { identity } from "../../../src/domains/generate/math";
import getMagentoDomainName from "../../../src/domains/generate/magento2/prompts/getMagentoDomain";

jest.mock("i18next");

const ENTER_KEY = "\x0D";
const BACKSPACE_KEY = "\x08";

describe("getMagentoDomain | magento test", () => {
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

  it("asks user to input a valid domain name", async () => {
    const answer = async () => {
      expect(output).toContain("command.generate_store.magento.domain");

      io.send(BACKSPACE_KEY.repeat(12));

      io.send(" ");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("domain.project_name.is_empty");

      io.send(BACKSPACE_KEY);
      io.send("src");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("command.generate_store.magento.invalid_domain");

      io.send(BACKSPACE_KEY.repeat(3));
      io.send("magento.test");
      io.send(ENTER_KEY);

      await wait(100);

      expect(output).toContain("magento.test");
    };

    wait(100).then(answer);

    const domainName = await getMagentoDomainName(
      "command.generate_store.magento.domain"
    );

    expect(domainName).toBe("magento.test");
  });
});
