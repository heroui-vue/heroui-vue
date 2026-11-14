# HeroUI Vue Components

在此目录下的直接子目录，通常代表一个组件的文件集合（除了shared和copy目录）。这样的目录被称为“组件目录”。

每个组件目录都是一个`typescript` 和 `vue 3.5+`项目，通过`tsdown`进行打包。在此目录下的组件目录都加入到了根目录下的`pnpm-workspace.yml`中，因此他们之间可以通过`pnpm add --workspace`安装。关于更多组件目录属性和结构，`avatar`目录是个不错的例子。

我假设你已经精通`typescript`和`vue 3.5+`，否则，不要尝试进行网络搜索，比如`tsdown`。在出现错误时，超过三次尝试修复后仍无法解决，请通过[Github Issue](https://github.com/heroui-vue/heroui-vue/issues)提出。

## 起步

在开始一个新的组件目录之前，请从创建完整的目录结构开始，包含以下必要文件:

- package.json
- index.ts
- tsconfig.json
- tsdown.config.ts

`src`目录也是必要的，它是组件的入口。

### package.json

和其他组件目录中的内容大同小异，在涉及到组件名称的部分需要格外注意，比如`name`、`keywords`等字段。

#### `script`字段

下面是`avatar`组件的package.json中的script字段：

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

你需要注意`bump`脚本中`--tag`的部分,其他内容你可以完全复用。你还应该避免调用`bump`脚本。

为了在全局任意位置构建组件，你应该在根`package.json`的scripts中注册此组件的构建命令，以`avatar`举例：

```json
"build:avatar": "pnpm --filter \"./packages/components/avatar\" build",
```

#### `devDependencies`字段

每一个组件都应该包含下面的依赖：

```json
"devDependencies": {
    "@heroui-vue/icon": "workspace:*",
    "@heroui-vue/shared": "workspace:*",
    "@heroui/theme": "catalog:prod",
    "unplugin-vue": "catalog:prod",
    "vue": "catalog:prod"
  }
```

除此以外，`@vueuse/core@catalog:prod`视情况安装，比如需要使用和HeoUI类似的use hooks,此时你应该假设vueuse也提供了功能接近的hook,通过添加一个注释TODO来提醒我，而不是主动去搜索vueuse是不是真的提供了这个hook。

### index.ts

从src目录导出组件和hooks

### tsconfig.json

请完全复用下面的配置:

```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {},
  "include": ["src/**/*", "src/**/*.vue"],
  "exclude": ["dist", "node_modules"]
}
```

### tsdown.config.ts

请完全复用下面的配置:

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

## 编写组件

从当前目录向上寻找名为`heroui`的目录，这是一个包含`package.json`的nodejs项目。不要尝试从网络搜索`heroui`的资料。本项目于`heroui`在组件的文件路径上保持一致，约定路径为`packages/components`。关于组件的命名，请参考`avatar`。

### use hook

分为`Props`和`Return`两个namespace, Props namespace至少包含`Option`和`Variant`两个interface, Return name至少应该包含`Option`和`Slot`两个interface，从`heroui`组件的use hook props的入参和返回推断类型。

#### `Props`

以`use-avatar.ts`中`useAvatar`参数`originalProps`举例:

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
   * Image source.
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

忽略ref, 我们需要将几种React的类型映射到Vue中：

- `React.ReactNode`: 对应vue slot，不需要在props中声明，它应该在Return namespace中**视情况**声明。
- `React.ElementType`: 对应`HeroUIVueBaseProps["as"]`
- 原始类型、函数以及其他: 统一被分类到`Props.Option`

映射到vue hook后：

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
   * same `ImgComponent`
   */
  imgAs?: HeroUIVueBaseProps["as"];
  imgProps?: /* @vue-ignore */ ImgHTMLAttributes;
  classNames?: SlotsToClasses<AvatarSlots>;
}
```

`onError`比较特殊，事实上它也可以声明为heroui定义的那样，在你实际编写时，按原样即可。

#### `Props.Variant`

而`Props.Variant`则由heroui的`VariantProps`映射而来，由于vue编辑器的限制，你应该手动展开所有类型而不是使用类型计算，这是一个`avatar`示例：

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

### `.vue`文件
