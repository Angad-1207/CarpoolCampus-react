import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite's dev server and `vite preview` already fall back to index.html for unknown paths,
// so refreshing /dashboard works. For production hosting see README.md ("Hosting").
export default defineConfig({
  plugins: [react()],
});
