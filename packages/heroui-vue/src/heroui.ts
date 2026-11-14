import { heroui } from "@heroui/theme";

// For browser
if (typeof window !== "undefined") {
  // @ts-expect-error no exist `heroui` proporty in window
  window.heroui = heroui;
}

export default heroui() as any;
export { heroui } from "@heroui/theme";
