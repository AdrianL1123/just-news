import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --no-lint --fix",
  },
  fmt: {
    ignorePatterns: ["**/*.yaml", "**/*.yml", "**/routeTree.gen.ts", "pnpm-lock.yaml"],
    printWidth: 80,
    sortImports: {
      newlinesBetween: false,
    },
    experimentalTailwindcss: {
      functions: ["clsx", "cn", "cva", "tw"],
    },
    overrides: [
      {
        files: ["*.json", "*.jsonc"],
        options: { trailingComma: "none" },
      },
    ],
  },
  lint: {
    ignorePatterns: ["**/routeTree.gen.ts"],
    options: {
      typeAware: true,
      typeCheck: true,
      reportUnusedDisableDirectives: "error",
    },
    plugins: ["eslint", "unicorn", "typescript", "oxc", "react"],
    jsPlugins: [{ name: "react-compiler", specifier: "eslint-plugin-react-hooks" }],
    categories: {
      correctness: "error",
      suspicious: "error",
    },
    rules: {
      "no-var": "error",
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "no-shadow": "off",
      "no-underscore-dangle": "off",

      "typescript/no-require-imports": "error",
      "typescript/no-explicit-any": "error",
      "typescript/ban-ts-comment": "error",
      "typescript/consistent-type-imports": "error",
      "typescript/no-unnecessary-type-constraint": "error",
      "typescript/no-non-null-assertion": "error",
      "typescript/no-unsafe-type-assertion": "off",
      "typescript/unbound-method": "off",
      "typescript/no-unnecessary-type-arguments": "off",
      "typescript/no-unnecessary-type-parameters": "off",
      "typescript/consistent-return": "off",

      "react/rules-of-hooks": "error",
      "react/react-in-jsx-scope": "off",

      "react-compiler/component-hook-factories": "error",
      "react-compiler/config": "error",
      "react-compiler/error-boundaries": "error",
      "react-compiler/gating": "error",
      "react-compiler/globals": "error",
      "react-compiler/immutability": "error",
      "react-compiler/incompatible-library": "error",
      "react-compiler/preserve-manual-memoization": "error",
      "react-compiler/purity": "error",
      "react-compiler/refs": "error",
      "react-compiler/set-state-in-effect": "error",
      "react-compiler/set-state-in-render": "error",
      "react-compiler/static-components": "error",
      "react-compiler/unsupported-syntax": "error",
      "react-compiler/use-memo": "error",

      "unicorn/no-array-sort": "off",
    },
  },
});
