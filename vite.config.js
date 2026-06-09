import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// base must match the GitHub Pages project subpath: https://<user>.github.io/green-leaves/
export default defineConfig({
  base: '/green-leaves/',
  plugins: [react(), tailwindcss()],
})
