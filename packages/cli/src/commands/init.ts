import { Command, Flags } from '@oclif/core';
import { t } from 'i18next';
import GenerateStore, { setSDK } from './generate/store';

export default class Init extends Command {
  static override description = t('command.generate_store.description');

  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {
    sdk: Flags.boolean({
      char: 's',
      aliases: ['sdk'],
      summary: 'Use --sdk flag to initiate SDK architecure CLI',
      description: '--sdk flag is used to run and install projects with SDK architecture',
    })
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(Init);
    const { sdk } = flags;

    setSDK(sdk);
    const generateStore = new GenerateStore(this.argv, this.config);

    return generateStore.run.bind(this).call(this);
  }
}
