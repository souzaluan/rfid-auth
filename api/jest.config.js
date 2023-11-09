module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text-summary', 'lcov'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/node_modules/',
      '!<rootDir>/src/crosscutting/',
    ],
    roots: ['<rootDir>/tests', '<rootDir>/src/modules'],
    testEnvironment: 'node',
    preset: 'ts-jest',
    transform: {
      '.+\\.ts$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };
  