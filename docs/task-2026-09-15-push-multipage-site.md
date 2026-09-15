# Task for local Claude Code: push multi-page site update

Apple Developer Program enrollment (ID YXV674XMA6, case 102963877277) was
denied for "minimal content" on deepelabs.com. The cloud session restructured
the site from one crammed page into a real multi-page site: Products, About,
and Contact pages, each with substantive text, linked from an updated nav on
every page.

This is committed locally in the repo at `~/deepelabs-site` (or wherever this
repo is checked out), 2 commits ahead of `origin/main`:

- `146391b` Expand site to multi-page: add Products, About, Contact
- `84d0da9` Restore approved About wording lost in the multi-page split

Run:

```bash
cd ~/deepelabs-site   # adjust path if different
git status
git log --oneline -5
git push origin main
```

Confirm the push succeeded and paste the output back into the cloud session.
GitHub Pages will redeploy automatically; https://deepelabs.com should update
within a minute or two.

After it's live, before resubmitting the Apple Developer enrollment:
- Click through https://deepelabs.com/products.html, /about.html, and
  /contact.html live to confirm they render correctly.
- Double-check the deepelabs.com domain's WHOIS/registrant organization name
  matches "Deepe Labs, Inc." exactly — Apple's rejection also mentioned the
  domain must be associated with the organization, which this site change
  does not by itself fix.
