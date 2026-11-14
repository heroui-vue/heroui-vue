# HeroUI Vue Components

The direct subdirectories within this directory generally represent collections of files for individual components (with the exception of the `shared` and `copy` directories). These are referred to as "component directories."

Each component directory functions as a standalone `TypeScript` and `Vue 3.5+` project, bundled using `tsdown`. All such component directories are registered in the `pnpm-workspace.yml` file located at the root, allowing them to be installed within one another via `pnpm add --workspace`. For a better understanding of the properties and structure of these directories, the `avatar` directory serves as a good example.

It is assumed that you are already proficient in `TypeScript` and `Vue 3.5+`. If you encounter errors, please attempt to resolve them yourself—if you are still unable to fix an issue after more than three attempts, please submit a report via a [GitHub Issue](https://github.com/heroui-vue/heroui-vue/issues).

## Getting Started

Before creating a new component directory, ensure you set up the complete directory structure, including the following essential files:

- package.json
- index.ts
- tsconfig.json
- tsdown.config.ts

A `src` directory is also required; it serves as the entry point for the component.

### package.json

The content is largely similar to that of other component directories. Pay special attention to fields related to the component's identity, such as `name` and `keywords`. #### `scripts` Field

Below is the `scripts` field from the `avatar` component's `package.json`:

```json
"scripts": {
"dev": "pnpm build:workspace && tsdown -w",
"build": "pnpm build:workspace && pnpm type:check && tsdown --minify",
"build:check": "pnpm build:workspace && pnpm type:check && tsdown",
"build:workspace": "pnpm -w build:shared && pnpm -w build:icon",
"type:check": "vue-tsc --noEmit --isolatedDeclarations false",
"bump": "pnpm build && bumpp --tag @heroui-vue/avatar@ --sign"
},
```

Pay attention to the `--tag` argument in the `bump` script; the rest can be reused as-is. Additionally, you should avoid invoking the `bump` script.

To build a component from anywhere in the repository, you should register its build command in the root `package.json`'s `scripts` section. For example, for the `avatar` component:

```json
"build:avatar": "pnpm --filter \"./packages/components/avatar\" build",
```

#### `devDependencies` Field

Every component should include the following dependencies:

```json
"devDependencies": {
"@heroui-vue/icon": "workspace:*",
"@heroui-vue/shared": "workspace:*",
"@heroui/theme": "catalog:prod",
"unplugin-vue": "catalog:prod",
"vue": "catalog:prod"
}
```

In addition, you may install `@vueuse/core@catalog:prod` if needed—for instance, when you require "use" hooks similar to those in HeroUI. In such cases, assume that a functionally equivalent hook exists in VueUse and add a `TODO` comment to alert me, rather than spending time verifying whether that specific hook is actually provided by VueUse. ### index.ts

Export components and hooks from the `src` directory.

### tsconfig.json

Please use the following configuration exactly as provided:

```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {},
  "include": ["src/**/*", "src/**/*.vue"],
  "exclude": ["dist", "node_modules"]
}
```

### tsdown.config.ts

Please use the following configuration exactly as provided:

```ts
import { defineConfig, type UserConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

const config: UserConfig = defineConfig({
  entry: "index.ts",
  plugins: [vue({ isProduction: true })],
  deps: {
    neverBundle: ["vue", "@heroui/theme"],
  },
  dts: {
    vue: true,
    eager: true,
  },
});

export default config;
```

## Writing Components

Locate the directory named `heroui` by searching upwards from the current directory; this is a Node.js project containing a `package.json` file. Do not attempt to search for information about `heroui` online. This project follows the same file structure for components as `heroui`, specifically under the path `packages/components`. For component naming conventions, please refer to `avatar`.

### use Hook

Define two namespaces: `Props` and `Return`. The `Props` namespace must include at least the `Option` and `Variant` interfaces, while the `Return` namespace must include at least the `Option` and `Slot` interfaces. Infer the types based on the input parameters and return values ​​of the corresponding `heroui` component's `use` hook. #### `Props`

Take the `useAvatar` parameter `originalProps` in `use-avatar.ts` as an example:

````ts
interface Props extends HTMLHeroUIProps<"span"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLSpanElement | null>;
  /**
   * Ref to the Image DOM node.
   */
  imgRef?: ReactRef<HTMLImageElement>;
  /**
   * The name of the person in the avatar. -
   * if **src** has loaded, the name will be used as the **alt** attribute of the **img**
   * - If **src** is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   *Image source.
   */
  src?: string;
  /**
   * Image alt text.
   */
  alt?: string;
  /*
   * Avatar icon.
   */
  icon?: React.ReactNode;
  /**
   * Whether the avatar can be focused.
   * @default false
   */
  isFocusable?: boolean;
  /**
   * If `true`, the fallback logic will be skipped.
   * @default false
   */
  ignoreFallback?: boolean;
  /**
   * If `false`, the avatar will show the background color while loading.
   */
  showFallback?: boolean;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Custom fallback component.
   */
  fallback?: React.ReactNode;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * The component used to render the image.
   * @default "img"
   */
  ImgComponent?: React.ElementType;
  /**
   * Props to pass to the image component.
   */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  /**
   * Classname or List of classes to change the classNames of the avatar.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Avatar classNames={{
   *    base:"base-classes",
   *    img: "image-classes",
   *    name: "name-classes",
   *    icon: "icon-classes",
   *    fallback: "fallback-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AvatarSlots>;
}
````

#### `Props.Option`

Excluding `ref`, we need to map several React types to their Vue equivalents:

- `React.ReactNode`: Corresponds to a Vue slot; it does not need to be declared in `props`, but should be declared—where appropriate—within the return namespace.
- `React.ElementType`: Corresponds to `HeroUIVueBaseProps["as"]`.
- Primitive types, functions, and others: These are collectively categorized under `Props.Option`.

Mapped to a Vue hook:

```ts
export interface Option extends HeroUIVueBaseProps {
  name?: string;
  src?: string;
  alt?: string;
  isFocusable?: boolean;
  ignoreFallback?: boolean;
  showFallback?: boolean;
  getInitials?: (name: string) => string;
  onError?: UseAsyncStateOptions<false>["onError"];
  /**
   * Same as `ImgComponent`
   */
  imgAs?: HeroUIVueBaseProps["as"];
  imgProps?: /* @vue-ignore */ ImgHTMLAttributes;
  classNames?: SlotsToClasses<AvatarSlots>;
}
```

`onError` is a special case; in fact, it can be declared exactly as defined by HeroUI—you can simply use it as-is when writing your code.

#### `Props.Variant`

`Props.Variant` is mapped from HeroUI’s `VariantProps`. Due to limitations in Vue editor/IDE support, you should manually expand all types rather than relying on type computation. Here is an example for `Avatar`:

```ts
import type { AvatarVariantProps } from "@heroui/theme";

namespace Props {
  export interface Variant {
    size?: AvatarVariantProps["size"];
    color?: AvatarVariantProps["color"];
    radius?: AvatarVariantProps["radius"];
    isBordered?: boolean;
    isDisabled?: boolean;
    isInGroup?: boolean;
    isInGridGroup?: boolean;
    disableAnimation?: boolean;
  }
}
```

### `.vue` Files
