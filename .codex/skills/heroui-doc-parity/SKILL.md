---
name: heroui-doc-parity
description: Enforce strict parity between local component docs and HeroUI upstream docs. Use when editing component documentation and the requirement is to keep section order, demo counts, media patterns, and API coverage aligned 1:1 with HeroUI.
---

# HeroUI Doc Parity

Apply this skill when users require strict 1:1 parity with HeroUI documentation.

## Parity Rules

Follow all rules at the same time:

1. Keep section order identical to HeroUI upstream.
2. Keep subsection names identical (except unavoidable language translation in non-English docs).
3. Keep demo count identical in each subsection.
4. Keep demo arrangement pattern identical (image/text alternation, grouped rows, grid counts).
5. Keep media style pattern identical (image-based vs text-based examples).
6. Keep API coverage identical in scope and order.
7. Include every point HeroUI has.
8. Remove every point HeroUI does not have.
9. Do not add extra sections, extra demos, or optional “helpful” expansions.

## Workflow

1. Fetch HeroUI source files for the target component:
   - `apps/docs/content/docs/components/<component>.mdx`
   - `apps/docs/content/components/<component>/*.raw.jsx`
2. Build a parity checklist from upstream:
   - top-level section order
   - subsection order
   - demo count per subsection
   - API table fields and ordering
3. Edit local docs to match the checklist exactly.
4. Remove local-only extras that are not present upstream.
5. Keep only minimum compatibility notes for unsupported local APIs.
6. Run docs build and ensure no new failures.

## Required Output Style

When reporting completion:

1. State whether parity is exact or list remaining deltas.
2. List changed files.
3. Confirm build verification command and result.
