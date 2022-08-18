import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/onoue9.github.io/portfolio/',
  plugins: [react()]
})
