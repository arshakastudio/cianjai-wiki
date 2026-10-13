# Wiki Kampung Cianj.AI

Wiki publik Kampung Cianj.AI — karakter, tempat, dan episode dari serial pixel-art di Instagram
[@cianj.ai](https://www.instagram.com/cianj.ai/). Dibangun dengan VitePress.

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # output: docs/.vitepress/dist
```

## Isi

| Path | Isi |
|---|---|
| `docs/tentang.md` | premis dan asal-usul kampung |
| `docs/karakter/` | satu halaman per karakter |
| `docs/tempat.md` | tempat-tempat di kampung |
| `docs/episode/index.md` | daftar episode yang sudah tayang |
| `docs/public/karakter/<slug>/` | aset pixel art karakter |
| `docs/public/episode/` | cuplikan episode |

Sumber kebenaran karakter adalah sheet JSON di repo themanager
(`backend/app/data/characters/<slug>.json`); halaman di sini menyalin bagian yang layak publik.
Episode baru: tambahkan setelah tayang di Instagram, jangan sebelum.

## Deploy (Cloudflare Pages)

| Setting | Nilai |
|---|---|
| Build command | `pnpm build` |
| Output directory | `docs/.vitepress/dist` |

`pnpm-workspace.yaml` wajib punya `packages` — pnpm 10 di build image Cloudflare gagal tanpa itu.
