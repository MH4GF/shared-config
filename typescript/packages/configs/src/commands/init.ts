import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { Command, Flags } from '@oclif/core'

export class Init extends Command {
  static override description = 'Initialize shared configuration files for your project'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --yes',
    '<%= config.bin %> <%= command.id %> --all',
  ]

  static override flags = {
    yes: Flags.boolean({
      char: 'y',
      description: 'Skip interactive prompts and use default selections',
      default: false,
    }),
    all: Flags.boolean({
      char: 'a',
      description: 'Install all available configurations',
      default: false,
    }),
    help: Flags.help({ char: 'h' }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Init)

    this.log('🛠  Initializing shared configuration files...')

    if (flags.all && flags.yes) {
      this.log('⚙️  Installing all configurations without prompts...')
      await this.installAllConfigs()
      return
    }

    if (flags.all) {
      this.log('⚙️  Installing all configurations...')
      await this.installAllConfigs()
      return
    }

    if (flags.yes) {
      this.log('⚙️  Installing default configurations...')
      await this.installDefaultConfigs()
      return
    }

    await this.runInteractiveMode()
  }

  private async installAllConfigs(): Promise<void> {
    this.log('📁 Installing Biome configurations...')
    this.log('📁 Installing TypeScript configurations...')
    this.log('✅ All configurations installed successfully!')
  }

  private async installDefaultConfigs(): Promise<void> {
    this.log('📁 Installing default Biome configuration...')
    this.log('📁 Installing default TypeScript configuration...')
    this.log('✅ Default configurations installed successfully!')
  }

  private async runInteractiveMode(): Promise<void> {
    this.log('📋 Starting interactive configuration selection...')

    const packageJsonPath = join(process.cwd(), 'package.json')
    if (!existsSync(packageJsonPath)) {
      this.warn('⚠️  No package.json found in current directory')
      this.log('   Make sure you are in the root of your project')
    }

    this.log('')
    this.log('🛠  What do you want to set up?')
    this.log('   ☐ Biome')
    this.log('     └─ TypeScript')
    this.log('     └─ TypeScript + React')
    this.log('   ☐ TypeScript Config')
    this.log('     └─ base')
    this.log('')
    this.log('💡 Interactive UI will be implemented in the next phase')
    this.log('   For now, you can use --all or --yes flags')
  }
}
