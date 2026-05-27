import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Prak12_PDW_20240140181/', // <-- Tambahkan baris ini (sesuaikan dengan nama repo di GitHub)
})