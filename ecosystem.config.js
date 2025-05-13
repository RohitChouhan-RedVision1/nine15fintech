module.exports = {
  apps: [
    {
      name: "investfinvest", // Name of the application
      script: "npm", // Using npm to run the app
      args: "start", // Start command for the app
      cwd: "/rvdata/investfinvest", // The project directory (path to your Next.js app)
      env: {
        NODE_ENV: "production", // Default environment variables
        PORT: 3004,
      },
      env_file: "/rvdata/env-files/investfinvest.env", // Path to the custom .env file
    },
  ],
};
