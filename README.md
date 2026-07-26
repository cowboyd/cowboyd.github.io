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

Deployment is driven by `.github/workflows/deploy.yaml`. Two secrets must be configured on the repo:

- `NETLIFY_AUTH_TOKEN` — personal access token from Netlify user settings
- `NETLIFY_SITE_ID` — from the Netlify site's General → Site information page

Push to the `production` branch to trigger a prod deploy. PRs get preview deploys automatically.

To promote the current `main` to production:

```bash
git push origin main:production
```
