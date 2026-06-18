import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MoneyInput, RateInput } from "./money-input";

function MoneyInputHarness() {
  const [value, setValue] = useState("");
  return (
    <>
      <MoneyInput id="amount" label="금액" value={value} onChange={setValue} />
      <output aria-label="금액 원본값">{value}</output>
    </>
  );
}

function RateInputHarness() {
  const [value, setValue] = useState("");
  return (
    <>
      <RateInput id="rate" label="금리" value={value} onChange={setValue} />
      <output aria-label="금리 원본값">{value}</output>
    </>
  );
}

describe("calculator numeric inputs", () => {
  it("formats money with thousands separators while storing digits only", async () => {
    const user = userEvent.setup();
    render(<MoneyInputHarness />);

    const input = screen.getByLabelText("금액");
    await user.type(input, "1000000");

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input).toHaveValue("1,000,000");
    expect(screen.getByLabelText("금액 원본값")).toHaveTextContent("1000000");
  });

  it("shows the entered money in Korean units while typing", async () => {
    const user = userEvent.setup();
    render(<MoneyInputHarness />);

    const input = screen.getByLabelText("금액");
    await user.type(input, "150000000");

    expect(input).toHaveValue("150,000,000");
    expect(screen.getByText("1억 5,000만 원")).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "300000000");

    expect(input).toHaveValue("300,000,000");
    expect(screen.getByText("3억 원")).toBeInTheDocument();
  });

  it("provides quick amount preset buttons that add to or reset the current money value", async () => {
    const user = userEvent.setup();
    render(<MoneyInputHarness />);

    await user.click(screen.getByRole("button", { name: "+1천만" }));
    await user.click(screen.getByRole("button", { name: "+5천만" }));
    await user.click(screen.getByRole("button", { name: "+1억" }));

    expect(screen.getByLabelText("금액")).toHaveValue("160,000,000");
    expect(screen.getByLabelText("금액 원본값")).toHaveTextContent("160000000");
    expect(screen.getByText("1억 6,000만 원")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "초기화" }));

    expect(screen.getByLabelText("금액")).toHaveValue("");
    expect(screen.getByLabelText("금액 원본값")).toHaveTextContent("");
  });

  it("formats the integer part of a decimal rate while preserving its raw value", async () => {
    const user = userEvent.setup();
    render(<RateInputHarness />);

    const input = screen.getByLabelText("금리");
    await user.type(input, "1234.56");

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input).toHaveValue("1,234.56");
    expect(screen.getByLabelText("금리 원본값")).toHaveTextContent("1234.56");
  });
});
