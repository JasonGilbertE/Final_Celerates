import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Atau gunakan '0.0.0.0' jika ingin diakses di jaringan lain
    port: 5173,        // Pastikan ini sama dengan yang Anda gunakan
    strictPort: true,  // Jika port sudah digunakan, Vite tidak akan mencari port lain
    open: true         // Secara otomatis membuka browser setelah server dijalankan
  },
})
