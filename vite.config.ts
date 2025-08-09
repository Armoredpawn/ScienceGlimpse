// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // IMPORTANT: For custom domains, set the base to "/"
  // GitHub Pages will serve your repository's content from the root of your custom domain.
  base: "/", // ✨ Changed this line ✨

  // Server configuration for local development
  server: {
    host: "::", // Allows access from other devices on the network
    port: 8080, // Specifies the development server port
  },

  // Plugins used in your Vite project
  plugins: [
    // React plugin using SWC for faster compilation
    react(),
    // Conditional plugin: componentTagger only runs in development mode
    mode === 'development' && componentTagger(),
  ].filter(Boolean), // Filters out `false` if componentTagger is not used in production

  // Path aliases for easier imports
  resolve: {
    alias: {
      // Sets '@' to resolve to the 'src' directory,
      // allowing imports like '@/components/Navigation'
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));