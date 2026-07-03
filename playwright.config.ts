import { defineConfig, devices } from "@playwright/test";

const appServers = [
  {
    name: "stoic-wisdom-series",
    port: 4301,
    command: "npm run dev --workspace @book-landings/stoic-wisdom-series -- --port 4301"
  },
  {
    name: "toki-free-kit",
    port: 4302,
    command: "npm run dev --workspace @book-landings/toki-free-kit -- --port 4302"
  },
  {
    name: "dao-toki",
    port: 4303,
    command: "npm run dev --workspace @book-landings/dao-toki -- --port 4303"
  },
  {
    name: "ukrainian-modernism",
    port: 4304,
    command: "npm run dev --workspace @book-landings/ukrainian-modernism -- --port 4304"
  },
  {
    name: "agro-library",
    port: 4305,
    command: "npm run dev --workspace @book-landings/agro-library -- --port 4305"
  }
];

export default defineConfig({
  testDir: "./tests/parity",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    trace: "retain-on-failure"
  },
  webServer: appServers.map((server) => ({
    command: server.command,
    url: `http://127.0.0.1:${server.port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_TELEMETRY_DISABLED: "1"
    }
  })),
  projects: appServers.map((server) => ({
    name: server.name,
    testMatch: new RegExp(`${server.name}\\.spec\\.ts$`),
    use: {
      baseURL: `http://127.0.0.1:${server.port}`
    }
  }))
});
