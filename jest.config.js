export default {
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 40,
      lines: 30,
      statements: 30,
    },
  },
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  transformIgnorePatterns: ['node_modules/(?!(viem|@noble|@scure)/)'],
};
