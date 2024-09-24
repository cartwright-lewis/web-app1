// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',         // Defines where Vite starts looking for index.html
  build: {
    outDir: '../dist',    // Output directory for production builds
    emptyOutDir: true,    // Clears the output directory before building
  },
  server: {
    open: '/index.html',  // Automatically open the main page during development
  },
});