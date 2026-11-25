<script setup>
import { Link } from "@heroui-vue/link"
</script>

# Introduction

HeroUI Vue is a Vue 3 component library based on [@heroui/theme](https://npmx.dev/package/@heroui/theme). It targets [HeroUI v2](https://v2.heroui.com) and provides a modern, typed set of components.

HeroUI Vue is an independent hobby project started by an individual and is not affiliated with HeroUI Inc.

## Components

HeroUI Vue is still in its early stages. The initial goal is to migrate all HeroUI components and bring each migrated component to a minimum level of usability. A component is considered minimally usable when it can render the examples in the HeroUI component documentation correctly and consistently.

Component development priorities are based on the component's characteristics. Purely visual components are usually implemented first because they are relatively simple. The current priorities, from highest to lowest, are:

- Purely visual components
- Form components
- Highly interactive components
- Hierarchical components

The complexity of a component's examples also affects its priority. For example, work may be postponed if an example depends on other complex components.

During development, components are maintained as independent packages so they can be built and published separately. From a user's perspective, this means components can be installed on demand. For more information, see [Quick Start](/en/guide/quick-start) and the documentation for each component.

## Documentation

Component examples are kept consistent with the HeroUI documentation because this is important for validating the components. More detailed reference sections—such as props, slots, and attributes—may differ. Some differences come from Vue and React having different conventions, but most are trade-offs made during early development. Time and effort are limited, so they need to be focused on component implementation. Most component documentation has been written with AI assistance and may contain inaccuracies. For component APIs, refer to the component's type definitions.

In the future, we plan to migrate source comments and generate documentation with tooling. This should improve consistency and accuracy with HeroUI while reducing maintenance effort.

## Playground

HeroUI Vue provides a playground similar to [Vue Playground](https://play.vuejs.org), with `heroui-vue` built in so you can try the available components.

[Try it online](https://play.heroui.hotdogc.org/)

::: warning Notice
The HeroUI Vue Playground is temporarily unavailable due to some issues. We plan to improve it in the future.
:::

## Contributing

If you're interested in HeroUI Vue, contributions, suggestions, and bug reports are welcome.
