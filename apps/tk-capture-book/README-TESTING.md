# Jest 테스트 환경 가이드

이 문서는 React Native Expo 프로젝트에서 Jest를 이용한 테스트 환경 구축과 사용법에 대해 설명합니다.

## 📦 설치된 패키지

### 테스트 관련 의존성

- `jest-expo`: Expo 프로젝트를 위한 Jest 프리셋
- `jest`: JavaScript 테스트 프레임워크
- `@types/jest`: Jest TypeScript 타입 정의
- `@testing-library/react-native`: React Native 컴포넌트 테스트 유틸리티

## 🛠️ 설정 파일

### 1. `jest.config.js`

Jest의 메인 설정 파일입니다.

```javascript
module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx|js|jsx)", "**/*.(test|spec).(ts|tsx|js|jsx)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    // ... 기타 제외 패턴
  ],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg|@supabase/.*|@tanstack/.*)",
  ],
};
```

### 2. `jest-setup.ts`

테스트 환경 초기화 파일입니다.

```typescript
// Jest setup file

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo modules
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {},
    },
  },
}));

jest.mock("expo-linking", () => ({
  createURL: jest.fn(),
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);
```

## 🚀 사용 가능한 스크립트

### package.json 스크립트

```json
{
  "scripts": {
    "test": "jest --watchAll",
    "test:ci": "jest",
    "test:coverage": "jest --coverage",
    "test:debug": "jest -o --watch --coverage=false",
    "test:update-snapshots": "jest -u --coverage=false"
  }
}
```

### 스크립트 설명

- `npm run test`: 파일 변경을 감지하여 자동으로 테스트 재실행
- `npm run test:ci`: CI/CD 환경에서 한 번만 테스트 실행
- `npm run test:coverage`: 코드 커버리지 리포트와 함께 테스트 실행
- `npm run test:debug`: 변경된 파일만 테스트하며 커버리지 없이 실행
- `npm run test:update-snapshots`: 스냅샷 테스트 업데이트

## 📁 테스트 파일 구조

```
__tests__/
├── AppName.test.tsx          # 컴포넌트 테스트
├── utils.test.ts             # 유틸리티 함수 테스트
└── components/
    └── Button.test.tsx       # 컴포넌트별 테스트
```

## 📝 테스트 작성 예제

### 1. 컴포넌트 테스트

```typescript
import { render } from '@testing-library/react-native';
import { AppName } from '../components/app-name';

describe('<AppName />', () => {
  test('renders correctly', () => {
    const { getByText } = render(<AppName />);

    expect(getByText('tk')).toBeTruthy();
    expect(getByText('Capture')).toBeTruthy();
    expect(getByText('Book')).toBeTruthy();
  });

  test('matches snapshot', () => {
    const tree = render(<AppName />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

### 2. 유틸리티 함수 테스트

```typescript
import { cn } from "../lib/utils";

describe("Utils", () => {
  describe("cn function", () => {
    test("should merge class names correctly", () => {
      const result = cn("class1", "class2");
      expect(result).toBe("class1 class2");
    });

    test("should handle conditional classes", () => {
      const result = cn("base", true && "conditional", false && "hidden");
      expect(result).toBe("base conditional");
    });
  });
});
```

### 3. 이벤트 테스트

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../components/ui/button';

describe('<Button />', () => {
  test('handles press events', () => {
    const mockPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockPress}>Press Me</Button>
    );

    const button = getByText('Press Me');
    fireEvent.press(button);

    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
```

## 🎯 테스트 모범 사례

### 1. 테스트 파일 명명 규칙

- 컴포넌트: `ComponentName.test.tsx`
- 유틸리티: `utils.test.ts`
- 훅: `useHookName.test.ts`

### 2. 테스트 구조

```typescript
describe("ComponentName", () => {
  describe("when prop is provided", () => {
    test("should render correctly", () => {
      // 테스트 로직
    });
  });

  describe("when event occurs", () => {
    test("should handle event properly", () => {
      // 테스트 로직
    });
  });
});
```

### 3. Mock 사용

```typescript
// 외부 모듈 Mock
jest.mock("../api/service", () => ({
  fetchData: jest.fn(),
}));

// 함수 Mock
const mockFunction = jest.fn();
mockFunction.mockReturnValue("mocked value");
```

## 📊 코드 커버리지

테스트 커버리지 리포트는 `coverage/` 디렉토리에 생성됩니다.

### 커버리지 확인

```bash
npm run test:coverage
```

### HTML 리포트 확인

```bash
open coverage/lcov-report/index.html
```

## 🔧 문제 해결

### 1. JSX 구문 오류

Babel 설정이 올바른지 확인하세요. `babel.config.js`에 `babel-preset-expo`가 포함되어 있어야 합니다.

### 2. 모듈을 찾을 수 없는 오류

`transformIgnorePatterns`에 해당 모듈이 포함되어 있는지 확인하세요.

### 3. 스냅샷 테스트 실패

스냅샷을 업데이트하려면:

```bash
npm run test:update-snapshots
```

## 📚 추가 자료

- [Jest 공식 문서](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Expo Jest 설정](https://docs.expo.dev/develop/unit-testing/)

## 🎉 테스트 환경 구축 완료!

이제 React Native Expo 프로젝트에서 Jest를 이용한 테스트를 작성하고 실행할 수 있습니다.
테스트를 통해 코드의 품질을 높이고 버그를 사전에 방지하세요!
