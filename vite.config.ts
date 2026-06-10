import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const baseUrl = env.VITE_ALIAS ? `/${env.VITE_ALIAS}` : "/";

  return {
    plugins: [react()],
    base: baseUrl,
    define: {
      "import.meta.env.VITE_BASE_URL": JSON.stringify(baseUrl),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, env.VITE_ALIAS ?? "dist"),
      chunkSizeWarningLimit: 1000,
    },
  };
});
