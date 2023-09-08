import { formatToProjectName } from "../../../src/domains/generate/project-name";

describe("formatToProjectName | unit tests", () => {
  it("replaces spaces with dashes", () => {
    const result = formatToProjectName("project  name\t with spaces");
    expect(result).toBe("project-name-with-spaces");
  });

  it("transforms to lower case", () => {
    const result = formatToProjectName("PRoject-NAME");
    expect(result).toBe("project-name");
  });
});
