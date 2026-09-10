# deepelabs-website

Corporate website for Deepe Labs, Inc. — built to satisfy the company-website requirement for Apple Developer Program and Google Play Console registration.

## Contents

- `index.html` — home / about / contact
- `privacy.html` — privacy policy
- `terms.html` — terms of service
- `style.css` — shared stylesheet
- `.nojekyll` — tells GitHub Pages to serve files as-is

## Local preview

Open `index.html` directly in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying with GitHub Pages

1. Push this repository to GitHub (`main` branch).
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
5. GitHub publishes the site at `https://<username>.github.io/deepelabs-website/` within a few minutes.

To use the `deepelabs.com` domain instead, add a `CNAME` file with the domain name and point the domain's DNS at GitHub Pages, then set the custom domain in the same Pages settings screen.

## Note

`privacy.html` and `terms.html` are starting templates. Review them (ideally with counsel) and update them to match the actual data practices of each published app before submitting to Apple or Google.
