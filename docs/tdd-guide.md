# テスト駆動開発 (TDD) ガイド - t-wada × Khorikov アプローチ

## 📋 ドキュメント概要

このドキュメントは、Takuto Wada (t-wada) 氏のプロセスアプローチとVladimir Khorikov氏の良いテスト戦略を組み合わせたテスト駆動開発 (Test-Driven Development, TDD) の実践ガイドです。シンプルさと開発者体験を重視し、価値の高いテストの作成を目指します。

---

## 📑 目次

- [TDDの基本理念](#tddの基本理念)
- [Red-Green-Refactorサイクル](#red-green-refactorサイクル)
- [Vitestでのシンプルなアサーション](#vitestでのシンプルなアサーション)
- [実践的なTDDの進め方](#実践的なtddの進め方)
- [良いテストの4つの柱](#良いテストの4つの柱)
- [よくある落とし穴と対策](#よくある落とし穴と対策)
- [プロジェクトでの実践](#プロジェクトでの実践)

---

## 💡 TDDの基本理念

### "No API is the best API"

t-wada氏が提唱する最も重要な理念の一つです。テストにおいても、複雑なAPIを覚える必要がなく、シンプルな `assert(any_expression)` だけでテストが書けることを重視します。

```javascript
// 複雑なアサーション API を覚える必要なし
assert(user.name === 'John')
assert(user.age >= 18)
assert(array.length > 0)
```

### TDDは設計活動

TDDはテストのための活動ではなく、**設計のための活動**です。テストを先に書くことで：

- インターフェースの設計が自然と洗練される
- 使いやすいAPIが生まれる
- 必要最小限の機能に集中できる
- 副産物として自動テストが残る

---

## 🔄 Red-Green-Refactorサイクル

### 1. Red: 失敗するテストを書く

まず、実装したい機能の最小単位のテストを書きます。

```typescript
// 例: ユーザー作成機能のテスト
import { test, expect } from 'vitest'

test('should create user with valid name', () => {
  const user = createUser('John')
  expect(user.name).toBe('John')
  expect(user.id).toBeDefined()
})
```

**重要な点:**
- テストは必ず失敗する状態から始める
- 実装する機能の最も簡単な例から始める
- テストが読みやすく、意図が明確であることを確認する

### 2. Green: テストを通す最小のコードを書く

テストを通すための最小限のコードを実装します。

```typescript
function createUser(name: string) {
  return {
    name: name,
    id: Math.random().toString(36).substr(2, 9)
  }
}
```

**重要な点:**
- 最小限の実装でテストを通す
- 完璧な実装を目指さない
- まずは動作することを確認する

### 3. Refactor: コードを改善する

テストが通る状態を保ちながら、コードの品質を改善します。

```typescript
function createUser(name: string) {
  if (!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string')
  }
  
  return {
    name: name.trim(),
    id: generateId()
  }
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}
```

**重要な点:**
- テストが通り続けることを確認しながらリファクタリング
- 読みやすさと保守性を向上させる
- 新しい機能は追加しない

---

## ⚡ Vitestでのシンプルなアサーション

### 読みやすいテストの重要性

t-wada氏の"No API is the best API"の思想に基づき、Vitestでも直感的で読みやすいアサーションを心がけます：

```typescript
import { test, expect } from 'vitest'

// シンプルで意図が明確
test('should validate user age', () => {
  const user = { name: 'John', age: 25 }
  expect(user.age).toBeGreaterThanOrEqual(18)
})

// 失敗時も分かりやすいエラーメッセージ
// AssertionError: expected 16 to be greater than or equal to 18
```

### 基本的なアサーションパターン

```typescript
import { test, expect } from 'vitest'

// 等価性のテスト
expect(actual).toBe(expected)           // プリミティブの厳密等価
expect(actual).toEqual(expected)        // オブジェクトの深い比較

// 真偽値のテスト
expect(isValid).toBe(true)
expect(isEmpty).toBeFalsy()

// 配列・オブジェクトのテスト
expect(users).toHaveLength(3)
expect(user).toHaveProperty('name')
expect(user).toHaveProperty('name', 'John')

// 例外のテスト
expect(() => {
  createUser('')
}).toThrow('Name must be a non-empty string')

// 非同期のテスト
await expect(fetchUser(1)).resolves.toHaveProperty('name')
```

---

## 🛠 実践的なTDDの進め方

### 1. 最小のステップで進む

```typescript
import { test, expect } from 'vitest'

// ステップ1: 最も簡単なケース
test('should add two positive numbers', () => {
  expect(add(1, 2)).toBe(3)
})

// ステップ2: ゼロを含むケース
test('should handle zero', () => {
  expect(add(0, 5)).toBe(5)
  expect(add(3, 0)).toBe(3)
})

// ステップ3: 負の数を含むケース
test('should handle negative numbers', () => {
  expect(add(-1, 2)).toBe(1)
  expect(add(-3, -2)).toBe(-5)
})
```

### 2. 三角測量 (Triangulation)

複数のテストケースから一般的な実装を導き出します：

```typescript
import { test, expect } from 'vitest'

// 最初のテスト
test('should calculate tax for 100', () => {
  expect(calculateTax(100)).toBe(10)
})

// 2つ目のテスト（異なる値）
test('should calculate tax for 200', () => {
  expect(calculateTax(200)).toBe(20)
})

// 実装：パターンが見えたら一般化
function calculateTax(amount: number): number {
  return amount * 0.1
}
```

### 3. テストファーストの習慣

```typescript
import { test, expect } from 'vitest'

interface User {
  name: string
  age: number
}

// ❌ 悪い例：実装してからテスト
function formatUser(user: User): string {
  return `${user.name} (${user.age})`
}

test('should format user', () => {
  expect(formatUser({ name: 'John', age: 25 })).toBe('John (25)')
})

// ✅ 良い例：テストから始める
test('should format user', () => {
  const user = { name: 'John', age: 25 }
  const result = formatUser(user)
  expect(result).toBe('John (25)')
})

// その後で実装
function formatUser(user: User): string {
  return `${user.name} (${user.age})`
}
```

---

## 🏗 良いテストの4つの柱

Vladimir Khorikov氏が提唱する、価値のあるテストを評価するフレームワークです：

### 1. Protection against regressions (バグからの保護)

テストは実際のバグやリグレッションを効果的に検出する必要があります。

```typescript
import { test, expect } from 'vitest'

// ✅ 良い例：実際のビジネスロジックをテスト
test('should calculate correct discount for premium users', () => {
  const user = { type: 'premium', purchaseAmount: 1000 }
  const discount = calculateDiscount(user)
  expect(discount).toBe(100) // 10%割引
})

// ❌ 悪い例：トリビアルなコードをテスト
test('should return input value', () => {
  const result = identity(42)
  expect(result).toBe(42)
})
```

### 2. Resistance to refactoring (リファクタリングへの耐性)

実装の詳細が変わってもテストが壊れないようにします。

```typescript
// ✅ 良い例：パブリックAPIをテスト
test('should process user registration', () => {
  const userData = { email: 'test@example.com', password: 'password123' }
  const result = registerUser(userData)
  expect(result.success).toBe(true)
  expect(result.userId).toBeDefined()
})

// ❌ 悪い例：実装の詳細に依存
test('should call validation methods in correct order', () => {
  const userService = new UserService()
  const spy1 = vi.spyOn(userService, 'validateEmail')
  const spy2 = vi.spyOn(userService, 'validatePassword')
  
  userService.registerUser(userData)
  
  expect(spy1).toHaveBeenCalledBefore(spy2)
})
```

### 3. Fast feedback (高速なフィードバック)

テストは迅速に実行され、開発のフィードバックループを短縮します。

```typescript
// ✅ 良い例：軽量なユニットテスト
test('should validate email format', () => {
  expect(isValidEmail('test@example.com')).toBe(true)
  expect(isValidEmail('invalid-email')).toBe(false)
})

// ⚠️ 注意：必要な場合のみ統合テスト
test('should save user to database', async () => {
  // データベースへの実際の接続が必要な場合
  const user = await saveUser({ name: 'John' })
  expect(user.id).toBeDefined()
})
```

### 4. Maintainability (保守性)

テストは理解しやすく、保守しやすい必要があります。

```typescript
// ✅ 良い例：明確で読みやすい
test('should reject user registration with invalid email', () => {
  const invalidUserData = { email: 'invalid', password: 'password123' }
  
  expect(() => {
    registerUser(invalidUserData)
  }).toThrow('Invalid email format')
})

// ❌ 悪い例：複雑で理解困難
test('complex scenario', () => {
  const data = setupComplexScenario()
  const result = processData(data)
  expect(result.status).toBe('success')
  expect(result.items.filter(i => i.type === 'A').length).toBeGreaterThan(0)
})
```

### 柱のバランス

- **1番目と3番目は相互排他的**: より包括的なテスト（保護力向上）ほど、実行が遅くなる傾向
- **2番目と4番目はバイナリ**: テストは保守可能であるか否か、実装に依存するか否か
- **価値の高いテスト**: 1番目と3番目の適切なバランスを取り、2番目と4番目を満たす

---

## ⚠️ よくある落とし穴と対策

### 1. テストが複雑すぎる

```typescript
import { test, expect } from 'vitest'

// ❌ 悪い例：複雑すぎるテスト
test('should handle complex user scenario', () => {
  const user = createUser('John')
  user.addEmail('john@example.com')
  user.setAge(25)
  user.addRole('admin')
  user.activate()
  
  expect(user.isActive && user.emails.length === 1 && user.hasRole('admin')).toBe(true)
})

// ✅ 良い例：シンプルで焦点を絞ったテスト
test('should activate user', () => {
  const user = createUser('John')
  user.activate()
  expect(user.isActive).toBe(true)
})

test('should add email to user', () => {
  const user = createUser('John')
  user.addEmail('john@example.com')
  expect(user.emails).toContain('john@example.com')
})
```

### 2. モックの過度な使用

```typescript
import { test, expect, vi } from 'vitest'

// ❌ 悪い例：何でもモック
test('should save user', () => {
  const mockDb = { save: vi.fn() }
  const mockLogger = { log: vi.fn() }
  const mockValidator = { validate: vi.fn().mockReturnValue(true) }
  
  const service = new UserService(mockDb, mockLogger, mockValidator)
  service.saveUser({ name: 'John' })
  
  expect(mockDb.save).toHaveBeenCalled()
})

// ✅ 良い例：必要最小限のモック（共有依存としてのデータベースのみ）
test('should save valid user', () => {
  const userRepository = new InMemoryUserRepository()
  const service = new UserService(userRepository)
  
  const user = service.saveUser({ name: 'John' })
  const savedUser = userRepository.findById(user.id)
  
  expect(savedUser.name).toBe('John')
})
```

### 3. テストの独立性の欠如

```typescript
import { test, expect } from 'vitest'

// ❌ 悪い例：テスト間で状態を共有
let users: Array<{ name: string }> = []

test('should add user', () => {
  users.push({ name: 'John' })
  expect(users).toHaveLength(1)
})

test('should find user', () => {
  // 前のテストに依存している
  const user = users.find(u => u.name === 'John')
  expect(user).toBeDefined()
})

// ✅ 良い例：各テストが独立
test('should add user', () => {
  const userList: Array<{ name: string }> = []
  userList.push({ name: 'John' })
  expect(userList).toHaveLength(1)
})

test('should find user', () => {
  const userList = [{ name: 'John' }]
  const user = userList.find(u => u.name === 'John')
  expect(user).toBeDefined()
})
```

---

## 🚀 プロジェクトでの実践

### 設定例

このプロジェクトでのTDD実践のための設定：

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

```javascript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'html'],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
```

### ディレクトリ構造

```
src/
├── utils/
│   ├── math.ts
│   └── math.test.ts
├── services/
│   ├── userService.ts
│   └── userService.test.ts
└── components/
    ├── Button.tsx
    └── Button.test.tsx
```

### 実際のワークフロー

1. **新機能の開発時**
   ```bash
   # テストを書く
   pnpm test:watch
   
   # Red: 失敗するテストを確認
   # Green: 最小の実装でテストを通す
   # Refactor: コードを改善
   ```

2. **既存機能の修正時**
   ```bash
   # 既存テストが通ることを確認
   pnpm test
   
   # 新しいテストケースを追加
   # 修正を実装
   # すべてのテストが通ることを確認
   ```

3. **リリース前**
   ```bash
   # 全テストの実行
   pnpm test
   
   # カバレッジの確認
   pnpm test:coverage
   
   # ビルドとリント
   pnpm build && pnpm lint
   ```

---

## 📚 参考資料

- [Test-Driven Development by Kent Beck](https://www.ohmsha.co.jp/book/9784274217883/) - t-wada氏による日本語翻訳版
- [Unit Testing Principles, Practices, and Patterns by Vladimir Khorikov](https://www.manning.com/books/unit-testing) - 価値のあるテストの書き方
- [Vitest](https://vitest.dev/) - モダンなテストフレームワーク
- [Power Assert](https://github.com/power-assert-js/power-assert) - t-wada氏が開発したアサーションライブラリ

---

## 📝 まとめ

TDDの実践において最も重要なのは：

### t-wadaアプローチの核心
1. **シンプルさを保つ** - 複雑なAPIより、理解しやすいコード
2. **小さなステップで進む** - Red-Green-Refactorサイクルで漸進的に
3. **設計活動として使う** - テストはAPIの最初のユーザー

### Khorikov戦略の価値観
4. **4つの柱を意識する** - バグからの保護、リファクタリング耐性、高速フィードバック、保守性
5. **モックを最小限に** - 共有依存のみモックし、実装詳細をテストしない
6. **アーキテクチャと連携** - Functional Core, Imperative Shellでテスタブルな設計

TDDは単なるテスト手法ではなく、より良いソフトウェアを作るための設計手法です。このプロセスと戦略を組み合わせることで、保守性が高く、価値のあるテストを書くことができるようになります。