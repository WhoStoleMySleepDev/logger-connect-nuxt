import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    module: 'src/module.ts',
    'runtime/composables/useLogger': 'src/runtime/composables/useLogger.ts',
    'runtime/server/composables/useLogger': 'src/runtime/server/composables/useLogger.ts',
    'runtime/server/routes/log.post': 'src/runtime/server/routes/log.post.ts',
  },
  external: ['#app', '#imports', '#components', '#build', '#internal/nitro', 'nuxt/app', 'h3'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: false,
  splitting: false,
  minify: true,
  target: 'es2020',
  outDir: 'dist',
});
