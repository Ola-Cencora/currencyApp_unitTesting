import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyForm from "./CurrencyForm";

describe("Component CurrencyForm", () => {
  it("should render without crashing", () => {
    render(<CurrencyForm action={() => {}} />);
  });

  const testCases = [
    { amount: "100", from: "PLN", to: "USD" },
    { amount: "20", from: "USD", to: "PLN" },
    { amount: "200", from: "PLN", to: "USD" },
    { amount: "345", from: "USD", to: "PLN" },
  ];

  for (const testObj of testCases) {
    it("should run action callback with proper data on form submit", () => {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // find “convert” button
      const submitButton = screen.getByText("Convert");

      //find input and select
      const amountField = screen.getByTestId("amount");
      const fromField = screen.getByTestId("select-from");
      const toField = screen.getByTestId("select-to");

      //set test values to fields
      userEvent.type(amountField, "100");
      userEvent.selectOptions(fromField, "PLN");
      userEvent.selectOptions(toField, "USD");

      // simulate user click on "convert" button
      userEvent.click(submitButton);

      // check if action callback was called once and with proper argument
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: 100,
        from: "PLN",
        to: "USD",
      });
    });
    // unmount component
    cleanup();
  }
});