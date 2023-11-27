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

  it('should render proper info about conversion when USD -> PLN', () => {

    const testCases = [
      { from: 'USD', to: 'PLN', amount: 100 },
      { from: 'USD', to: 'PLN', amount: 30 },
      { from: 'USD', to: 'PLN', amount: 220 },
      { from: 'USD', to: 'PLN', amount: 1537 },
    ];

    for (const testObj of testCases) {

      const amount = (testObj.amount).toFixed(2);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('output');

      const result = (amount*3.5).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      expect(output).toHaveTextContent(`$${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} = PLN ${result}`);

      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN', () => {

    const testCases = [
      { from: 'PLN', to: 'PLN', amount: 100 },
      { from: 'PLN', to: 'PLN', amount: 30 },
      { from: 'PLN', to: 'PLN', amount: 220 },
      { from: 'PLN', to: 'PLN', amount: 1537 },
    ];

    for (const testObj of testCases) {

      const amount = (testObj.amount).toFixed(2);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('output');

      const formatedAmount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      expect(output).toHaveTextContent(`PLN ${formatedAmount} = PLN ${formatedAmount}`);

      cleanup();
    }
  });

  it('should render error when amount < 0', () => {

    const testCases = [
      { from: 'PLN', to: 'USD', amount: '-100' },
      { from: 'PLN', to: 'USD', amount: '-30' },
      { from: 'PLN', to: 'USD', amount: '-220' },
      { from: 'PLN', to: 'USD', amount: '-1537' },
    ];

    for (const testObj of testCases) {

      const amount = (testObj.amount);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('wrong');

      expect(output).toHaveTextContent(`Wrong amount`);

      cleanup();
    }
  });


});
