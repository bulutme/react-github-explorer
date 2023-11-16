import { render, screen } from "@testing-library/react";
import RepositoryList from ".";

jest.mock("antd", () => {
  return {
    ...jest.requireActual("antd"),
    Modal: {
      confirm: jest.fn(),
    },
  };
});

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("renders repository list component with default values", () => {
  render(<RepositoryList />);

  expect(screen.getByText("React Github Explorer")).toBeInTheDocument();

  expect(screen.getByText("Search")).toBeInTheDocument();

  expect(screen.getByRole("table")).toBeInTheDocument();
});
