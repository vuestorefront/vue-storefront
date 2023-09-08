import mockFileSystem from "mock-fs";
import { existsDirectory } from "../../../src/domains/generate/directory";

describe("existsDirectory | integration test", () => {
  beforeEach(() => {
    mockFileSystem({
      templates: {
        "getting-started.md": "# Getting Started\n",
      },
    });
  });

  afterEach(() => {
    mockFileSystem.restore();
  });

  it("checks if repository exists", async () => {
    expect(await existsDirectory("templates/getting-started.md")).toBe(false);
    expect(await existsDirectory("sources")).toBe(false);
    expect(await existsDirectory("templates")).toBe(true);
  });
});
