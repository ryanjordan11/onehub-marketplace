---
name: multi-agent-neon-bento
en_name: "Multi-Agent Neon Bento"
zh_name: "多 Agent 霓虹 Bento"
description: |
  Generate an embeddable multi-agent chat feature section as a neon-framed bento grid:
  animated conic-gradient borders, agent chip switching, OpenRouter / provider multi-select,
  model picker, and a Share-to-community CTA that copies a JSON payload. True-black +
  violet/cyan craft tokens. Self-contained single-file HTML.
en_description: |
  Generate an embeddable multi-agent chat feature section as a neon-framed bento grid:
  animated conic-gradient borders, agent chip switching, OpenRouter / provider multi-select,
  model picker, and a Share-to-community CTA that copies a JSON payload. True-black +
  violet/cyan craft tokens. Self-contained single-file HTML.
zh_description: |
  生成可嵌入的多 Agent 聊天功能区块——霓虹描边 Bento 网格：动画 conic-gradient 边框、
  Agent 芯片切换、OpenRouter / 提供商多选、模型选择器，以及复制 JSON 载荷的社区分享 CTA。
  真黑 + 紫/青 craft token。单文件自包含 HTML。
tags:
  - "bento"
  - "multi-agent"
  - "neon"
  - "openrouter"
  - "composer"
  - "feature-section"
  - "prototype"
  - "dark-theme"
  - "html"
triggers:
  - "multi-agent neon bento"
  - "neon bento grid"
  - "multi-agent composer"
  - "openrouter feature section"
  - "1 bento grid template"
od:
  mode: prototype
  preview:
    type: html
    entry: examples/1-bento-grid-template.html
  category: "prototype"
  scenario: "feature-section"
  example_prompt: "Build a multi-agent neon bento feature section: true-black canvas, animated neon borders, AI workspace composer with Design/Research/Code agents, OpenRouter + provider multi-select, model picker, and Share to community CTA."
---

# Multi-Agent Neon Bento

Produce a **single-file, embeddable feature section** — not a full marketing site and not a
slide deck. The deliverable is a bento-grid product surface for multi-agent chat: composer
hero + feature tiles + community share CTA, all on a true-black neon craft system.

Reference implementation: `examples/1-bento-grid-template.html`.

## Brand / craft tokens (standing visual contract)

Bind these into `:root` on every build. Prefer `oklch()` for surfaces; neon stops may use
hex only as named conic-gradient stops. Do not introduce purple-wash page backgrounds or a
second competing accent system.

```css
:root {
  --bg: oklch(0% 0 0);
  --surface: oklch(12% 0.012 280);
  --surface-2: oklch(16% 0.014 280);
  --fg: oklch(96% 0.01 250);
  --muted: oklch(68% 0.02 250);
  --border: oklch(28% 0.02 280);
  --accent: oklch(68% 0.19 305);
  --accent-cyan: oklch(72% 0.14 230);
  --accent-soft: oklch(55% 0.16 250);

  --font-display: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --font-body: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --font-mono: "SF Mono", ui-monospace, "Cascadia Code", Menlo, monospace;

  --r-lg: 18px;
  --r-md: 12px;
  --r-sm: 8px;
  --r-pill: 999px;
  --gap: 14px;
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);

  /* neon conic stops (animated border only) */
  --neon-a: #a855f7;
  --neon-b: #6366f1;
  --neon-c: #3b82f6;
  --neon-d: #22d3ee;
}
```

Posture rules:
1. **True black canvas** — `--bg` is pure black; surfaces are slightly lifted blue-violets.
2. **One craft language** — neon is for borders / focus rings / active chips, not every fill.
3. **System UI type** — display/body/mono stay in the SF / system stack unless the user supplies a brand face.
4. **Ease-out motion** — use `--ease-out`; enter ~200ms, exit ~140ms; never `ease-in` on UI chrome.
5. **No emoji icons** — use compact SVG strokes (16–20px) for tile glyphs and CTAs.

## Layout contract (bento)

Max content width ~1120px. Section chrome above the grid: mono eyebrow + display `h1` + muted lede.

Grid tiles (adapt labels to inputs, keep the structure):

| Slot | Span | Role |
|------|------|------|
| Composer hero | large / span-hero | Multi-agent chips, neon input, model + send toolbar |
| Agents | mid | Multi-agent feature explainer |
| Routing | mid | OpenRouter + provider chips (multi-select) |
| Models | small | LLM / model picker summary |
| Craft | small-wide | Neon border craft note |
| Share CTA | cta | Community share button + JSON payload copy |

Use CSS grid with explicit `span-*` classes. Every interactive tile that should glow gets
`.neon` (or `.neon-slow` / `.neon-fast`) so the conic border animates.

## Neon border technique (required craft)

Use `@property --neon-angle` + a rotating conic-gradient mask (or dual-layer pseudo
elements) so the border is continuous and animates. Focused composer input uses the same
neon language (animated ring), not a generic blue outline.

```css
@property --neon-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
```

## Interaction (P0)

Ship working JS in the same file:

1. **Agent chips** — toggle `aria-pressed`; support multi-select; allow “add agent” up to a
   small demo cap with a toast when full.
2. **Model picker** — dropdown listbox + optional quick-model rows; update a visible model label.
3. **Provider chips** — multi-select OpenRouter / Anthropic / OpenAI / Google-style providers.
4. **Send** — toast or status that reflects active agents + selected model (no real network).
5. **Share to community** — build a JSON payload and copy to clipboard (with fallback), then
   update share meta text. Payload shape:

```json
{
  "template": "1-bento-grid-template",
  "agents": ["Design", "Research"],
  "model": "claude-sonnet-4",
  "providers": ["OpenRouter"]
}
```

Use `data-od-id` attributes on major regions (section, grid, composer, tiles, CTA) so the
host can inspect / annotate.

## Workflow

### Step 0 — Lock inputs
Default agents: Design, Research, Code. Default model: `claude-sonnet-4` (or user input).
Product name defaults to “AI workspace composer”. Audience defaults to AI product teams.

### Step 1 — Structure first
Write section head + bento shell + tile skeleton before dense CSS polish. Keep the hero
composer interactive markup complete (chips, textarea, toolbar).

### Step 2 — Craft pass
Bind `:root` tokens, neon borders, tile surfaces, mono labels, display titles. One accent
family only. No Inter/Roboto/Fraunces as display faces; system stack is intentional here.

### Step 3 — Wire interactions
Agent toggle, model menu, provider multi-select, send toast, share clipboard. Prefer
vanilla JS; no external CDN deps.

### Step 4 — Self-check
- Single complete `<!doctype html>` document.
- No purple gradient page wash; neon limited to borders / active states.
- No emoji icons; SVG only.
- All P0 interactions work without a network.
- Tokens live in `:root`; no random hex drift on surfaces.
- Responsive: grid collapses gracefully under ~900px.

### Step 5 — Deliver
Write the standalone HTML artifact. Stop. For packaging / catalog flows, point the user at
in-app Design Files buttons — do not invent freeform publish shell sequences.

## Anti-slop (hard)

- No emoji as feature icons.
- No gradient wash on every background.
- No rounded card + left color-border accent as the only tile pattern.
- No invented metrics or fake “users” counts.
- No Inter / Roboto / Arial / Fraunces as display faces for this craft system.
- Missing real product copy → honest short placeholder, not lorem or fake stats.

## Example prompt

> Build a multi-agent neon bento feature section: true-black canvas, animated neon borders,
> AI workspace composer with Design / Research / Code agents, OpenRouter + provider
> multi-select, model picker, and a Share to community CTA.
