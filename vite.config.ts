import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.igdb.com/v4",
        changeOrigin: true,
        secure: false, // Set to true if you're using https with valid certificates
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
