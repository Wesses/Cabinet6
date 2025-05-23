import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    plugins: [react()],
    base: env.VITE_BASE_URL ?? "/",  
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist"),
    },
  }
});
