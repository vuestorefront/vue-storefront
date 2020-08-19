import updatePackageName from '../../src/scripts/createProject/updatePackageName';

const defaultFile = `{
  "someParam": "someValue",
  "name": "@vue-storefront/about-you-theme"
}`;

const projectName = 'mySuperProject';

const expectedFile = `{
  "someParam": "someValue",
  "name": "${projectName}"
}`;

import { writeFileSync } from 'fs';

jest.mock('fs', () => ({
  readFileSync: () => defaultFile,
  writeFileSync: jest.fn()
}));

describe('[vsf-next-cli] updatePackageName', () => {
  it('updates name in the JSON file', async () => {

    const absoluteFilePath = 'package.json';
    await updatePackageName(absoluteFilePath, projectName);
    expect(writeFileSync).toHaveBeenCalledWith(absoluteFilePath, expectedFile);

  });

});
