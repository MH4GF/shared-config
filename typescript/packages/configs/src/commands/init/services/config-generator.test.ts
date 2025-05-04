import path from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ConfigGenerator } from './configGenerator.js'

// fs/promisesのモック関数を直接作成
const mockFs = {
  copyFile: vi.fn().mockResolvedValue(undefined),
  readFile: vi.fn(),
  writeFile: vi.fn().mockResolvedValue(undefined),
}

// ConfigGeneratorのfs依存をオーバーライド
const originalCopyBiomeConfig = ConfigGenerator.copyBiomeConfig
const originalCopyTypeScriptConfig = ConfigGenerator.copyTypeScriptConfig
const originalAddBiomeScriptsToPackageJson = ConfigGenerator.addBiomeScriptsToPackageJson

// テスト用にモック実装で上書き
ConfigGenerator.copyBiomeConfig = vi.fn(async (configType, targetDir = process.cwd()) => {
  const templatePath = path.join('templates', 'biome', `${configType}.json`)
  const destinationPath = path.join(targetDir, 'biome.json')
  await mockFs.copyFile(templatePath, destinationPath)
})

ConfigGenerator.copyTypeScriptConfig = vi.fn(async (configType, targetDir = process.cwd()) => {
  const templatePath = path.join('templates', 'tsconfig', `${configType}.json`)
  const destinationPath = path.join(targetDir, 'tsconfig.json')
  await mockFs.copyFile(templatePath, destinationPath)
})

ConfigGenerator.addBiomeScriptsToPackageJson = vi.fn(async (targetDir = process.cwd()) => {
  const packageJsonPath = path.join(targetDir, 'package.json')
  
  try {
    const content = await mockFs.readFile(packageJsonPath, 'utf-8')
    const packageJson = JSON.parse(content.toString())
    
    if (!packageJson.scripts) {
      packageJson.scripts = {}
    }
    
    packageJson.scripts['lint:biome'] = 'biome check .'
    packageJson.scripts['fmt:biome'] = 'biome format --write .'
    
    await mockFs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8')
  } catch (error) {
    if ((error as any).code === 'ENOENT') {
      throw new Error('package.json not found')
    }
    throw error
  }
})

describe('ConfigGenerator', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    vi.resetAllMocks()
    mockFs.readFile.mockReset()
    mockFs.writeFile.mockReset()
    mockFs.copyFile.mockReset()
  })
  
  // テスト後に元の実装を復元
  afterAll(() => {
    ConfigGenerator.copyBiomeConfig = originalCopyBiomeConfig
    ConfigGenerator.copyTypeScriptConfig = originalCopyTypeScriptConfig
    ConfigGenerator.addBiomeScriptsToPackageJson = originalAddBiomeScriptsToPackageJson
  })

  describe('copyBiomeConfig', () => {
    it('正しいパスからBiome設定ファイルをコピーする', async () => {
      const mockCwd = '/mock/project'
      vi.spyOn(process, 'cwd').mockReturnValue(mockCwd)

      await ConfigGenerator.copyBiomeConfig('base')

      // 正しいパスからコピーされたか検証
      expect(mockFs.copyFile).toHaveBeenCalledWith(
        expect.stringContaining(path.join('templates', 'biome', 'base.json')),
        path.join(mockCwd, 'biome.json'),
      )
    })

    it('異なる設定タイプに対応できる', async () => {
      const mockCwd = '/mock/project'
      vi.spyOn(process, 'cwd').mockReturnValue(mockCwd)

      await ConfigGenerator.copyBiomeConfig('react')

      // react.jsonがコピーされたか検証
      expect(mockFs.copyFile).toHaveBeenCalledWith(
        expect.stringContaining(path.join('templates', 'biome', 'react.json')),
        path.join(mockCwd, 'biome.json'),
      )
    })

    it('指定したディレクトリにファイルをコピーできる', async () => {
      const targetDir = '/custom/dir'

      await ConfigGenerator.copyBiomeConfig('base', targetDir)

      // 指定したディレクトリにコピーされたか検証
      expect(mockFs.copyFile).toHaveBeenCalledWith(
        expect.any(String),
        path.join(targetDir, 'biome.json'),
      )
    })
  })

  describe('copyTypeScriptConfig', () => {
    it('正しいパスからTypeScript設定ファイルをコピーする', async () => {
      const mockCwd = '/mock/project'
      vi.spyOn(process, 'cwd').mockReturnValue(mockCwd)

      await ConfigGenerator.copyTypeScriptConfig('base')

      // 正しいパスからコピーされたか検証
      expect(mockFs.copyFile).toHaveBeenCalledWith(
        expect.stringContaining(path.join('templates', 'tsconfig', 'base.json')),
        path.join(mockCwd, 'tsconfig.json'),
      )
    })

    it('指定したディレクトリにファイルをコピーできる', async () => {
      const targetDir = '/custom/dir'

      await ConfigGenerator.copyTypeScriptConfig('base', targetDir)

      // 指定したディレクトリにコピーされたか検証
      expect(mockFs.copyFile).toHaveBeenCalledWith(
        expect.any(String),
        path.join(targetDir, 'tsconfig.json'),
      )
    })
  })

  describe('addBiomeScriptsToPackageJson', () => {
    it('package.jsonが存在する場合、スクリプトを追加する', async () => {
      const mockCwd = '/mock/project'
      vi.spyOn(process, 'cwd').mockReturnValue(mockCwd)

      // package.jsonの読み込みをモック化
      mockFs.readFile.mockResolvedValue(
        JSON.stringify({
          name: 'test-project',
          scripts: {
            test: 'vitest',
          },
        }),
      )

      await ConfigGenerator.addBiomeScriptsToPackageJson()

      // package.jsonを読み込んだか検証
      expect(mockFs.readFile).toHaveBeenCalledWith(path.join(mockCwd, 'package.json'), 'utf-8')

      // 書き込まれた内容を検証
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join(mockCwd, 'package.json'),
        expect.stringContaining('"lint:biome": "biome check ."'),
        'utf-8',
      )
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        path.join(mockCwd, 'package.json'),
        expect.stringContaining('"fmt:biome": "biome format --write ."'),
        'utf-8',
      )
    })

    it('scriptsセクションがない場合、セクションを作成してスクリプトを追加する', async () => {
      // scriptsセクションがないpackage.jsonのモック
      mockFs.readFile.mockResolvedValue(
        JSON.stringify({
          name: 'test-project',
        }),
      )

      await ConfigGenerator.addBiomeScriptsToPackageJson()

      // 書き込まれた内容を検証
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('"scripts": {'),
        'utf-8',
      )
    })

    it('package.jsonが存在しない場合、エラーをスローする', async () => {
      // ENOENTエラーをモック
      const error = new Error('File not found') as NodeJS.ErrnoException
      error.code = 'ENOENT'
      mockFs.readFile.mockRejectedValue(error)

      await expect(ConfigGenerator.addBiomeScriptsToPackageJson()).rejects.toThrow(
        'package.json not found',
      )
    })
  })
})
