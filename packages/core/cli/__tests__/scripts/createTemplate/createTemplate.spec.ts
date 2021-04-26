import { createTemplate } from '../../../src/scripts/createTemplate/createTemplate';
import { processTemplate } from '../../../src/scripts/createTemplate/processTemplate';
import log from '../../../src/utils/log';
jest.mock('@vue-storefront/cli/src/utils/log', () => ({
  success: jest.fn((text: string) => text),
  error: jest.fn((text: string) => text)
}));
jest.mock('../../../src/scripts/createTemplate/processTemplate', () => ({
  processTemplate: jest.fn((data) => Promise.resolve(data))
}));

const vsfTuConfigFilePathMock = '/test/config.ts';
const generatedTemplatePathMock = '/generated_test';
describe('[@core/cli] - create template', () => {
  it('sets props correctly', async () => {
    await createTemplate({
      vsfTuConfigFilePath: vsfTuConfigFilePathMock,
      generatedTemplatePath: generatedTemplatePathMock
    });

    expect(processTemplate).toHaveBeenCalledWith({
      vsfTuConfigFilePath: vsfTuConfigFilePathMock,
      generatedTemplatePath: generatedTemplatePathMock
    });
  });

  it('Log successful generation', async () => {
    await createTemplate({
      vsfTuConfigFilePath: vsfTuConfigFilePathMock,
      generatedTemplatePath: generatedTemplatePathMock
    });

    expect(log.success).toHaveBeenCalledWith(expect.any(String));
  });
});
