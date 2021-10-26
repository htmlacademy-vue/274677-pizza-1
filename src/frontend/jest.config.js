module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/jest.register-context.js"],
};
