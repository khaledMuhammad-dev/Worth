import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  testMatch: [
    '**/__tests__/unit/**/*.test.{ts,tsx}',
    '**/__tests__/integration/**/*.test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70 },
  },
}

export default config
