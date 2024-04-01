import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "VITE_APP_",
  plugins: [react(), envCompatible()],
})
