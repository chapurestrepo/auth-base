import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": "https://google-auth-base.netlify.app", // Redirige todas las llamadas de "/auth" al backend
    },
  },
});
