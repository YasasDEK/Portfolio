import { render } from "@testing-library/react";
import HomePageHeader from "./HomePageHeader";

test("Home page content test", () => {
  const { getByText } = render(<HomePageHeader />);
  const textElement = getByText("Senior Software Engineer");
  expect(textElement).toBeInTheDocument();
});
