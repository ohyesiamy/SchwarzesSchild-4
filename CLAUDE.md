# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
Schwarzes Schild Banking System - React/TypeScript/Express.jsベースのモダンなバンキングアプリケーション

## 開発コマンド

### 基本的な開発フロー
```bash
# 開発サーバー起動
npm run dev

# TypeScript型チェック
npm run check

# プロダクションビルド
npm run build

# データベースマイグレーション
npm run db:push
```

### 環境変数
必須の環境変数:
- `DATABASE_URL` - PostgreSQL接続文字列（Neon serverless）
- `SESSION_SECRET` - セッションクッキーの暗号化キー

## アーキテクチャ概要

### フロントエンド構造
- **client/src/pages/** - ルートコンポーネント（ダッシュボード、取引、カード管理など）
- **client/src/components/** - 再利用可能なUIコンポーネント
  - `ui/` - shadcn/uiベースの基本コンポーネント
  - `modals/` - モーダルダイアログ（送金、入金、明細書など）
  - `dashboard/` - ダッシュボード専用コンポーネント
- **client/src/hooks/** - カスタムフック（認証、モバイル対応）

### バックエンド構造
- **server/index.ts** - メインサーバーエントリーポイント
- **server/routes.ts** - APIルートハンドラー（RESTful）
- **server/auth.ts** - Passport.js認証設定
- **server/db.ts** - Drizzle ORMデータベース接続
- **shared/schema.ts** - 共有スキーマ定義（Zod）

### 主要な技術的特徴

1. **認証フロー**
   - Passport.jsローカル戦略でのユーザー名/パスワード認証
   - express-sessionでのセッション管理
   - フロントエンドで2FAシミュレーションF

2. **データベース操作**
   - Drizzle ORMでのタイプセーフなクエリ
   - PostgreSQL（Neon serverless）使用
   - スキーマ：users, accounts, transactions, cards, exchanges, settings

3. **UIデザインパターン**
   - 黒と白のミニマリストデザイン
   - Playfair Displayフォントでブランディング
   - shadcn/uiコンポーネントで統一感のあるUI

4. **状態管理**
   - React Queryでサーバー状態管理
   - React Hook Form + Zodでフォームバリデーション
   - カスタムフックで認証状態管理

### 重要な実装詳細

- **ルーティング**: Wouterを使用（軽量）
- **APIエンドポイント**: `/api/*`パターン
- **セキュリティ**: scryptでパスワードハッシュ化
- **ビルドツール**: Vite（フロントエンド）、esbuild（バックエンド）
- **モバイル対応**: レスポンシブデザイン、専用モバイルナビゲーション

### 注意点
- テストファイルは現在未実装
- 環境変数の設定が必須（特にデータベース接続）
- セッションシークレットは本番環境で強固なものを使用すること

# ＤＥＰＬＯＹについて
- RenderでPostgreSQLをすでに借りている
- データベースのマイグレーションはRenderのデータベースに対して行う
- Vercelにフロントエンドはデプロイする