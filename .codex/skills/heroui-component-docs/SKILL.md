---
name: heroui-component-docs
description: Ensure every new component includes docs in both languages and is listed in the docs sidebar.
---

# HeroUI Vue Component Docs

Apply this skill when adding a new component package.

## Requirements

1. Add docs files at `docs/en/components/<component>.md` and `docs/zh/components/<component>.md`.
2. Include Installation and Import sections matching existing component doc style.
3. Add at least one Usage example and cover the key props/variants for the component.
4. Update `docs/.vitepress/config.ts` to add the component to both the English and Chinese sidebars.
