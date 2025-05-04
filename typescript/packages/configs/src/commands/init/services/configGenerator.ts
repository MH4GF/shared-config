import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Biomeの設定タイプ
 */
export type BiomeConfigType = 'base' | 'nodejs' | 'react'

/**
 * TypeScriptの設定タイプ
 */
export type TypeScriptConfigType = 'base'

/**
 * ConfigGenerator関数のエクスポート
 * 単一のオブジェクトとしてすべての関数をエクスポートし、
 * テストの互換性も維持する
 */
export const ConfigGenerator = {
  /**
   * Biome設定ファイルをプロジェクトにコピーする
   * @param configType 設定タイプ
   * @param targetDir 対象ディレクトリ（デフォルトはカレントディレクトリ）
   */
  copyBiomeConfig: async (
    configType: BiomeConfigType,
    targetDir: string = process.cwd(),
  ): Promise<void> => {
    const templatePath = path.join(__dirname, '..', 'templates', 'biome', `${configType}.json`)
    const destinationPath = path.join(targetDir, 'biome.json')

    await fs.copyFile(templatePath, destinationPath)
  },

  /**
   * TypeScript設定ファイルをプロジェクトにコピーする
   * @param configType 設定タイプ
   * @param targetDir 対象ディレクトリ（デフォルトはカレントディレクトリ）
   */
  copyTypeScriptConfig: async (
    configType: TypeScriptConfigType,
    targetDir: string = process.cwd(),
  ): Promise<void> => {
    const templatePath = path.join(__dirname, '..', 'templates', 'tsconfig', `${configType}.json`)
    const destinationPath = path.join(targetDir, 'tsconfig.json')

    await fs.copyFile(templatePath, destinationPath)
  },

  /**
   * package.jsonにBiome関連のスクリプトを追加する
   * @param targetDir 対象ディレクトリ（デフォルトはカレントディレクトリ）
   */
  addBiomeScriptsToPackageJson: async (targetDir: string = process.cwd()): Promise<void> => {
    const packageJsonPath = path.join(targetDir, 'package.json')

    try {
      // package.jsonを読み込む
      const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8')
      const packageJson = JSON.parse(packageJsonContent) as {
        scripts?: Record<string, string>
        [key: string]: unknown
      }

      // scriptsセクションがなければ作成
      if (!packageJson.scripts) {
        packageJson.scripts = {}
      }

      // Biome関連のスクリプトを追加
      packageJson.scripts['lint:biome'] = 'biome check .'
      packageJson.scripts['fmt:biome'] = 'biome format --write .'

      // package.jsonを書き込む
      await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf-8')
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error('package.json not found')
      }
      throw error
    }
  },
}
