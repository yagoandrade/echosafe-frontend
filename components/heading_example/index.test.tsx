import { render, screen } from "@testing-library/react";
import HeadingExample from ".";
import "@testing-library/jest-dom";

describe("HeadingExample", () => {
  it("Renders a heading with 'echosafe'", async () => {
    // ...(setup mocks)
    render(await HeadingExample());

    const heading = screen.getByRole("heading", {
      name: /LETS GOOOOO!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
