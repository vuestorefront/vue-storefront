import mockFileSystem from "mock-fs";
import {
  existsDirectory,
  removeFileOrDirectory,
} from "../../../src/domains/generate/directory";

describe("removeFileOrDirectory | integration test", () => {
  beforeEach(() => {
    mockFileSystem({
      src: {
        "index.js": 'console.log("Hello world!");',
      },
    });
  });

  afterEach(() => {
    mockFileSystem.restore();
  });

  it("removes files and directories", async () => {
    expect(await existsDirectory("src")).toBe(true);

    await removeFileOrDirectory("src/index.js");
    await removeFileOrDirectory("src");

    expect(await existsDirectory("src")).toBe(false);
  });
});
