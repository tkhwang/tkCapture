// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["prettier", "@typescript-eslint", "react", "react-hooks", "import"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["/dist/*"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {},
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "prettier/prettier": "error",
    // TypeScript 관련 규칙
    "@typescript-eslint/explicit-function-return-type": "off", // 함수 반환 타입 명시 강제하지 않음
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // 사용하지 않는 변수 에러
    "@typescript-eslint/no-explicit-any": "warn", // any 타입 사용 시 경고
    "@typescript-eslint/no-empty-interface": "warn", // 빈 인터페이스 경고
    "@typescript-eslint/consistent-type-imports": "error", // type import 일관성 유지

    // React 관련 규칙
    "react/prop-types": "off", // TypeScript를 사용하므로 prop-types는 불필요
    "react/react-in-jsx-scope": "off", // React 17 이후 버전에서는 불필요
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }], // JSX 파일 확장자
    "react-hooks/rules-of-hooks": "error", // Hooks 규칙 검사
    "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 배열 검사

    // 일반적인 규칙
    "no-console": ["warn", { allow: ["warn", "error"] }], // console.log() 사용 시 경고
    eqeqeq: ["error", "always"], // === 와 !== 사용 강제
    "no-unused-vars": "off", // TypeScript 규칙으로 대체
    "prefer-const": "error", // 재할당이 없는 변수는 const 사용
    "no-var": "error", // var 사용 금지

    // Import 순서 관련 규칙
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // node "builtin" 모듈
          "external", // npm 으로 설치한 패키지
          "internal", // 경로 별칭을 사용하여 입력한 모듈
          ["parent", "sibling"], // 부모 및 형제 디렉토리
          "index", // 현재 디렉토리
          "type", // 타입 import
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "{react-dom/**,react-router-dom}",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "react-dom/**"],
        distinctGroup: false,
      },
    ],
    "import/no-duplicates": "error", // 중복 import 방지
    "import/no-unresolved": "error", // 해결할 수 없는 import 방지
    "import/first": "error", // import를 파일 최상단에 위치
    "import/newline-after-import": "error", // import 구문 다음에 빈 줄 추가
    "import/no-default-export": "off", // default export 허용
  },
};
