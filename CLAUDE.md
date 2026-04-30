# 酒処あかり サイト作業メモ

## プロジェクト概要
- サイト: https://sakedokoro-akari.com
- ホスティング: GitHub Pages（予定）
- リポジトリ: `atmos-dining/akari-site`（GitHub）
- ブランチ: main

## 店舗情報
- 店舗名: 酒処あかり
- 住所: 福岡県福岡市博多区博多駅東2-3-29 東福博多駅東ビル 1F
- 電話: 092-710-7577
- 営業: 16:30〜23:30（L.O. 22:45）年中無休
- 定休: 年中無休
- アクセス: JR博多駅・地下鉄博多駅 徒歩3分
- Instagram: @akari_hakata
- 予約: AutoReserve (https://autoreserve.com/ja/restaurants/1aZGQtyvpTCGUdTrM6zT)
- 業態: 昭和レトロ大衆居酒屋
- 運営: アトモスダイニング

## デザインコンセプト
- テーマ: 昭和レトロ × モダン
- カラー: 朱色 (#C8392A) + 金 (#C9A84C) + 黒 (#0E0E0E)
- フォント: Noto Serif JP
- アニメーション: Ken Burns (hero), staggered fadeUp, counter, scroll reveal

## ブログの仕組み
- ブログデータ: `blog/posts.json` `{ "posts": [...] }` 形式
- 記事一覧: `blog/index.html`
- 記事詳細: `blog/posts/post.html?slug=xxx`
- CMS管理: `/admin/` (Sveltia CMS)

## CMS設定
- Cloudflare Worker: https://sveltia-cms-auth.atmos-nextgen-team.workers.dev
- GitHub OAuth App: 六本松ごえん CMS（Client ID: Ov23liCY31EnaQCgwLx9）共用

## ドメイン
- CNAMEファイル: `sakedokoro-akari.com`
- GA4: G-3RQDKX6XT9（全ページに設置済み）
