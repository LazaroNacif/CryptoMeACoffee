export default {
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!**/node_modules/**'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(viem|@noble|@scure)/)'
  ]
};
