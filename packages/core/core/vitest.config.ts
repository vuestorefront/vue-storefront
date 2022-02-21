// eslint-disable-next-line
/// <reference types="vitest" />
import { defineConfig } from 'vitest/node';

export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: [
      './__tests__/setup.ts'
    ]
  }
});
