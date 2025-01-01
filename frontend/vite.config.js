import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enable polling to watch for changes
    },
    proxy: {
      '/api': 'http://localhost:3003', // Proxy API requests to your backend server
      
    }
  },
});
