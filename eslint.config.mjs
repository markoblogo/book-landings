import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "**/.next/**",
      "**/dist/**",
      "**/node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "next-env.d.ts"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: [
      "apps/stoic-wisdom-series/src/**/*.{ts,tsx}",
      "apps/toki-free-kit/src/**/*.{ts,tsx}",
      "apps/dao-toki/src/**/*.{ts,tsx}",
      "apps/ukrainian-modernism/src/**/*.{ts,tsx}"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];
