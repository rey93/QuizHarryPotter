import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.denpmv/config/
export default defineConfig({
  plugins: [react()]
})