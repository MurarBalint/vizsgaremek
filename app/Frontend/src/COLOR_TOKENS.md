# Color Token Reference

This document describes the semantic color tokens used throughout the VizsgaRemek frontend.
All tokens are defined in `src/styles.css` and are available as Tailwind utility classes.

---

## Primary Scale (Red)

Replaces direct `red-*` Tailwind classes. Use for main UI surfaces, backgrounds, and borders.

| Token             | Tailwind Class       | Value (OKLCH)                  | Hex Equivalent |
|-------------------|----------------------|--------------------------------|----------------|
| `--primary-50`    | `bg-primary-50`      | `oklch(0.971 0.013 17.38)`     | `#fef2f2`      |
| `--primary-100`   | `bg-primary-100`     | `oklch(0.936 0.032 17.717)`    | `#fee2e2`      |
| `--primary-200`   | `bg-primary-200`     | `oklch(0.885 0.062 18.334)`    | `#fecaca`      |
| `--primary-300`   | `bg-primary-300`     | `oklch(0.808 0.114 19.571)`    | `#fca5a5`      |
| `--primary-400`   | `bg-primary-400`     | `oklch(0.704 0.191 22.216)`    | `#f87171`      |
| `--primary-500`   | `bg-primary-500`     | `oklch(0.637 0.237 25.331)`    | `#ef4444`      |
| `--primary-600`   | `bg-primary-600`     | `oklch(0.577 0.245 27.325)`    | `#dc2626`      |
| `--primary-700`   | `bg-primary-700`     | `oklch(0.505 0.213 27.518)`    | `#b91c1c`      |
| `--primary-800`   | `bg-primary-800`     | `oklch(0.444 0.177 26.899)`    | `#991b1b`      |
| `--primary-900`   | `bg-primary-900`     | `oklch(0.396 0.141 25.723)`    | `#7f1d1d`      |
| `--primary-950`   | `bg-primary-950`     | `oklch(0.258 0.092 26.042)`    | `#450a0a`      |

All modifiers work: `text-primary-*`, `border-primary-*`, `hover:bg-primary-*`, `focus:ring-primary-*`, etc.

---

## Accent Scale (Rose)

Replaces direct `rose-*` Tailwind classes. Use for secondary surfaces, form inputs, and highlights.

| Token            | Tailwind Class      | Value (OKLCH)                  | Hex Equivalent |
|------------------|---------------------|--------------------------------|----------------|
| `--accent-50`    | `bg-accent-50`      | `oklch(0.969 0.015 12.422)`    | `#fff1f2`      |
| `--accent-100`   | `bg-accent-100`     | `oklch(0.941 0.03 12.58)`      | `#ffe4e6`      |
| `--accent-200`   | `bg-accent-200`     | `oklch(0.892 0.058 10.001)`    | `#fecdd3`      |
| `--accent-300`   | `bg-accent-300`     | `oklch(0.81 0.117 11.638)`     | `#fda4af`      |
| `--accent-400`   | `bg-accent-400`     | `oklch(0.712 0.194 13.428)`    | `#fb7185`      |
| `--accent-500`   | `bg-accent-500`     | `oklch(0.645 0.246 16.439)`    | `#f43f5e`      |
| `--accent-600`   | `bg-accent-600`     | `oklch(0.586 0.253 17.585)`    | `#e11d48`      |
| `--accent-700`   | `bg-accent-700`     | `oklch(0.514 0.222 16.935)`    | `#be123c`      |
| `--accent-800`   | `bg-accent-800`     | `oklch(0.455 0.188 13.697)`    | `#9f1239`      |
| `--accent-900`   | `bg-accent-900`     | `oklch(0.41 0.159 10.272)`     | `#881337`      |
| `--accent-950`   | `bg-accent-950`     | `oklch(0.271 0.105 12.094)`    | `#4c0519`      |

All modifiers work: `text-accent-*`, `border-accent-*`, `hover:bg-accent-*`, etc.

---

## Brand Colors

Named tokens for specific brand hex values used in avatar hover cards and UI highlights.

| Token               | Tailwind Class       | Value     | Usage                                    |
|---------------------|----------------------|-----------|------------------------------------------|
| `--brand`           | `bg-brand`           | `#ff3b3b` | Main brand red (buttons, highlights)     |
| `--brand-hover`     | `hover:bg-brand-hover` | `#cc2f2f` | Hover state for brand elements         |
| `--brand-light`     | `bg-brand-light`     | `#e96266` | Lighter brand red (login/register bg)    |
| `--brand-bg`        | `bg-brand-bg`        | `#1a0f10` | Dark card/panel backgrounds              |
| `--brand-bg-deep`   | `bg-brand-bg-deep`   | `#150a0c` | Deeper dark inset backgrounds            |
| `--brand-border`    | `border-brand-border`| `#3a1b1d` | Dark borders on brand backgrounds        |
| `--brand-inset`     | `bg-brand-inset`     | `#150a0c` | Inset panel backgrounds                  |

Also available as: `text-brand`, `border-brand`, etc.

---

## Shadcn/UI Tokens (unchanged)

The following base tokens are provided by the shadcn/ui design system and remain unchanged:

- `bg-primary` / `text-primary` — single-value primary color (no scale)
- `bg-secondary` / `text-secondary` — single-value secondary color
- `bg-accent` / `text-accent` — single-value accent color (grey in light mode)
- `bg-destructive` — destructive action color
- `bg-muted` / `text-muted-foreground` — muted surfaces and text

> **Note:** `bg-accent` (without number suffix) maps to the shadcn grey accent, while `bg-accent-*` (with number suffix, e.g., `bg-accent-200`) maps to the rose color scale defined above. They do not conflict.

---

## Usage Examples

```tsx
// Background
<div className="bg-primary-100">...</div>
<div className="bg-accent-50">...</div>

// Text
<p className="text-primary-900">...</p>
<span className="text-primary-600">...</span>

// Border
<div className="border border-primary-400">...</div>

// Interactive
<button className="bg-primary-400 hover:bg-primary-500">...</button>

// Brand elements
<div className="bg-brand-bg border border-brand-border text-brand">...</div>
```

---

## Customisation

To remap the color scales (e.g., switch primary from red to blue), update the CSS variables in `src/styles.css` under `:root`:

```css
:root {
  --primary-50: oklch(...);   /* replace with your color */
  --primary-100: oklch(...);
  /* ... */
}
```

Dark mode overrides can be added to the `.dark` selector in the same file.
