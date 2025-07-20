import { defineConfig } from "vite";
import { generateViteConfig } from "./vite.config.base";

export default defineConfig(
  generateViteConfig("options", "src/options/index.tsx")
);
