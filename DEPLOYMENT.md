# Vercel Deployment Guide

## Prerequisites
1. Vercelアカウント
2. PostgreSQLデータベース（Neon, Supabase, Vercel Postgres等）

## デプロイ手順

### 1. Vercel CLIインストール
```bash
npm i -g vercel
```

### 2. プロジェクトをVercelにリンク
```bash
vercel
```

### 3. 環境変数の設定
Vercelダッシュボードまたはコマンドラインで以下の環境変数を設定：

```bash
# データベース接続
vercel env add DATABASE_URL

# JWT認証用シークレット
vercel env add JWT_SECRET

# セッション用シークレット（使用しないが互換性のため）
vercel env add SESSION_SECRET
```

### 4. データベースのセットアップ
```bash
# ローカルでスキーマをプッシュ
npm run db:push

# または、Vercel上で実行
vercel env pull .env.local
npm run db:push
```

### 5. デプロイ実行
```bash
# プロダクションデプロイ
vercel --prod

# プレビューデプロイ
vercel
```

## 環境変数の詳細

| 変数名 | 説明 | 例 |
|--------|------|-----|
| DATABASE_URL | PostgreSQL接続文字列 | postgresql://user:pass@host/db?sslmode=require |
| JWT_SECRET | JWT署名用の秘密鍵 | ランダムな長い文字列 |
| SESSION_SECRET | Express Session用（互換性のため） | ランダムな長い文字列 |

## トラブルシューティング

### API呼び出しが401エラーになる場合
- JWT_SECRETが正しく設定されているか確認
- クライアントサイドでトークンが正しく送信されているか確認

### データベース接続エラー
- DATABASE_URLの形式が正しいか確認
- SSLモードが有効になっているか確認（?sslmode=require）

### ビルドエラー
- Node.jsバージョンが18以上か確認
- 依存関係が正しくインストールされているか確認

## 注意事項

1. **セキュリティ**
   - JWT_SECRETは必ず強力なランダム文字列を使用
   - 環境変数は絶対にソースコードにコミットしない

2. **パフォーマンス**
   - Vercel Functionsは最大実行時間30秒の制限あり
   - 大量のデータ処理は避ける

3. **データベース**
   - コネクションプーリングに注意
   - Vercel Functionsはサーバーレスなので、接続を適切に管理する必要あり