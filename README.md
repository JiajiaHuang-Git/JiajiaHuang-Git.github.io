# Jiajia Huang | HKUST

Personal academic website: https://jiajiahuang-git.github.io/

A lightweight, responsive static website. No build tools or external font services are required. Optional Google Analytics loads only after a visitor opts in.

## Edit

- About Me, Contact and profile links: `index.html`
- Layout and colors: `styles.css`
- Sidebar avatar (copied from the public GitHub profile): `avatar.jpg`
- Search engine discovery: `robots.txt` and `sitemap.xml`

GitHub Pages publishes `main` from the repository root. Pushing changes updates the live site automatically.

## Google Search Console

1. Open https://search.google.com/search-console/ and sign in with the Google account that should manage the website.
2. Add a **URL prefix** property for `https://jiajiahuang-git.github.io/` (not a Domain property, since github.io DNS is managed by GitHub).
3. Choose **HTML tag** verification. Copy the exact `google-site-verification` meta tag into the `<head>` of `index.html`; do not invent or replace its token.
4. Commit and push, wait until the live source contains the tag, then click **Verify** in Search Console. Keep the tag permanently.
5. Submit `sitemap.xml` under **Sitemaps**.
6. Inspect `https://jiajiahuang-git.github.io/` and select **Request indexing**, if available.

Verification confirms website ownership, not search indexing or a guaranteed ranking.

## Google Analytics

- Dashboard: https://analytics.google.com/analytics/web/#/a411609479p558430597/reports/intelligenthome
- Account: Jiajia Huang (411609479)
- Property: Jiajia Huang | HKUST (558430597)
- Web stream: Jiajia Huang Personal Website (16109835048)
- Measurement ID: `G-24NKMWFHTF` (public configuration, not a credential)
- Consent controls and privacy notice: `analytics.js` and `analytics.css`; visitors can change their choice with the footer's Privacy & analytics button.
- Google tags load only on HTTPS at `jiajiahuang-git.github.io`, after consent. Local files, localhost and other preview hosts are excluded.
- Basic Consent Mode keeps all advertising consent denied. Google signals and advertising personalization are disabled. Enhanced measurement is disabled in the web stream; standard page views are retained.
- Analytics cookies expire after 90 days without renewal on each visit. User and event data retention is two months, with reset on new activity disabled; aggregate reports may persist longer.
- The code strips query strings and fragments from page and referrer addresses before sending them to Analytics.

Use the Realtime report to check new visits. Only consenting visitors are measured, and content blockers may prevent collection. Prior unrecorded visits cannot be recovered.

## Public information sources

- https://github.com/JiajiaHuang-Git
- https://angstrom.hkust.edu.hk/members.html
- https://doi.org/10.1002/anie.202425261
- https://api.crossref.org/works/10.1016/j.cplett.2025.142036
- https://github.com/JiajiaHuang-Git/Methane-NN-dipole-model

Only the site files belong in this public repository. Do not add private CVs, applications, unpublished work, or credentials.

## Design

White background, black text, serif headings and blue links, with a profile sidebar and a responsive reading column. The page contains only About Me and Contact. The layout was inspired by https://phyzyw.github.io/; the HTML and CSS are maintained directly in this repository.
