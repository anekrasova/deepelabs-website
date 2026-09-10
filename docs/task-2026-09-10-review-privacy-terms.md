# Task: review privacy.html and terms.html before app store submission

## Context
The deepelabs.com site is live. privacy.html and terms.html were written
as generic, reasonable starting templates, not tailored to the specific
data practices of Deepe Labs' apps (Deepe in particular), and not legal
advice. Before these URLs go into an Apple Developer Program submission
or a Google Play Console app listing, they need a pass against what the
apps actually do.

This is not something Claude Code should silently rewrite and commit.
The job here is to produce a specific list of open questions and
mismatches for Denis to answer, then apply only the edits he confirms.

## What Deepe (the flagship app) is known to do, from project notes
- Records video (not photos) during pre-trip inspection and cargo checks
- Sends that video/frames to Claude Vision API for analysis against CFR
  393 cargo securement regulations
- Stores data in Cloudflare R2, Postgres via Neon, multi-tenant by
  company (schema-per-tenant)
- Has driver accounts and a company/admin portal
- Produces PDF reports (inspection reports, DVIR-adjacent cargo reports)
  sent to a portal
- Company contact addresses: hello@deepelabs.com (general),
  admin@deepelabs.com (registrations/admin, not public-facing)

## Steps for Claude Code

1. Open privacy.html and terms.html in the repo and read them fully.

2. Check privacy.html section 1 (Information We Collect) against the
   list above. Flag anything Deepe actually collects that isn't
   mentioned (e.g. video specifically, third-party AI processing of
   that video by Claude/Anthropic, company/tenant affiliation, driver
   employment/company data) and anything mentioned that may not apply.

3. Check whether "camera, video, and storage" permission language in
   section 1.2 should explicitly name video recording and cloud storage
   provider categories (no need to name Cloudflare/Neon/Anthropic by
   name unless Denis wants that level of detail, but flag the choice).

4. Check section 3 (How We Share Information) covers the AI processing
   step: video/photo content leaving Deepe Labs' systems to a
   third-party AI provider for analysis is a disclosure that should be
   explicit, not folded silently into "service providers."

5. Check terms.html section 11 (Governing Law) names Utah. Ask Denis to
   confirm this matches Deepe Labs, Inc.'s actual state of incorporation
   (not necessarily where Denis lives or drives) and correct if not.

6. Check both documents' effective dates and contact email
   (hello@deepelabs.com) are still correct.

7. Do NOT commit changes yet. Summarize findings as a numbered list of
   specific questions/discrepancies for Denis, in plain language, and
   wait for his answers before editing privacy.html or terms.html.

8. Once Denis answers, make the corresponding edits, commit with a clear
   message (e.g. "Update privacy/terms to reflect actual Deepe data
   practices"), and push.
