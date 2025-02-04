// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["universe/native", "plugin:@tanstack/query/recommended"],
  plugins: ["react-hooks", "@typescript-eslint", "prettier"],

  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: false,
        trailingComma: "all",
        bracketSpacing: true,
        arrowParens: "always",
      },
    ],
  },
};
