import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const apiBaseUrl = env.VITE_API_BASE_URL?.trim();

  if (!apiBaseUrl) {
    throw new Error(
      "VITE_API_BASE_URL is required. Configure it in Vercel before building the frontend.",
    );
  }

  return {
    plugins: [react()],
    server: {
      port: 5173,
      watch: {
        usePolling: true,
      },
    },
  };
});
