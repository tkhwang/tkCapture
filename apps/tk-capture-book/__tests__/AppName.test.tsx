import { render, screen } from "@testing-library/react-native";
import React from "react";
import { View } from "react-native";

import { AppName } from "../components/app-name";

describe("AppName Component", () => {
  const setup = () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <View style={{ height: 200, width: "100%" }}>{children}</View>
    );

    return render(<AppName />, { wrapper });
  };

  it("renders all text elements correctly", () => {
    setup();

    // Check if all text elements are rendered
    expect(screen.getByText("tk")).toBeTruthy();
    expect(screen.getByText("Capture")).toBeTruthy();
    expect(screen.getByText("Book")).toBeTruthy();
  });

  it("renders with correct structure", () => {
    const { getByText } = setup();

    // Check if text elements exist
    const tkText = getByText("tk");
    const captureText = getByText("Capture");
    const bookText = getByText("Book");

    expect(tkText).toBeTruthy();
    expect(captureText).toBeTruthy();
    expect(bookText).toBeTruthy();
  });
});
