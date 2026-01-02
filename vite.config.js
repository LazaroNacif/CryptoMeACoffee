import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      include: ['src/**/*.js']
    })
  ],
  define: {
    'process.env': '{}',
    'process.env.NODE_ENV': '"production"',
    'global': 'globalThis',
    'process': '{"env":{}}'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/widget.js'),
      name: 'CryptoMeACoffee',
      fileName: (format) => `widget.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Bundle everything (x402 and viem)
      external: [],
      output: {
        globals: {}
      }
    },
    outDir: 'dist',
    sourcemap: true
  }
});
