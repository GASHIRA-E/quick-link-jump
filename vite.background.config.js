import { defineConfig } from "vite";
import { generateViteConfig } from "./vite.config.base";

export default defineConfig(
  generateViteConfig("background", "src/background.ts")
);
