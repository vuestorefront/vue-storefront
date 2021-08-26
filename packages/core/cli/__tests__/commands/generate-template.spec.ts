import generateTemplate from '@vue-storefront/cli/src/commands/generate-template';
import log from '../../src/utils/log';
import * as fs from 'fs';
import { createTemplate } from '../../src/scripts/createTemplate/createTemplate';
import { vsfTuConfig } from '../../src/utils/themeUtilsConfigTemplate';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  unlinkSync: jest.fn(),
  appendFile: jest.fn()
}));

jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  info: jest.fn(),
  success: jest.fn(),
  error: jest.fn()
}));

jest.mock('path', () => ({
  resolve: jest.fn((path) => path),
  join: jest.fn((path, file) => `${path}/${file}`)
}));

jest.mock(
  '@vue-storefront/cli/src/scripts/createTemplate/createTemplate',
  () => ({
    createTemplate: jest.fn()
  })
);

jest.mock('@vue-storefront/cli/src/utils/themeUtilsConfigTemplate', () => ({
  vsfTuConfig: jest.fn()
}));

describe('[@core/cli/src/commands] generate template', () => {
  it('should log error when no args provided', async () => {
    await generateTemplate([]);
    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should remove vsfTuConfig if exist', async () => {
    const templateName = 'Test';
    const existSyncMock = fs.existsSync as jest.Mock;
    existSyncMock.mockImplementation(() => true);
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await generateTemplate([templateName]);
    spy.mockRestore();

    expect(fs.unlinkSync).toHaveBeenCalledWith(expect.any(String));
  });

  it('should run createTemplate function with parameters', async () => {
    const templateName = 'Test';
    const existSyncMock = fs.existsSync as jest.Mock;
    existSyncMock.mockImplementation(() => false);
    const appendFileMock = (fs.appendFile as unknown) as jest.Mock;
    appendFileMock.mockImplementation((path, data, callback) => callback());
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
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
    const existSyncMock = fs.existsSync as jest.Mock;
    existSyncMock.mockImplementation(() => false);
    const appendFileMock = (fs.appendFile as unknown) as jest.Mock;
    appendFileMock.mockImplementation((path, data, callback) =>
      callback(new Error())
    );
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
    spy.mockReturnValue(testTargetPath);

    await generateTemplate([templateName]);
    spy.mockRestore();

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });

  it('should run createTemplate function with provided path', async () => {
    const templateName = 'Test';
    const templatePath = '/home/test';
    const existSyncMock = fs.existsSync as jest.Mock;
    existSyncMock.mockImplementation(() => false);
    const appendFileMock = (fs.appendFile as unknown) as jest.Mock;
    appendFileMock.mockImplementation((path, data, callback) => callback());
    const testTargetPath = 'test_path';
    const spy = jest.spyOn(process, 'cwd');
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
