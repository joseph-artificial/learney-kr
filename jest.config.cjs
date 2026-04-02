module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          module: "commonjs",
          esModuleInterop: true,
        },
      },
    ],
  },
};

