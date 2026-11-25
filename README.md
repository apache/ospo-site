# Apache OSPO Website

Source for the website of the **Open Source Program Office (OSPO)** at
[The Apache Software Foundation](https://www.apache.org/), based on the
*"VP OSPO at The Apache Software Foundation — Role and Mission"* charter.

## Structure

| Path | Purpose |
| --- | --- |
| `hugo.toml` | Site config, navigation menu, contact parameters |
| `data/ospo.yaml` | **Single source of truth** for structured content (mission, audiences, principles, relationships, routing directory, channels…) |
| `content/charter/_index.md` | Full charter text, rendered as a long-form document with TOC |
| `content/*/_index.md` | Page titles, eyebrows, and subtitles for each section |
| `layouts/` | Hugo templates (home, per-section layouts, partials) |
| `assets/css/main.css`, `assets/js/main.js` | Styles and progressive-enhancement scripts (minified & fingerprinted at build) |
| `static/` | Official ASF logos (from apache.org) and self-hosted fonts |
| `.asf.yaml` | ASF Infrastructure publishing config (`asf-site` / `asf-staging`) |

### Pages

- **Overview** (`/`) — mission, role summary, audiences, rationale, routing directory, principles
- **Engage** (`/engage/`) — vendors & companies, public sector, peer foundations, norms & standards
- **Projects & Ecosystems** (`/projects/`) — bringing a project to the ASF, opt-in PMC support
- **Governance** (`/governance/`) — principles, what the role is not, working relationships (filterable), reporting, measures of success
- **Charter** (`/charter/`) — the full charter document
- **Contact** (`/contact/`) — communication channels (`discuss@ospo.apache.org`, `contact@ospo.apache.org`) and what to expect

## Local development

Requires [Hugo](https://gohugo.io/) **v0.156+** (uses `hugo.Data`).

```sh
hugo server          # http://localhost:1313/
hugo --gc --minify   # production build into ./public
```

## Publishing

A GitHub Actions workflow (`.github/workflows/website.yml`) builds the site on
every push / PR. To publish on ASF infrastructure, push the contents of
`public/` to the `asf-site` branch (per `.asf.yaml`); `preview/*` branches can
be staged via `asf-staging`.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
