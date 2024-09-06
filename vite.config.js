import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  port: process.env.PORT || 5173,  // Use the PORT provided by Render or default to 3000
  host: true, 
})
