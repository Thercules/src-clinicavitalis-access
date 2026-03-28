export default {
  _comment: 'This config was generated using "stryker init".',
  coverageAnalysis: 'perTest',
  mutate: ['src/**/*.{js,vue}', '!src/**/*.test.{js,vue}', '!src/**/__tests__/**'],
  checkers: ['typescript'],
  testRunner: 'vitest',
  reporters: ['html', 'json', 'clear-text'],
  thresholds: {
    high: 80,
    low: 60,
    break: 80,
  },
  tsconfigFile: './jsconfig.json',
};
