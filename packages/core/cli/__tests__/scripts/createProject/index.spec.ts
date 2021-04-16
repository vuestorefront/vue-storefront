import createProject from '@vue-storefront/cli/src/scripts/createProject';
import log from '@vue-storefront/cli/src/utils/log';
const shelljs = require('shelljs');
const targetPath = 'vsf-new-project';

jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: jest.fn(),
  success: jest.fn(),
  error: jest.fn()
}));

jest.mock('path', () => ({
  join: jest.fn(() => targetPath),
  isAbsolute: jest.fn(() => false)
}));

jest.mock('shelljs', () => ({
  exec: jest.fn()
}));
jest.mock('rimraf', () => ({
  sync: jest.fn()
}));

describe('[vsf-next-cli] createProject', () => {
  it('successful repository clone', async () => {
    shelljs.exec.mockImplementation(() => true);
    await createProject({
      projectName: 'MyProject',
      targetPath: __dirname,
      repositoryLink: ''
    });
    expect(log.success).toHaveBeenCalledWith(expect.any(String));
  });

  it('fail repository clone', async () => {
    shelljs.exec.mockImplementation(() => {
      throw new Error();
    });
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await createProject({
      projectName: 'MyProject',
      targetPath: testTargetPath,
      repositoryLink: ''
    });
    spy.mockRestore();
    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });
});
