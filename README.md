# cogentdude.com

Personal site and CV for Charles Lowell. Built with [Deno](https://deno.com), [revolution](https://deno.land/x/revolution), [Twind](https://twind.style), and [staticalize](https://github.com/thefrontside/staticalize).

## Dev

```bash
deno task dev         # watch + serve on http://localhost:8005
deno task start       # serve without watch
deno task staticalize # crawl the running server → ./built/
deno task test        # run smoke tests
```

## Deploying

Deployment is driven by `.github/workflows/deploy.yaml` and publishes to
GitHub Pages via the modern Actions-based flow (no `gh-pages` branch).

Enable it once per repo: **Settings → Pages → Source: GitHub Actions**.

Every push to `master` builds the site (deno task staticalize, including the
PDF and the legacy pages copy) and deploys the resulting `built/` directory as
a Pages artifact. The `CNAME` file in the repo root gets copied into `built/`
so the custom domain (cogentdude.com) is preserved.
