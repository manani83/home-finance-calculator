import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/font/local", () => ({
  default: () => ({
    className: "mock-font",
    style: { fontFamily: "Pretendard" },
    variable: "mock-font-variable",
  }),
}));
