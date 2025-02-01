module.exports = {
    testEnvironment: "node", // Use Node.js environment
    setupFilesAfterEnv: ["./jest.setup.js"], // Optional: Add global setup
    testTimeout: 10000, // Increase timeout if needed
};