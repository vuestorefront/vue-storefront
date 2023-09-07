import { simpleLog } from "../src/domains/generate/magento2/functions/terminalHelpers";

describe("terminalHelpers | Terminal logger tests", () => {
  let output = "";

  beforeEach(() => {
    output = "";

    jest.spyOn(process.stdout, "write").mockImplementation((message) => {
      output += message;
      return true;
    });
  });

  it("simpleLog is printing", async () => {
    simpleLog("test");

    expect(output).toContain("test");
  });
});
