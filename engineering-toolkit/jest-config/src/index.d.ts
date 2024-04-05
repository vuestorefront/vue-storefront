declare module "@vue-storefront/jest-config" {
  interface JestConfig {
    preset?: string;
    transform: {
      [glob: string]: string;
    };
    coverageDirectory: string;
    collectCoverageFrom: string[];
    testMatch: string[];
  }

  export const baseConfig: JestConfig;
}
