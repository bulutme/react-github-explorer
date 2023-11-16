import { render, screen } from "@testing-library/react";
import MainLayout from "./MainLayout";

test("renders main layout with children", () => {
  render(<MainLayout>Test Children</MainLayout>);

  const layoutElement = screen.getByTestId("main-layout");
  expect(layoutElement).toHaveClass("main-layout");

  expect(screen.getByText("Test Children")).toBeInTheDocument();
});
