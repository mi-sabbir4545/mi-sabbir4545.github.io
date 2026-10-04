# SEO playbook — "QA Automation & Security Testing Engineer, Bangladesh"

Everything in `site/` is on-page SEO and deploys automatically. This file covers the
**off-site** work: backlinks, guest posts, Reddit and Quora. Only you can do it, from
your own accounts. It is not deployed.

## Target keywords (in priority order)

1. **QA automation and security testing engineer** (main)
2. **QA automation engineer Bangladesh**, **security testing engineer Bangladesh**, **SQA engineer Dhaka**
3. **Moinul Islam QA** / **Moinul Islam security tester** (your name; easiest to rank #1)
4. Long-tail, matching the articles: *IDOR testing checklist*, *security testing in CI pipeline*,
   *QA automation career Bangladesh*

Use the **same title everywhere** (LinkedIn headline, GitHub bio, dev.to, Medium, Quora
credential): `QA Automation & Security Testing Engineer · Dhaka, Bangladesh`. When the same
title shows up on many sites, Google and AI assistants treat it as a confirmed fact about you.

## Week 1: profiles that link back to you (easy backlinks)

Put `https://moinulislam.pages.dev/` in the website field of each profile:

- [ ] Google Search Console: submit `sitemap.xml`, then request indexing for `/blog/` and each article
- [ ] Bing Webmaster Tools: submit the sitemap, then use URL Inspection → Request indexing
- [ ] LinkedIn: website field, headline, and add the three articles under *Featured*
- [ ] GitHub: profile website plus a profile README (`mi-sabbir4545/mi-sabbir4545`) linking to the site and blog
- [ ] dev.to, Hashnode, Medium: create profiles (used for cross-posting below)
- [ ] Stack Overflow, Ministry of Testing (club.ministryoftesting.com), TryHackMe, HackTheBox, PortSwigger profile
- [ ] Bug bounty profiles (HackerOne / Bugcrowd / Intigriti): only if you're active there
- [ ] Bangladeshi: BDJobs profile, and local QA / security Facebook groups and meetups (share articles once you're an active member)

## Cross-posting articles (safe "duplicate" with canonical)

Republish each blog article on **dev.to**, **Hashnode** and **Medium** **one week after** it's
live on the site. Always set the canonical URL to the original article:

- dev.to: put `canonical_url: https://moinulislam.pages.dev/blog/<slug>/` in the front matter
- Hashnode: Article settings → "Are you republishing?" → original URL
- Medium: Import story (medium.com/p/import). It sets the canonical automatically

This gives you a backlink and readers on each platform, and Google still ranks your site as the original.

## Guest posts (higher-value backlinks)

Pitch an **original** article (not a copy of a blog post). Targets that accept testing or
security writing from community authors:

- Ministry of Testing: community articles
- Testing-focused blogs that publish guest authors (search: `"write for us" software testing`,
  `"write for us" API testing`, `"guest post" QA automation`)
- Bangladeshi tech blogs and publications (search: `"write for us" Bangladesh tech`)

Avoid sites that charge for guest posts or are obvious link farms. Google can penalize
paid links, and one good link from a real testing site is worth more than 50 spammy ones.

Pitch template:

> Subject: Guest article idea — testing access control (IDOR) as part of QA automation
>
> Hi <name>, I'm Moinul Islam, a QA automation and security testing engineer in Dhaka,
> Bangladesh (https://moinulislam.pages.dev/). I'd like to write an original piece for
> <site> on <topic>. Outline: <3 bullets>. Around 1,200 words, with code examples.
> Some of my recent writing: https://moinulislam.pages.dev/blog/. Thanks!

Article ideas for guest posts: *Using Playwright's API testing for security regression tests*;
*What QA engineers miss about JWT testing*; *Load testing with k6 and Grafana: a starter setup*;
*AI-assisted test design with Claude Code: what works and what doesn't*.

## Reddit (help first, link second)

Reddit bans accounts that drop links. Rules that keep you safe:

- Spend 2–3 weeks writing helpful comments in r/QualityAssurance, r/softwaretesting,
  r/Playwright, r/bugbounty, r/AskNetsec and r/bangladesh before you post any link.
- Keep links to roughly 1 in 10 of your posts, and only where the link actually answers the question.
- Read each subreddit's rules on self-promotion first.

Draft post (r/QualityAssurance or r/softwaretesting, as a text post):

> **Title:** How I add basic security checks to a normal QA automation suite (IDOR, auth, headers, ZAP)
>
> I'm a QA automation engineer who also does security testing. The biggest win for us was
> treating a few security checks as ordinary tests instead of a separate "security phase":
>
> 1. Two test users with separate data → one test per API resource that asserts user A gets
>    403/404 on user B's object (IDOR / BOLA).
> 2. Auth tests: no token, expired token, tampered signature → 401.
> 3. Assert security headers (CSP, nosniff, HSTS).
> 4. Non-blocking OWASP ZAP baseline scan against staging in CI; make it blocking once triaged.
> 5. Every security bug found manually becomes a regression test.
>
> I wrote it up with Playwright code and the GitHub Actions job here: <link>. Curious what
> others run in CI. Does anyone make ZAP blocking from day one?

## Quora (answer existing questions)

Search Quora for questions like *How do I become a QA automation engineer in Bangladesh?*,
*How do I start security testing as a QA?*, *What is IDOR?* and *Is software testing a good career
in Bangladesh?* Write a full answer (300+ words) that makes sense without clicking anything, and
put the link at the end as "I wrote a longer roadmap here: <link>". Set your Quora credential to
the standard title above.

## Using AI for organic SEO (without spam)

- Use Claude or other AI to outline, check facts and edit articles, but write from your own
  experience. Google ranks "experience" content, and AI assistants (ChatGPT, Perplexity,
  Claude) cite pages that give clear, specific answers.
- `site/llms.txt` already describes you for AI assistants. Add each new article to it.
- Aim for **one article every 2–4 weeks**. Each one should answer a real question testers search
  for. To publish one, copy an existing `site/blog/<slug>/index.html`, then update the
  blog index, the homepage *Writing* list, `sitemap.xml`, `blog/feed.xml`, `llms.txt` and
  `BLOG_PAGES` in `tests/portfolio.spec.js`.

## Biggest single upgrade: a custom domain

A `*.pages.dev` subdomain works, but your own domain (e.g. `moinulislam.dev` or
`moinulislam.com`, roughly $10–15/year) builds authority that stays yours. Add it in Cloudflare →
Workers & Pages → moinulislam → Custom domains, then update the canonical URLs, sitemap and
Search Console.

## Realistic expectations

- Searches for your **name**, and for *your name + QA / security*, should show you in the top
  results within weeks of indexing.
- *QA automation and security testing engineer Bangladesh* is a niche phrase, so you can rank
  for it within a few months if you get backlinks and keep publishing.
- Broad terms like *QA expert* or *security testing expert* are dominated by companies and large
  sites. Nobody can guarantee a top ranking for those. Long-tail articles plus a consistent
  identity are the realistic way to get there.
