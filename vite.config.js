import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Relative base so the build works on GitHub Pages under /<repo>/ and on any custom domain.
// `dedupe` makes the shared Remotion scenes in video/src use the site's single copy of React/Remotion.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: { dedupe: ['react', 'react-dom', 'remotion', 'simple-icons'] },
})
