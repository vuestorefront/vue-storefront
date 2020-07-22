import uncommentProjectOnly from '../../src/scripts/createProject/uncommentProjectOnly';

const fileContent = `
/* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */`;

jest.mock('fs', () => ({
  readFileSync: () => fileContent,
  writeFileSync: jest.fn()
}));

import { writeFileSync } from 'fs';

describe('[vsf-next-cli] uncommentProjectOnly', () => {
  it('removes comments from project on', () => {

    const absoluteFilePath = 'nuxt.config.js';

    // I removed magic comments in the const below
    const expectedFileContent = `
    ['@vue-storefront/nuxt-theme'],`;

    uncommentProjectOnly(absoluteFilePath);

    expect(writeFileSync).toHaveBeenCalledWith(absoluteFilePath, expectedFileContent);

  });
});
