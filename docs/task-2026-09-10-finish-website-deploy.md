# Task: finish deploying deepelabs-website

## Context
The corporate site for Deepe Labs, Inc. was built and committed locally
(branch `main`, remote `origin` = https://github.com/anekrasova/deepelabs-website.git)
by a cloud session that has no GitHub credentials. This machine's terminal
does, so the remaining steps run from here.

Files already committed: index.html, privacy.html, terms.html, style.css,
README.md, .nojekyll.

## Steps for Claude Code to run

1. Confirm the repo state:
   ```
   cd ~/deepelabs-site
   git status
   git log --oneline -3
   git remote -v
   ```
   Expect: clean working tree, one commit "Initial commit: corporate site
   for Deepe Labs Inc", origin pointing at anekrasova/deepelabs-website.

2. Push to GitHub:
   ```
   git push -u origin main
   ```
   If the remote repo does not exist yet on GitHub, create it first
   (`gh repo create anekrasova/deepelabs-website --public --source=. --remote=origin`
   or via github.com), then retry the push.

3. Verify the push succeeded:
   ```
   git log origin/main --oneline -1
   ```
   Should match the local HEAD commit.

## Manual steps (GitHub web UI, not scriptable from a terminal)

4. On github.com, open the repo, go to Settings > Pages.
5. Under "Build and deployment", set Source to "Deploy from a branch".
6. Set Branch to `main`, folder `/ (root)`, click Save.
7. Wait a few minutes, then confirm the site loads at
   https://anekrasova.github.io/deepelabs-website/

## Optional: custom domain (deepelabs.com)

8. Add a `CNAME` file at the repo root containing exactly:
   ```
   deepelabs.com
   ```
   commit and push it.
9. At the DNS provider for deepelabs.com, add the records GitHub Pages
   requires (A records to GitHub's IPs, or a CNAME if using a subdomain)
   per https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
10. Back in Settings > Pages, enter `deepelabs.com` as the custom domain
    and enable "Enforce HTTPS" once the certificate is issued.

## Before submitting to Apple Developer Program / Google Play Console

11. Review privacy.html and terms.html against what each app actually
    collects (camera, video, account data, location, etc.). These are
    solid starting templates, not legal advice.
12. terms.html names Utah as governing law — confirm this matches Deepe
    Labs' actual state of incorporation and update if not.
