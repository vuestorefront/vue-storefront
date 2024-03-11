import { type NewChangesetWithCommit } from "@changesets/types";
import { getDependencyReleaseLine, getReleaseLine } from "../changelog";

function generateChangeset(summary: string): NewChangesetWithCommit {
  return {
    id: "1",
    summary,
    releases: [{ name: "patch-release", type: "minor" }],
    commit: "0fa03204",
  };
}

describe("[changelog]", () => {
  describe("[getReleaseLine]", () => {
    it("should return unchanged summary when no tag ", async () => {
      const summary = `Some summary line 1
      another line`;
      const input = generateChangeset(summary);

      const result = await getReleaseLine(input, "patch", null);

      expect(result).toMatch(summary);
    });

    it("should format tags", async () => {
      const summary = `[FIXED] Some summary line 1
\`\`\`ts
const a = 1;
\`\`\`
[ADDED] new feature

[ADDED] another feature`;
      const input = generateChangeset(summary);

      const result = await getReleaseLine(input, "patch", null);

      expect(result).toMatchInlineSnapshot(`
        "- **[FIXED]** Some summary line 1
        \`\`\`ts
        const a = 1;
        \`\`\`
        - **[ADDED]** new feature

        - **[ADDED]** another feature"
      `);
    });

    it("should format a line with multiple tags", async () => {
      const summary = `[FIXED][ADDED] Some summary line 1`;
      const input = generateChangeset(summary);

      const result = await getReleaseLine(input, "patch", null);

      expect(result).toMatchInlineSnapshot(
        `"- **[FIXED][ADDED]** Some summary line 1"`
      );
    });
  });

  describe("[getDependencyReleaseLine]", () => {
    it("should return empty string when no dependencies", async () => {
      const result = await getDependencyReleaseLine([], [], null);

      expect(result).toMatch("");
    });

    it("should format dependencies", async () => {
      const result = await getDependencyReleaseLine(
        [generateChangeset("Pkg update"), generateChangeset("Pkg update 2")],
        [
          {
            name: "dep1",
            newVersion: "1.0.0",
            type: "major",
            oldVersion: "0.5.1",
            changesets: [],
            packageJson: {
              name: "storefront",
              version: "1.0.0",
            },
            dir: "storefront",
          },
          {
            name: "dep2",
            newVersion: "1.1.0",
            type: "minor",
            oldVersion: "1.0.2",
            changesets: [],
            packageJson: {
              name: "storefront",
              version: "1.0.0",
            },
            dir: "storefront",
          },
        ],

        null
      );

      expect(result).toMatchInlineSnapshot(`
        "- Updated dependencies:
          - dep1@1.0.0
          - dep2@1.1.0"
      `);
    });
  });
});
