// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["universe/native", "prettier", "plugin:@tanstack/query/recommended"],
  plugins: ["@typescript-eslint", "prettier"],

  rules: {
    "prettier/prettier": "error",
  },
};
