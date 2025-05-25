import { render } from "@testing-library/react-native";

import { AppName } from "../components/app-name";

describe("<AppName />", () => {
  test("renders correctly", () => {
    const { getByText } = render(<AppName />);

    // Check if all text elements are rendered
    expect(getByText("tk")).toBeTruthy();
    expect(getByText("Capture")).toBeTruthy();
    expect(getByText("Book")).toBeTruthy();
  });

  test("renders with correct text content", () => {
    const { getByText } = render(<AppName />);

    const tkText = getByText("tk");
    const captureText = getByText("Capture");
    const bookText = getByText("Book");

    expect(tkText).toBeTruthy();
    expect(captureText).toBeTruthy();
    expect(bookText).toBeTruthy();
  });
});
