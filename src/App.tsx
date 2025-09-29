import LoanCalculator from "./components/LoanCalculator";
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <>
      <LoanCalculator />
      <Analytics />
    </>
  );
}

export default App;
