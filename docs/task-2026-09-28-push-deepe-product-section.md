# Task for local Claude Code: push Deepe product-page update

The cloud session added a short Deepe SaaS summary to products.html and the
homepage teaser, linking out to deepe.com and its fleet signup flow (no app
store badges or embedded screenshots — see the commit message for why).

This is committed locally in the repo at `~/deepelabs-site` (or wherever this
repo is checked out), 1 commit ahead of `origin/main`:

- `d83170a` Describe the Deepe SaaS product on the Products page

Run:

```bash
cd ~/deepelabs-site   # adjust path if different
git status
git log --oneline -3
git push origin main
```

Note: `git status` will likely also show local uncommitted changes
(`contact.html` modified, `contact-form.js` untracked) that are not part of
this task — review those separately before deciding whether to commit them;
this task only needs `d83170a` pushed.

Confirm the push succeeded and paste the output back into the cloud session.
GitHub Pages will redeploy automatically; https://deepelabs.com should update
within a minute or two.
