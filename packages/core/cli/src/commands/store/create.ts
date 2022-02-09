import {Command, Flags} from '@oclif/core'
import {t} from 'i18next'

export default class StoreCreate extends Command {
  static description = t('command.store_create.description');

  static aliases = ['init'];

  static examples = ['<%= config.bin %> <%= command.id %>'];

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
  };

  static args = [{name: 'file'}];

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(StoreCreate)

    const name = flags.name ?? 'world'
    this.log(`hello ${name} from /Users/vitorcavalcanti/Projects/vue-storefront/packages/core/cli/src/commands/store/create.ts`)
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
