import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading Component", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);

    const image = screen.getByAltText(/Loading/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("animate-spin");
  });
});
