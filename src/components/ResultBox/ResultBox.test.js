import ResultBox from "./ResultBox";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={10} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {

    const testCases = [
      { from: 'PLN', to: 'USD', amount: 100 },
      { from: 'PLN', to: 'USD', amount: 30 },
      { from: 'PLN', to: 'USD', amount: 220 },
      { from: 'PLN', to: 'USD', amount: 537 },
    ];

    for (const testObj of testCases) {

      const amount = (testObj.amount).toFixed(2);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('output');

      const result = (amount/ 3.5).toFixed(2);

      expect(output).toHaveTextContent(`PLN ${amount} = $${result}`);

      cleanup();
    }
  });
});
