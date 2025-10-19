import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para despliegue en Vercel
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',      // 📁 Carpeta de salida del build
    sourcemap: false,    // Opcional: menos peso en el deployment
  },
  server: {
    port: 3000,          // Para entorno local
  }
})