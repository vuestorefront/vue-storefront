import createProject from '@vue-storefront/cli/src/scripts/createProject/index';
import log from '@vue-storefront/cli/src/utils/log';
const git = require('isomorphic-git');
const targetPath = 'vsf-new-project';

vi.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: vi.fn(),
  success: vi.fn(),
  error: vi.fn()
}));

vi.mock('path', () => ({
  join: vi.fn(() => targetPath),
  isAbsolute: vi.fn(() => false)
}));

vi.mock('isomorphic-git', () => ({
  clone: vi.fn()
}));
vi.mock('rimraf', () => ({
  sync: vi.fn()
}));

describe('[vsf-next-cli] createProject', () => {
  it('successful repository clone', async () => {
    git.clone.mockImplementation(() => true);
    await createProject({
      projectName: 'MyProject',
      targetPath: __dirname,
      repositoryLink: ''
    });
    expect(log.success).toHaveBeenCalledWith(expect.any(String));
  });

  it('fail repository clone', async () => {
    git.clone.mockImplementation(() => {
      throw new Error();
    });
    const testTargetPath = 'test_path';
    const spy = vi.spyOn(process, 'cwd');
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
