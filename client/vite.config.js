import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React and API proxying
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Assuming your backend is running on port 5000
    },
  },
});
