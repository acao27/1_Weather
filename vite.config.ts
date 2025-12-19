import typescript from '@rollup/plugin-typescript'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    typescript(),
    react(),
  ],
})
