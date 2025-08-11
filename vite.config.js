import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Netlify deploys at the site root by default; no base override needed
  plugins: [react()],
})
