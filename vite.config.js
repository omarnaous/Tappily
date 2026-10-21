import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Relative base so the build works on GitHub Pages under /<repo>/ and on any custom domain.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
