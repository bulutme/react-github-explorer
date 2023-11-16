import { render, screen } from "@testing-library/react";
import RepoDetails from "./RepoDetails";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test("renders repository details with default values", () => {
  render(<RepoDetails id="repositoryId+123" />);

  expect(screen.getByText("Description:")).toBeInTheDocument();
  expect(screen.getByText("Owner:")).toBeInTheDocument();
  expect(screen.getByText("Stars:")).toBeInTheDocument();
  expect(screen.getByText("Forks:")).toBeInTheDocument();
  expect(screen.getByText("Watchers:")).toBeInTheDocument();
  expect(screen.getByText("Language:")).toBeInTheDocument();
});

test("renders repository details with provided values", () => {
  const testData = {
    id: "repositoryId+123",
    description: "Test description",
    owner: "TestOwner",
    stars: 10,
    forks: 5,
    watchers: 8,
    language: "JavaScript",
  };

  render(<RepoDetails {...testData} />);
  expect(screen.getByText("Description:")).toBeInTheDocument();
  expect(screen.getByText("Owner:")).toBeInTheDocument();
  expect(screen.getByText("Stars:")).toBeInTheDocument();
  expect(screen.getByText("Forks:")).toBeInTheDocument();
  expect(screen.getByText("Watchers:")).toBeInTheDocument();
  expect(screen.getByText("Language:")).toBeInTheDocument();
});
