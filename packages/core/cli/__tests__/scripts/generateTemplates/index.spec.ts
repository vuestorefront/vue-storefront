import createProject from './../../../src/scripts/createProject';
import generateTemplates from '@vue-storefront/cli/src/scripts/generateTemplates';

const resolvedTargetPath = 'a';
const integrations = [
  'ct',
  'ayc'
];
jest.mock('path', () => ({
  resolve: jest.fn(() => resolvedTargetPath)
}));

jest.mock('./../../../src/scripts/createProject', () => jest.fn());

jest.mock('./../../../src/utils/getIntegrations', () => () => integrations);

describe('[vsf-next-cli] generateTemplates', () => {
  it('generates templates', async () => {

    await generateTemplates();

    expect(createProject).toHaveBeenCalledWith(integrations[0], resolvedTargetPath);
  });
});
