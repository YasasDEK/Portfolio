import { render, screen } from "@testing-library/react";
import Footer from ".";
import { BrowserRouter } from "react-router-dom";

test("sample test", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  const ideasTest = screen.getByText("Yasas.EK");
  expect(ideasTest).toBeInTheDocument();
});
