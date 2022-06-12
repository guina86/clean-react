module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!**/*.d.ts',
    '!**/index.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': '@swc/jest'
  },
  moduleNameMapper: {
    '@tests/(.*)': '<rootDir>/tests/$1',
    '@data/(.*)': '<rootDir>/src/data/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@presentation(.*)': '<rootDir>/src/presentation/$1',
    '\\.scss$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}
