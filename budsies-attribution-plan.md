# Budsies Traffic Classification & Attribution Plan

**Stack:** Magento 2 (backend) + customized Vue Storefront 1 (storefront)
**Scope:** First-touch / last-touch acquisition attribution, normalized into UTM-style fields, with server-side classification.
**Valid as of:** June 2026 (GA4 channel rules current to the May 13, 2026 AI Assistant update).

---

## 1. Architecture principle

**The storefront captures; the server classifies.**

VueStorefront does the minimum: it captures raw acquisition signals into `localStorage` and decides only *whether* a visit should overwrite the stored last touch. It performs **no vocabulary mapping, no source lists, no precedence cascade**. All of that — the heavy classification logic — lives on the server and runs once, authoritatively, when the touch payload arrives.

This split exists for one technical reason: the per-visit overwrite/carry-forward decision is **stateful and time-ordered**, and the server sees nothing until a cart (quote) exists. So the client must hold state across visits, but it does not need to understand it.

Two representations are stored for every touch:

- **`utm_*` (GA4-reconciliation layer)** — constrained to GA4's vocabulary so the same touch produces the same channel in GA4 and in our own reporting.
- **`channel` + metadata (private BI layer)** — richer business distinctions (paid vs organic shopping, AI assistant, source platform), plus confidence and audit fields.

---

## 2. Touch model: two touches only

- **First touch** — the first captured touch, whatever it is (including direct). Write-once; never overwritten within retention.
- **Last touch** — the last *meaningful, non-direct* touch (not the literal last session). Direct never erases a prior meaningful source inside the lookback window (last-non-direct carry-forward).

No third "session touch" field. Two is enough.

---

## 3. Client side (VueStorefront)

### 3.1 Storage

`localStorage` is a **pre-cart capture buffer only** — never the source of truth. Two keys:

- `bd_first_touch` — written once, holds the raw first touch.
- `bd_last_touch` — holds the raw current meaningful touch, updated on qualifying visits.

Each value is a raw, unclassified payload:

```json
{
  "landing_page_url": "https://www.budsies.com/products/petsies?gclid=...",
  "referrer_url": "https://www.google.com/",
  "query_params": { "...all url params, verbatim..." },
  "detected_at": "2026-06-06T12:00:00Z"
}
```

No interpretation happens here. We store what arrived.

### 3.2 The only "logic" on the client: a coarse presence gate

This is **not** classification. It returns one boolean — "did this visit arrive with any acquisition signal?" — using only key-existence checks and one static ignore list.

```js
const CLICK_ID_KEYS = [
  "gclid","gbraid","wbraid","dclid","gad_source","gad_campaignid",
  "msclkid","fbclid","ttclid","li_fat_id","twclid","sccid",
  "epik","rdt_cid","srsltid",
  "irclickid","sscid","awc"
];

// Self, payment, auth, 3DS/ACS — so a checkout bounce isn't logged as a referral
const IGNORE_HOSTS = [
  "budsies.com","www.budsies.com","checkout.budsies.com","petsies.com",
  "paypal.com","stripe.com","checkout.stripe.com","klarna.com",
  "afterpay.com","shop.app","accounts.google.com"
];

function hasAcquisitionSignal(url, referrer) {
  const p = new URL(url).searchParams;
  const anyUtm = p.has("utm_source") || p.has("utm_medium");
  const anyClickId = CLICK_ID_KEYS.some(k => p.has(k));
  let externalRef = false;
  if (referrer) {
    try {
      externalRef = !IGNORE_HOSTS.includes(new URL(referrer).hostname);
    } catch (e) { externalRef = false; }
  }
  return anyUtm || anyClickId || externalRef;
}
```

The lists are small, static, and non-sensitive. The server re-runs the full cascade anyway, so a slightly-wrong gate is self-correcting.

### 3.3 Capture rules per landing

```
on landing (new pageview that enters the site):

  if referrer host ∈ IGNORE_HOSTS:
      do nothing   # same-visit bounce / payment / auth return

  raw = buildRawTouch(url, referrer, now)

  # First touch — write once, even if this landing is direct. Never overwritten.
  if bd_first_touch is empty:
      bd_first_touch = raw

  # Last touch — overwrite only on a meaningful signal.
  # A direct return visit simply does NOT write — that is the carry-forward.
  if hasAcquisitionSignal(url, referrer) AND isNewTouchWindow(raw):
      bd_last_touch = raw
```

`isNewTouchWindow` is derived purely from timestamps — **no `session_id` is stored or tracked**. Treat the touch as new if ≥30 minutes have elapsed since `bd_last_touch.detected_at`, **or** if its `utm_source` / `utm_medium` / `utm_campaign` differ from the stored last touch. Dedup: do not rewrite `bd_last_touch` with an identical `utm_source` / `utm_medium` / `utm_campaign` inside the 30-minute window.

### 3.4 Alternative (zero-classification variant)

If "no logic at all on the client" is a hard principle, replace the two slots with a **capped append-only raw log** (last ~15 touches, deduped by timestamp + identity only — no `session_id`). Ship the whole ordered list at cart creation and let the server compute both first and last touch with carry-forward. Slightly larger payload; the client then carries *zero* attribution knowledge. **Recommended only if the presence gate above is considered unacceptable** — otherwise the two-slot model is simpler.

### 3.5 Submission to the server

```
on cart created  OR  cart already exists:
    POST { first_touch_raw, last_touch_raw } → server

on cart already exists AND a new meaningful touch arrives later:
    POST updated last_touch_raw → server   # preserve reactivation credit
```

Submission is **not** a one-time event at cart creation. Last touch keeps updating on the server until the order is placed, so a returning campaign click before purchase still gets credit.

---

## 4. Server side: classification engine

### 4.1 Input signal set

**Tier A — explicit campaign parameters** (the `utm_*` fields; highest-structured):
`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `utm_id`, and optionally `utm_source_platform`, `utm_creative_format`, `utm_marketing_tactic`.

**Tier B — ad-platform click IDs** (highest trust for *paid*):
`gclid` / `gbraid` / `wbraid` (Google Ads), `dclid` (DV360/Display), `gad_source` / `gad_campaignid` (Google session attributes), `msclkid` (Microsoft), `fbclid` (Meta — see caveat), `ttclid` (TikTok), `li_fat_id` (LinkedIn), `twclid` (X), `sccid` (Snapchat), `epik` (Pinterest), `rdt_cid` (Reddit), `srsltid` (Merchant Center auto-tagging — a Google-organic signal, NOT a reliable shopping indicator; see §4.5), affiliate IDs (`irclickid`, `sscid`, `awc`, `ranMID`, `ranEAID`).

**Tier C — contextual** (only when A and B are absent):
`document.referrer` host + path, landing path, consent state, plus three maintained reference lists: GA4 source-category list (search/social/video/shopping), an AI-assistant referrer list (standalone assistants only), and the self/payment/auth ignore list.

### 4.2 Stored output object (per touch)

```json
{
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "pmax_petsies_us",
  "utm_content": "rsa_ad_3",
  "utm_term": "",
  "utm_id": "1234567890",

  "raw_utm_source": null,
  "raw_utm_medium": null,
  "raw_utm_campaign": "pmax_petsies_us",
  "raw_utm_content": "rsa_ad_3",
  "raw_utm_term": null,
  "raw_utm_id": null,

  "channel": "paid_search",
  "source_platform": "google_ads",

  "click_ids": {
    "gclid": "...", "gbraid": null, "wbraid": null, "dclid": null,
    "msclkid": null, "fbclid": null, "ttclid": null, "srsltid": null
  },

  "classification_method": "google_ads_click_id",
  "classification_confidence": 95,
  "rule_id": "google_ads_gclid",
  "is_inferred": true,
  "is_direct": false,

  "landing_page_url": "...",
  "landing_page_path": "/products/petsies",
  "referrer_domain": "google.com",
  "raw_query_params": { },
  "detected_at": "2026-06-06T12:00:00Z"
}
```

Click IDs live in their own object — **never stuffed into `utm_id`**, which is reserved for the campaign/ad ID cost-join.

The `raw_utm_*` fields hold the inbound values **exactly as received** (`null` when absent), preserved separately because classification can overwrite, normalize, or infer the canonical `utm_*` fields. In the example above, the click arrived auto-tagged (`gclid`) with a manually tagged `utm_campaign` and `utm_content` but no manual `utm_source`/`utm_medium`; classification inferred `utm_source=google` / `utm_medium=cpc` from the `gclid` while `raw_utm_source` / `raw_utm_medium` stay `null` to record that they were not sent. In a conflict case (e.g. `gclid` + `utm_source=facebook`), `utm_source` would resolve to `google` while `raw_utm_source` retains `facebook`.

### 4.3 Canonical vocabularies

**`utm_medium`** — GA4-regex-safe closed list (the channel each produces):
`(none)`→Direct · `organic`→Organic Search · `cpc`→Paid Search (when `utm_source` is a search engine) / Paid Social (when `utm_source` is a social site) · `display`/`cpm`/`banner`→Display · `social`→Organic Social · `paid-social`→Paid Social · `video`→Organic Video · `paid-video`→Paid Video · `email`→Email · `affiliate`→Affiliates · `referral`→Referral · `sms`→SMS · `ai-assistant`→AI Assistant · `push`→Mobile Push.

Shopping is driven by the `utm_campaign` token: `utm_medium=organic` + `utm_campaign` containing `shop`/`shopping` → Organic Shopping; a paid `utm_medium` (`cpc` / `paid-social`) + the same `utm_campaign` token → Paid Shopping. **Do not invent a `utm_medium=organic_shopping`** — it won't bucket natively in GA4. Keep that distinction in `channel`.

**`channel`** (private rollup, closed set): `paid_search`, `paid_shopping`, `paid_social`, `display`, `paid_video`, `organic_search`, `organic_shopping`, `organic_social`, `email`, `sms`, `affiliate`, `influencer`, `referral`, `ai_assistant`, `direct`, `offline`, `internal`, `unknown`.

**`utm_source`** — canonical tokens: `(direct)`, `google`, `bing`, `yahoo`, `duckduckgo`, `facebook`, `instagram`, `tiktok`, `pinterest`, `youtube`, `x`, `reddit`, `linkedin`, `klaviyo`, `attentive`, `impact`, `chatgpt`, `perplexity`, `gemini`, `copilot`, `claude`, plus partner/affiliate domains. Everything resolvable from a referrer host normalizes to one of these.

### 4.4 Classification cascade (first match wins, then stop)

> Notation: the triple `A / B / C` assigns `utm_source` / `utm_medium` / `channel`.

```
0. Hygiene: lowercase + trim all utm_* fields and the referrer host.
   If referrer host ∈ IGNORE_HOSTS → ignore referrer. Strip empty/garbage utm_* values.

1. Click IDs (paid, highest priority)
   gclid|gbraid|wbraid|gad_source|gad_campaignid → google / cpc / paid_search
        (→ paid_shopping only with shopping utm_campaign metadata)
   dclid    → google_dv360 / display / display
   msclkid  → bing / cpc / paid_search
   ttclid   → tiktok / paid-social / paid_social
   li_fat_id→ linkedin / paid-social / paid_social
   epik     → pinterest / paid-social / paid_social
   fbclid   → see §4.5 caveat (defaults to ORGANIC social)

2. Explicit utm_* present → trust them (normalize to canonical tokens)

3. No utm_* , referrer present → classify by host:
   search list   → <engine> / organic            (Organic Search)
   AI list       → <ai> / ai-assistant / (ai-assistant)   (AI Assistant)
   social list   → <site> / social               (Organic Social)
   video list    → <site> / video                (Organic Video)
   shopping list → <site> / referral, utm_campaign="shopping"  (Organic Shopping)
   else          → <host> / referral             (Referral)

4. srsltid present (evaluated AFTER referrer — see §4.5)
   Trust ONLY when referrer is google.* OR missing/empty:
     → google / organic → channel = organic_search
   If referrer is any other external host → ignore srsltid; the referrer
   classification from step 3 wins (srsltid is noise from a copied/shared URL).
   Do NOT classify srsltid as Organic Shopping — it appears on all Google
   organic results, not just product listings.

5. No utm_* , no usable referrer → (direct) / (none)   (Direct)

6. channel resolution: map(utm_source, utm_medium, utm_campaign).
   No match → channel = unknown, log to weekly review queue.
```

### 4.5 GA4-correct specifics (June 2026)

- **AI assistants** use `utm_medium=ai-assistant` and reserved `utm_campaign=(ai-assistant)` — this matches GA4's native AI Assistant channel (live May 13, 2026). Do **not** use `ai` / `ai_assistant`; those land in Unassigned. AI referrer list = **standalone** assistants only: `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`, `grok.com`, `deepseek.com`.
- **AI Overviews / AI Mode are NOT AI Assistant.** They arrive with `google.com` as referrer and are folded into **Organic Search** by GA4 and by us. There is no reliable way to split them out; do not try to route them to the AI channel.
- **`fbclid` is not proof of paid.** Meta appends it to organic *and* paid clicks. Default `fbclid` → **Organic Social** unless a paid `utm_medium` co-occurs. (This single rule prevents the most common Paid Social inflation.)
- **`srsltid` is NOT a free-listing / Organic Shopping signal.** It is a Merchant Center auto-tagging parameter, but since August 2024 Google appends it to *all* Google organic results — blog posts, category pages, homepages — not just product listings, for any site with auto-tagging on. Treat it only as "a Google click on a site with auto-tagging," i.e. default to **Organic Search** (`google / organic`). Trust it only when the referrer is `google.*` or missing; if the referrer is another external host, the URL was likely copied/shared, so ignore `srsltid` and let the referrer win. Classifying every `srsltid` as Organic Shopping would reproduce the exact misattribution bug the SEO community complains about. Also strip `srsltid` for canonicalization/caching so it doesn't fragment internal analytics. To actually isolate free product listings, tag the feed's destination URLs with your own UTMs in Merchant Center instead.

### 4.6 Click-ID + utm_* conflict

When a paid click ID and explicit `utm_*` values both arrive: keep the **paid classification** from the click ID, but let explicit `utm_campaign` / `utm_content` / `utm_id` win for **naming and cost-join granularity** (and preserve the inbound values in `raw_utm_*`). Note this deliberately diverges from GA4's default (manual `utm_*` tags override auto-tagging); the collision is rare, so do not over-engineer it. Document the chosen behavior.

---

## 5. Overwrite & carry-forward rules (server, authoritative)

The server re-applies these even though the client did a coarse pass, because the server holds full history and the canonical timestamps.

**First touch**
```
if first_touch empty → set candidate (whatever it is, including direct)
else → never overwrite (within retention) — even if first_touch is direct
```
First touch is strictly write-once. A direct first visit is recorded as the first touch and is **not** upgraded later, even if a meaningful campaign touch arrives minutes afterward — that later touch flows into last touch instead.

**Last touch**
```
if candidate non-direct and non-internal → overwrite
if candidate direct → overwrite only if last_touch is empty, expired,
                      or itself direct/unknown
```

---

## 6. Persistence & freeze (the part that bites in production)

1. **localStorage is best-effort.** Safari/ITP evicts script-writable storage (including `localStorage`) after ~7 days of inactivity. For Budsies' long, gift-driven consideration cycles, a returning Safari user who hasn't started a cart can lose pre-cart first touch. Treat localStorage strictly as the capture buffer.
2. **Server becomes source of truth at quote creation.** The moment a Magento quote exists, persist first + last touch onto the quote.
3. **(Optional, for true pre-cart durability)** set a first-party identifier **server-side** via `Set-Cookie` from Magento or the edge/CDN at landing — the only thing that survives ITP across long gaps. Heavier; add only if pre-cart durability across weeks is required.
4. **Freeze on the order.** At order placement, snapshot first + last touch into custom `sales_order` attributes. This makes attribution independent of GA4 retention and any later storage/cookie loss, and lets revenue-by-channel be reconciled from the database.
5. **Preserve raw values, not just classified ones.** On both the Magento quote and `sales_order`, store the `raw_utm_*` shadow fields (and the verbatim `raw_query_params` + `referrer_url`) alongside the classified `utm_*` / `channel` values, because classification can overwrite, normalize, or infer the canonical `utm_*` fields. This lets you (a) audit any classified value against exactly what arrived and (b) reclassify history if the rules change later, without losing the original signal.
6. **GA4 + Measurement Protocol.** Forward via dataLayer client-side and Measurement Protocol server-side for confirmed order events.
7. **Consent Mode v2.** If marketing consent is denied, do not persist identifiers; rely on GA4 modeled conversions and keep the consented order-level Magento attribution as the first-party source of truth.

---

## 7. Lookback windows

- **First touch retention: 365 days** (long consideration / gifting cycles).
- **Last touch lookback: 90 days.**
- **Touch window: 30 minutes** — used only to dedup repeat touches and decide overwrites; derived from comparing `detected_at` timestamps, **not** from any stored `session_id`.

These are tuned to Budsies, not GA4. They will *not* reconcile 1:1 with GA4's shorter conversion windows — so also store a GA4-aligned snapshot (≈90-day first / 30-day last) alongside, purely for reconciliation, so the two systems can be compared instead of silently disagreeing.

---

## 8. End-to-end data flow

```
Landing (VSF1)
  → capture raw touch to localStorage (bd_first_touch write-once,
    bd_last_touch on meaningful signal via hasAcquisitionSignal)
Cart created / exists
  → POST raw first + last touch to server
Server
  → run classification cascade → normalized touch objects
  → apply first/last overwrite + carry-forward
  → persist onto Magento quote
Subsequent meaningful touch before order
  → POST → server updates last touch on the quote
Order placed
  → freeze first + last touch onto sales_order custom attributes
  → forward to GA4 (dataLayer + Measurement Protocol), consent permitting
```

---

## 9. Open decisions to confirm before build

1. **First-touch definition: RESOLVED.** First touch = the first captured touch, whatever it is (including direct), write-once and never overwritten within retention. (This matches GA4 `first_user_*` parity rather than a "first non-direct" model.)
2. **Client model:** two-slot + presence gate *(recommended, matches current plan)* vs append-only raw log (zero client classification).
3. **Conflict rule:** confirm paid-signal-from-click-ID + naming-from-UTM, accepting divergence from GA4 default.
4. **Server-side first-party cookie:** build now, or accept best-effort localStorage until a quote exists?
5. **GA4-aligned reconciliation snapshot:** store it, or accept that internal numbers won't match GA4?