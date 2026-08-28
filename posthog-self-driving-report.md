# PostHog Self-driving setup report

## Summary

PostHog Self-driving was fully configured for **dev-events**, a Next.js developer event discovery hub. Session Replay, Error Tracking, and Support products were enabled, six native signal sources were wired up, and the scout troop was tuned to four active scouts. Two Replay Vision scanners were created to watch the home page for breakage and user frustration. Findings will start appearing in the Self-driving inbox at https://us.posthog.com/project/581773/inbox within ~30 minutes.

---

## AI data processing

**Approved.** Organization-level AI data processing consent was granted before this run.

---

## GitHub

**Connected during this run.** GitHub App integration for `bhupeshmunda` was installed and verified (integration id: 257329). Self-driving can now research findings against the repo and open draft fixes.

---

## Products enabled

| Product | Result | Notes |
|---|---|---|
| Session Replay | **Already enabled** | Server-side toggle was already on. `posthog.init` in `instrumentation-client.ts` has no `disable_session_recording` override — clean. |
| Error Tracking | **Already enabled** | Server-side toggle was already on. `capture_exceptions: true` is explicitly set in `instrumentation-client.ts`. |
| Support (Conversations) | **Enabled during this run** | Product is now on, but tickets only arrive once an inbound channel is connected. See follow-ups. |

---

## Signal sources

| source_product | source_type | Action |
|---|---|---|
| `signals_scout` | `cross_source_issue` | **On by default** — no row needed; scout gate is always active |
| `health_checks` | `health_issue` | **Enabled** (id: 01a04732-cd22-7ec3-8d26-f016acaddd1d) |
| `error_tracking` | `issue_created` | **Enabled** (id: 01a04732-d073-7161-9331-9a445d13dde6) |
| `error_tracking` | `issue_reopened` | **Enabled** (id: 01a04732-d5c0-7431-a7bd-17dd03870ef7) |
| `error_tracking` | `issue_spiking` | **Enabled** (id: 01a04732-d874-75dc-9028-9d651e2004e9) |
| `session_replay` | `session_analysis_cluster` | **Enabled** (id: 01a04732-dd44-7aa0-bd60-66fdcf26010c) — default 10% sample rate |
| `conversations` | `ticket` | **Enabled** (id: 01a04732-dfa2-7f36-884f-18b1f10616d8) — dormant until a channel is connected |
| `llm_analytics` | — | **Skipped** — internal source, not a user-facing responder |
| `logs` | — | **Skipped** — not a v1 responder |
| `replay_vision` | — | **Skipped** — Replay Vision scanners are self-authorizing via `emits_signals` flag |

---

## Connected tools

No external tools were selected. All connected-tool sources (GitHub Issues, Linear, Jira, Sentry, Zendesk, etc.) were skipped — the question was cancelled, treated as "None of these."

If you later connect an issue tracker or support desk, you can add the corresponding source at https://us.posthog.com/project/581773/pipeline/new/source.

---

## Scout troop

**Run budget:** 100 runs/day (early access default). 0 runs used today. Banner: "Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more."

### Enabled (4)

| Scout | What it watches |
|---|---|
| `signals-scout-general` | Cross-product correlations and surfaces no specialist covers |
| `signals-scout-product-analytics` | Funnels, retention, lifecycle flows — fires when a conversion or retention rate slides while entrants hold |
| `signals-scout-web-analytics` | Per-channel session volume, attribution breakage, and landing-page health (bounce/404 steps) |
| `signals-scout-web-vitals` | LCP, INP, CLS, FCP per page against Google thresholds and the site's own history |

### Disabled (23)

| Scout | Reason |
|---|---|
| `signals-scout-error-tracking` | Covered by native error tracking source (issue_created, issue_reopened, issue_spiking) |
| `signals-scout-session-replay` | Covered by native session_replay source (session_analysis_cluster) |
| `signals-scout-feature-flags` | No feature flags in use — re-enable if you add flags |
| `signals-scout-experiments` | No A/B experiments in use — re-enable if you run experiments |
| `signals-scout-surveys` | No surveys in use — re-enable if you add surveys |
| `signals-scout-revenue-analytics` | No payment SDK or revenue data detected |
| `signals-scout-ai-observability` | No LLM SDK or `$ai_*` events detected |
| `signals-scout-logs` | PostHog logs product not in use — re-enable if you add it |
| `signals-scout-csp-violations` | No CSP reporting configured |
| `signals-scout-customer-analytics` | No group/accounts analytics (B2B) in use |
| `signals-scout-data-pipelines` | No CDP destinations, exports, or hog flows configured |
| `signals-scout-data-warehouse` | No data warehouse sources connected |
| `signals-scout-apm` | No distributed tracing (OpenTelemetry) in use |
| `signals-scout-conversations` | Conversations product just enabled; no ticket data yet — enable later once tickets start arriving |
| `signals-scout-replay-vision` | No Replay Vision observations accumulated yet (scanners created this run, no prior data) |
| `signals-scout-anomaly-detection` | Disabled in favor of focused specialist coverage |
| `signals-scout-observability-gaps` | Disabled — enable once the project has more event coverage |
| `signals-scout-health-checks` | Disabled in favor of the health_checks native source |
| `signals-scout-inbox-validation` | Not appropriate for a fresh setup with no resolved reports yet |
| `signals-scout-insight-alerts` | No insight alerts configured |
| `signals-scout-mcp-tool-calls` | No `$mcp_tool_call` telemetry in this project |
| `signals-scout-skills-store` | Not relevant for this project |
| `signals-scout-tasks` | Disabled — enable if you use PostHog Tasks |

---

## Custom scouts

**None created.** The user declined the one candidate proposed (event engagement watcher). The built-in troop covers this project's main surfaces.

**Candidate considered and ruled out at proposal:**

- **Event engagement watcher** — would have watched `explore_clicked` and `event_card_clicked` event ratios relative to pageviews. The filter that ended it: the user declined at the proposal step. Surface remains as a report note — if engagement drops go undetected over time, consider enabling this later. If a scout turns noisy, set `emit: false` on its config in PostHog to switch to dry-run.

---

## Replay Vision scanners

Replay Vision scanners are LLMs that watch individual session recordings on a schedule and push what they find directly to the Self-driving inbox. Each observation arrives at half weight — two independent observations of the same defect are needed before it's promoted into a report. No recordings exist yet; both scanners are armed and will start working the day recordings begin. Credit spend is currently 0 (estimated 0 monthly credits at zero recordings); the `creating-replay-vision-scanners` in-product sizing skill was unavailable so spend was not pre-verified.

| Scanner | Type | Query scope | Sample rate | Status | Notes |
|---|---|---|---|---|---|
| **Dev events page breakage** | monitor | Sessions on `$pathname = /` (home page) | 50% | **Created** (id: 01a04755-6a7b-7218-904c-e786c818fd12) | Watches for broken layouts, blank event cards, unresponsive buttons, and the animated background obscuring content. Home page is the only current page and the core completion surface. |
| **Dev events browsing frustration** | monitor | Sessions with `$rageclick` events | 100% | **Created** (id: 01a04755-7780-7be7-ab35-c48ecc247e6a) | Watches for users repeatedly clicking unresponsive event cards or the Explore button, hunting for filtering that doesn't exist, or abandoning the page. |

---

## Follow-ups

- [ ] **Connect a Conversations channel.** Support (Conversations) is enabled but needs an inbound channel (email, inbox, or Slack) before tickets start arriving in the inbox. Go to PostHog → Support to connect one.
- [ ] **Enable an issue tracker (optional).** No external issue tracker was connected during setup. Visit https://us.posthog.com/project/581773/pipeline/new/source to add GitHub Issues, Linear, Jira, or others if you use them.
- [ ] **Create saved funnels/retention insights.** The `signals-scout-product-analytics` scout watches *saved* PostHog insights. Save a funnel from `explore_clicked → event_card_clicked` in PostHog to give it something to monitor.
- [ ] **Verify spend when recordings arrive.** The Replay Vision sizing skill was unavailable during setup. Once recordings start flowing, check the scanner credit estimates in PostHog → Replay Vision → Scanners and set a `credit_limit` if needed.
- [ ] **Re-enable scouts as the product grows.** When you add feature flags → enable `signals-scout-feature-flags`; A/B experiments → `signals-scout-experiments`; surveys → `signals-scout-surveys`; PostHog logs → `signals-scout-logs`.

---

## What happens next

The scout coordinator picks up the freshly enabled configs within ~30 minutes and begins running the four active scouts on their daily cadence (each drawing one run from the 100/day budget). Error tracking issues, session replay clusters, and health issues will route to the inbox automatically as they occur. Replay Vision scanners will start observing recordings the day sessions begin. Immediately-actionable findings can trigger coding tasks from the inbox.

**Inbox:** https://us.posthog.com/project/581773/inbox
