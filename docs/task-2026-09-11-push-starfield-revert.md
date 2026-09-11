# Task for local Claude Code: push starfield revert

The cloud session reverted the hero background from the generative topographic
contour animation back to the original twinkling starfield (no wireframe, no
grid), keeping the current "Beyond Code / Think Deep" headline. This is
committed locally in the repo at `~/deepelabs-site` (or wherever this repo is
checked out) as commit `4e0a9c4` — 1 commit ahead of `origin/main`.

Run:

```bash
cd ~/deepelabs-site   # adjust path if different
git status
git log --oneline -3
git push origin main
```

Confirm the push succeeded and paste the output back into the cloud session.

GitHub Pages will redeploy automatically after the push; the live site at
https://deepelabs.com should update within a minute or two.
