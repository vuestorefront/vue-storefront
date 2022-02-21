import { createTemplate } from '../../../src/scripts/createTemplate/createTemplate';
import { processTemplate } from '../../../src/scripts/createTemplate/processTemplate';
import log from '../../../src/utils/log';
vi.mock('@vue-storefront/cli/src/utils/log', () => ({
  success: vi.fn((text: string) => text),
  error: vi.fn((text: string) => text)
}));
vi.mock('../../../src/scripts/createTemplate/processTemplate', () => ({
  processTemplate: vi.fn()
}));

const vsfTuConfigFilePathMock = '/test/config.ts';
const generatedTemplatePathMock = '/generated_test';
describe('[@core/cli] - create template', () => {
  it('sets props correctly', async () => {
    const processTemplateMock = processTemplate as vi.Mock;
    processTemplateMock.mockImplementation((data) => Promise.resolve(data));
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
    const processTemplateMock = processTemplate as vi.Mock;
    processTemplateMock.mockImplementation((data) => Promise.resolve(data));
    await createTemplate({
      vsfTuConfigFilePath: vsfTuConfigFilePathMock,
      generatedTemplatePath: generatedTemplatePathMock
    });

    expect(log.success).toHaveBeenCalledWith(expect.any(String));
  });

  it('should log error when processTemplate fail', async () => {
    const processTemplateMock = processTemplate as vi.Mock;
    processTemplateMock.mockImplementation(() => Promise.reject(new Error()));

    await createTemplate({
      vsfTuConfigFilePath: vsfTuConfigFilePathMock,
      generatedTemplatePath: generatedTemplatePathMock
    });

    expect(log.error).toHaveBeenCalledWith(expect.any(String));
  });
});
