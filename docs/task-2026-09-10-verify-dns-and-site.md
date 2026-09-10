# Task: verify deepelabs.com DNS and confirm the live site

## Context
GitHub Pages Settings > Pages already reports "DNS valid for primary" for
deepelabs.com, and Enforce HTTPS is checked. Cloudflare has four A records
at the apex (185.199.108.153, .109.153, .110.153, .111.153), all DNS only,
plus the existing MX record for mail. A `www` CNAME to
anekrasova.github.io may or may not have been added yet (optional).

Browser access to deepelabs.com failed just now with
DNS_PROBE_FINISHED_NXDOMAIN, most likely local DNS cache or propagation
lag rather than a real misconfiguration, since GitHub's own check already
passed. This task confirms which it is.

## Steps for Claude Code to run

1. Query authoritative-ish public resolvers directly, bypassing any local
   cache:
   ```
   dig deepelabs.com A @1.1.1.1
   dig deepelabs.com A @8.8.8.8
   ```
   Expect all four 185.199.10x.153 addresses back from both.

2. If step 1 returns the addresses, the DNS is fine globally and the
   earlier browser error was local caching. Flush local DNS:
   ```
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   ```

3. Confirm the site actually serves content over HTTPS from this machine:
   ```
   curl -sSIL https://deepelabs.com
   ```
   Expect an HTTP 200 (or a redirect chain ending in 200) and a valid TLS
   handshake (curl will error out on a bad cert instead of returning
   headers).

4. If step 1 does NOT return the addresses from one or both resolvers,
   DNS has not propagated yet. Re-run step 1 every few minutes; if it is
   still empty after roughly an hour, go back into Cloudflare and confirm
   the four A records are still present, still typed A (not AAAA or
   CNAME), still proxy status DNS only, and still named for the apex
   (deepelabs.com or @, not www).

5. Optional: if the `www` CNAME (www -> anekrasova.github.io) was added,
   repeat steps 1 and 3 for www.deepelabs.com as well.

## Report back
State plainly whether deepelabs.com currently resolves and loads over
HTTPS from this machine, and whether the earlier browser error was
confirmed as local caching or an actual DNS gap.
