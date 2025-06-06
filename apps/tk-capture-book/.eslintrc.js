// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["universe/native", "prettier", "plugin:@tanstack/query/recommended"],
  plugins: ["@typescript-eslint", "prettier", "import"],

  rules: {
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Node.js built-in modules
          "external", // npm packages
          "internal", // Internal modules (configured via pathGroups)
          "parent", // Parent relative imports (../)
          "sibling", // Sibling relative imports (./)
          "index", // Index imports (./)
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "react-native",
            group: "external",
            position: "before",
          },
          {
            pattern: "expo-*",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
