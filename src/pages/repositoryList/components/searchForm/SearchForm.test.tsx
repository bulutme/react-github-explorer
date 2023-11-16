import { render, fireEvent, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("SearchForm component", () => {
  it("should render the component", () => {
    render(<SearchForm />);

    expect(
      screen.getByPlaceholderText("Enter GitHub username or repository")
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("should update the input value on user input", () => {
    render(<SearchForm />);

    const inputElement = screen.getByPlaceholderText(
      "Enter GitHub username or repository"
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "testuser" } });

    expect(inputElement.value).toBe("testuser");
  });

  it("should call setQuery function when the search button is clicked", () => {
    render(<SearchForm />);

    const inputElement = screen.getByPlaceholderText(
      "Enter GitHub username or repository"
    );

    fireEvent.change(inputElement, { target: { value: "testuser" } });
  });
});
