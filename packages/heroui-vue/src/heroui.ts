export { heroui } from "@heroui/theme";
import { heroui } from "@heroui/theme";

// For browser
typeof window !== "undefined" && (window.heroui = heroui);

export default heroui() as any;
