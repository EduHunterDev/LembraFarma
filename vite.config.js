import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve('Index.html'),
        contato: resolve('pages/Contato.html'),
        auth: resolve('pages/lembrafarma_auth.html'),
        clientes: resolve('pages/clientes.html'),
      },
    },
  },
})