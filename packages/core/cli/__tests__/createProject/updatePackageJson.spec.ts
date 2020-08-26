import updatePackageJson from '../../src/scripts/createProject/updatePackageJson';

const defaultFile = `{
  "someParam": "someValue",
  "name": "@vue-storefront/about-you-theme",
  "_toRem": "1",
  "_toRem2": "2"
}`;

const projectName = 'mySuperProject';

const expectedFile = `{
  "someParam": "someValue",
  "name": "${projectName}"
}`;

import { writeFileSync } from 'fs';

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => defaultFile),
  writeFileSync: jest.fn()
}));

describe('[vsf-next-cli] updatePackageJson', () => {
  it('updates name in the JSON file and removes keys that start with _', async () => {

    const absoluteFilePath = 'package.json';
    await updatePackageJson(absoluteFilePath, projectName);
    expect(writeFileSync).toHaveBeenCalledWith(absoluteFilePath, expectedFile);

  });

});
