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

    test("should handle undefined and null values", () => {
      const result = cn("base", undefined, null, "valid");
      expect(result).toBe("base valid");
    });
  });
});
