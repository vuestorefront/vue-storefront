import generateTemplate from '@vue-storefront/cli/src/commands/generate-template';
import log from '../../src/utils/log';
import * as fs from 'fs';
import { createTemplate } from '../../src/scripts/createTemplate/createTemplate';
import { vsfTuConfig } from '../../src/utils/themeUtilsConfigTemplate';

vi.mock('fs', () => ({
  existsSync: vi.fn(),
  unlinkSync: vi.fn(),
  appendFile: vi.fn()
}));

vi.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: vi.fn(),
  success: vi.fn(),
  error: vi.fn()
}));

vi.mock('path', () => ({
  resolve: vi.fn((path) => path),
  join: vi.fn((path, file) => `${path}/${file}`)
}));

vi.mock(
  '@vue-storefront/cli/src/scripts/createTemplate/createTemplate',
  () => ({
    createTemplate: vi.fn()
  })
);

vi.mock('@vue-storefront/cli/src/utils/themeUtilsConfigTemplate', () => ({
  vsfTuConfig: vi.fn()
}));

describe('[@core/cli/src/commands] generate template', () => {
  it('should log error when no args provided', async () => {
    await generateTemplate([]);
    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should remove vsfTuConfig if exist', async () => {
    const templateName = 'Test';
    const existSyncMock = fs.existsSync as vi.Mock;
    existSyncMock.mockImplementation(() => true);
    const testTargetPath = 'test_path';
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await generateTemplate([templateName]);
    spy.mockRestore();

    expect(fs.unlinkSync).toHaveBeenCalledWith(expect.any(String));
  });

  it('should run createTemplate function with parameters', async () => {
    const templateName = 'Test';
    const existSyncMock = fs.existsSync as vi.Mock;
    existSyncMock.mockImplementation(() => false);
    const appendFileMock = (fs.appendFile as unknown) as vi.Mock;
    appendFileMock.mockImplementation((path, data, callback) => callback());
    const testTargetPath = 'test_path';
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await generateTemplate([templateName]);
    spy.mockRestore();

    expect(createTemplate).toHaveBeenCalledWith({
      vsfTuConfigFilePath: expect.any(String),
      generatedTemplatePath: expect.any(String)
    });
  });

  it('should throw error on callback', async () => {
    const templateName = 'Test';
    const existSyncMock = fs.existsSync as vi.Mock;
    existSyncMock.mockImplementation(() => false);
    const appendFileMock = (fs.appendFile as unknown) as vi.Mock;
    appendFileMock.mockImplementation((path, data, callback) =>
      callback(new Error())
    );
    const testTargetPath = 'test_path';
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await generateTemplate([templateName]);
    spy.mockRestore();

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should run createTemplate function with provided path', async () => {
    const templateName = 'Test';
    const templatePath = '/home/test';
    const existSyncMock = fs.existsSync as vi.Mock;
    existSyncMock.mockImplementation(() => false);
    const appendFileMock = (fs.appendFile as unknown) as vi.Mock;
    appendFileMock.mockImplementation((path, data, callback) => callback());
    const testTargetPath = 'test_path';
    const spy = vi.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await generateTemplate([templateName, templatePath]);
    spy.mockRestore();

    expect(vsfTuConfig).toHaveBeenCalledWith({
      outputPathName: templateName.toLowerCase(),
      themePath: templatePath,
      _themePath: `${templatePath}/_theme`
    });
  });
});
