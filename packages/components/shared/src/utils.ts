import type { ComponentInternalInstance } from "vue";

export function pureObject(obj: Record<string, any>): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, Object.create(null));
}

/**
 * This function is copied from heroui souce code
 */
export const mapPropsVariants = <T extends Record<string, any>, K extends keyof T>(
  props: T,
  variantKeys?: K[],
  removeVariantProps = true,
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
  if (!variantKeys) {
    return [props, {}];
  }

  const picked = variantKeys.reduce((acc, key) => {
    // Only include the key in `picked` if it exists in `props`
    if (key in props) {
      return { ...acc, [key]: props[key] };
    } else {
      return acc;
    }
  }, {});

  if (removeVariantProps) {
    const omitted = Object.keys(props)
      .filter((key) => !variantKeys.includes(key as K))
      .reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {});

    return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
  } else {
    return [props, picked] as [T, Pick<T, K>];
  }
};

export const hasBoundProp = (instance: ComponentInternalInstance, key: string): boolean => {
  if (!instance?.vnode.props) {
    return false;
  }
  const kebabKey = key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
  return key in instance.vnode.props || kebabKey in instance.vnode.props;
};
