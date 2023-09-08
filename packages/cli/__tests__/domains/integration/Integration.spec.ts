import type { Integration } from "../../../src/domains/generate/integration";

type Assert<A, B> = [B] extends [A] ? true : false;

describe("Integration | type tests", () => {
  it("defines an object with name and git repository URL", () => {
    expect<
      Assert<
        Integration,
        {
          name: string;
          gitRepositoryURL: string;
        }
      >
    >(true).toBe(true);
  });
});
