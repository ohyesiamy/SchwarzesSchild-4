# Schwarzes Schild Banking System

高級プライベートバンキングシステムのモダンなウェブアプリケーション。

## 機能

- 🔐 セキュアな認証システム（JWT）
- 💳 複数通貨口座管理
- 💱 リアルタイム為替交換
- 📊 ポートフォリオ管理
- 🎴 バーチャル/物理カード管理
- 📱 完全レスポンシブデザイン

## 技術スタック

### フロントエンド
- React 18 + TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- React Query

### バックエンド
- Vercel Functions
- PostgreSQL (Neon)
- Drizzle ORM
- JWT認証

## セットアップ

### 必要要件
- Node.js 18+
- PostgreSQLデータベース

### インストール
```bash
npm install
```

### 環境変数
`.env.example`をコピーして`.env`を作成し、必要な値を設定：
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

### 開発サーバー
```bash
npm run dev
```

### データベースセットアップ
```bash
npm run db:push
```

## デプロイ

### Vercelへのデプロイ
```bash
npx vercel
```

詳細は[DEPLOYMENT.md](./DEPLOYMENT.md)を参照。

## プロジェクト構造

```
├── api/              # Vercel Functions
├── client/           # Reactフロントエンド
├── server/           # バックエンドユーティリティ
├── shared/           # 共有型定義
└── lib/              # 共有ライブラリ
```

## ライセンス

MIT