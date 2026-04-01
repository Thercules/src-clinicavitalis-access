import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**', '.stryker-tmp/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      globals: true,
      pool: 'forks',
      poolOptions: {
        forks: {
          singleThread: true
        }
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          'node_modules/',
          'src/**/*.test.js',
          'src/**/__tests__/**',
          'cypress/',
          'dist/'
        ],
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      },
      snapshotFormat: {
        printBasicPrototype: false
      }
    },
  }),
)
