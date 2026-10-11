# Jiajia Huang | HKUST

Personal academic website: https://jiajiahuang-git.github.io/

A lightweight, responsive static website. No build tools, tracking scripts, or external font services are required.

## Edit

- Personal introduction, research, publications and links: `index.html`
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

## Public information sources

- https://github.com/JiajiaHuang-Git
- https://angstrom.hkust.edu.hk/members.html
- https://doi.org/10.1002/anie.202425261
- https://api.crossref.org/works/10.1016/j.cplett.2025.142036
- https://github.com/JiajiaHuang-Git/Methane-NN-dipole-model

Only the site files belong in this public repository. Do not add private CVs, applications, unpublished work, or credentials.

## Design

White background, gray text, blue links, a profile sidebar and a responsive reading column. The layout was inspired by https://phyzyw.github.io/; the HTML and CSS are maintained directly in this repository.
