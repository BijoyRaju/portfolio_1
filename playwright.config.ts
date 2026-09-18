import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: { baseURL: "http://127.0.0.1:5174", reducedMotion: "reduce" },
  webServer: {
    command: "npm run dev -- --port 5174 --strictPort",
    url: "http://127.0.0.1:5174",
    reuseExistingServer: false,
    env: {
      VITE_CONTACT_ENDPOINT: "/api/contact",
      VITE_CONTACT_EMAIL: "test@example.com",
    },
  },
});
