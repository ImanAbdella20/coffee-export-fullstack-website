import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [
    
    tailwindcss(),
  ],
})
