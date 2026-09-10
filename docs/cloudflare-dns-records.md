# DNS records to add in Cloudflare for deepelabs.com -> GitHub Pages

Add these in the Cloudflare dashboard, DNS tab, for the deepelabs.com zone.

## Apex domain (deepelabs.com)

Four A records, all named "@" (root):

| Type | Name | Content          | Proxy status |
|------|------|------------------|--------------|
| A    | @    | 185.199.108.153  | DNS only     |
| A    | @    | 185.199.109.153  | DNS only     |
| A    | @    | 185.199.110.153  | DNS only     |
| A    | @    | 185.199.111.153  | DNS only     |

Optional, for IPv6:

| Type | Name | Content                  | Proxy status |
|------|------|--------------------------|--------------|
| AAAA | @    | 2606:50c0:8000::153      | DNS only     |
| AAAA | @    | 2606:50c0:8001::153      | DNS only     |
| AAAA | @    | 2606:50c0:8002::153      | DNS only     |
| AAAA | @    | 2606:50c0:8003::153      | DNS only     |

## www subdomain (optional, redirects to apex)

| Type  | Name | Content                       | Proxy status |
|-------|------|--------------------------------|--------------|
| CNAME | www  | anekrasova.github.io          | DNS only     |

## Important: keep proxy off (grey cloud) at first

Set every one of these records to "DNS only" (grey cloud), not "Proxied"
(orange cloud), while GitHub issues the TLS certificate for the domain.
Cloudflare's proxy in front of GitHub Pages commonly breaks certificate
validation and causes redirect loops. Once the repo's Settings > Pages
screen shows the certificate as active and "Enforce HTTPS" is checked,
proxying can be turned on if desired, but DNS only is the safer default
and fine to leave permanently.

## Steps

1. Add the four A records above (and AAAA if desired) in Cloudflare.
2. Push the CNAME file already added at the repo root (contains
   "deepelabs.com").
3. In the GitHub repo, Settings > Pages, enter "deepelabs.com" under
   Custom domain, Save.
4. Wait for DNS to propagate (usually minutes, can take up to 24h) and
   for GitHub to show the certificate as issued.
5. Check "Enforce HTTPS" once available.
