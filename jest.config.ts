import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/app/react/setupTests.ts"],
  testMatch: ["<rootDir>/app/react/**/*.test.{ts,tsx,js,jsx}"],
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/app/react/**/*.{ts,tsx}",
    "!<rootDir>/app/react/**/*.test.{ts,tsx}",
  ],
  coverageReporters: ["lcov", "text-summary"],
};

export default config;
