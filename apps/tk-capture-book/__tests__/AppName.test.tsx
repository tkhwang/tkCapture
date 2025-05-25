import { render } from "@testing-library/react-native";

import { AppName } from "../components/app-name";

describe("<AppName />", () => {
  test("renders all app name components", () => {
    const { getByText } = render(<AppName />);

    // Check if all text elements are rendered
    expect(getByText("tk")).toBeTruthy();
    expect(getByText("Capture")).toBeTruthy();
    expect(getByText("Book")).toBeTruthy();
  });
});
