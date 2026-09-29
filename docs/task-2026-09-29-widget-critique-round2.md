# Task for local Claude Code: second design-critique fixes for the Deepe Frog widget

A second full-site design critique (round 2, after the Deepe Frog widget
shipped in `13fa109`) found 4 issues. One is already fixed by an earlier
local session:

- Duplicate SVG gradient id across the launcher icon and panel avatar
  (colorless frog / invisible frog in some browsers) — already fixed in
  `ac7cb18` and `0822c38`. No action needed here.

The other 3 remain open. Items 1 and 2 below are concrete code fixes.
Item 3 is a product/brand-tone call for Denis, not something to code
without his answer — implement nothing for it, just flag it back to him.

## 1. Footer links can sit under the floating widget button

`#deepe-frog-root` is `position: fixed; right: 24px; bottom: 24px` (16px on
screens under 480px, in `deepe-frog.js`). `footer.site-footer .wrap` has no
`max-width` override of its own, so on narrow/mobile viewports its content
runs close to the true viewport edge — meaning the footer's Terms link can
land directly under the widget launcher once a visitor scrolls to the
bottom of Terms, Privacy, or any other page.

Fix: reserve room for the widget in the footer's own layout at the mobile
breakpoint, in `style.css`, inside the existing `@media (max-width: 480px)`
block:

```css
@media (max-width: 480px) {
  footer.site-footer .wrap {
    padding-right: 92px;
  }
}
```

92px clears the 64px launcher plus its right inset with a small margin.
Verify Terms/Privacy at 375px width with the widget closed: the "Terms" /
"Privacy" links should no longer sit under the launcher button.

## 2. Widget introduces an unregistered third accent color

`deepe-frog.js` hardcodes a pink (`#ff90ac` for the tongue stroke,
`rgba(255,144,172,...)` for the "Tell me a space joke" chip) that exists
nowhere in `style.css`'s token set (`--accent` violet, `--glow` teal). It
reads as a stray value rather than a deliberate third brand color.

Fix: keep the color (it's a fine personality touch, not a bug) but
register it properly instead of leaving it as a bare hex buried in JS.
Add to `style.css` `:root`:

```css
--accent-fun: #ff90ac;
```

Then in `deepe-frog.js`, replace the hardcoded `#ff90ac` / `rgba(255,144,172,...)`
occurrences with a `var(--accent-fun, #ff90ac)` reference (the widget's
injected `<style>` runs on the same page as `style.css`, so the custom
property is available; keep the hex fallback for safety). No visual change
expected — this is purely making the existing color an intentional,
discoverable token instead of a hidden one.

## 3. Open question for Denis — no code change

The critique flagged that a bouncing, star-catching frog mascot may not be
the tone fleet managers and compliance officers expect on a page like
`terms.html` or `privacy.html`, versus the marketing pages. This needs a
decision, not a fix:

- (a) leave the widget exactly as-is, site-wide, or
- (b) tone it down specifically on Terms/Privacy (e.g. skip the bounce/pulse
  animation there, plainer tooltip copy), or
- (c) hide the widget entirely on Terms/Privacy.

Do not implement any of these without Denis picking one — surface the
question back to him instead of guessing.

## Commit and push

```bash
cd ~/deepelabs-site   # adjust path if different
git status
git diff
git add style.css deepe-frog.js
git commit -m "Design-critique round 2: protect footer links from widget overlap, register the widget's pink as a token"
git push origin main
```

Confirm the push succeeded and paste the output back into the cloud
session. GitHub Pages will redeploy automatically; https://deepelabs.com
should update within a minute or two.
