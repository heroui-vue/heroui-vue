# HeroUI Vue Core
这是一个以HeroUI为设计目标的无头Vue3组件。

## 功能
此包聚合了所有HeroUI Vue组件，以便于通过单个命名空间导出使用所有组件。它不包含`@heroui/theme`，因此具有高度的灵活性和可定制性。

### 集成`@heroui/theme`
通过此包和`@heroui/theme`的集成来获得基于Vue3的HeroUI效果。

### 自定义主题
假设你想要自定义HeroUI主题，你可以轻松将你的主题和此包集成，而不用担心耦合问题。

## 兼容vitepress
对于像vitepress这样支持原生支持Vue的静态站点生成器，使用直接从`@heroui/vue-core`导出的组件可能并不合适。在vitepress中，使用这样的组件会导致编译时错误，因为vue的解析要直到运行时才会进行，而为了保持core包的特性，vue被标记为了外部依赖。

但是，`@heroui/vue-core`提供了无构建版本的组件，用于在vitepress中使用。在`@heroui/vue-core/raw`命名空间下，你可以找到所有组件的无构建版本。

```vue
import { Button, Chip } from '@heroui-vue/core/raw'
```
