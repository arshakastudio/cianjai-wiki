# themanager-wiki

Wiki untuk [themanager](https://github.com/arshakastudio/themanager), dibangun dengan VitePress.

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # output: docs/.vitepress/dist
```

Halaman ada di `docs/`. Sidebar diatur di `docs/.vitepress/config.ts`.

## Deploy (Cloudflare Pages)

| Setting | Nilai |
|---|---|
| Build command | `pnpm build` |
| Output directory | `docs/.vitepress/dist` |

`pnpm-workspace.yaml` wajib punya `packages` — pnpm 10 di build image Cloudflare gagal tanpa itu.
