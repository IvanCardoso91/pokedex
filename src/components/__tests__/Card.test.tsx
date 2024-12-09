import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../Card";

describe("Card Component", () => {
  const mockOnCardClick = vi.fn();
  const mockTypeColors = {
    Fire: "bg-red-500 text-white",
    default: "bg-gray-100 text-gray-600",
  };

  const cardProps = {
    id: "1",
    name: "Charizard",
    image: "https://example.com/charizard.png",
    types: ["Fire"],
    typeColors: mockTypeColors,
    onCardClick: mockOnCardClick,
  };

  it("renders the card with correct props", () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText(/Charizard/i)).toBeInTheDocument();
    expect(screen.getByText(/ID: 1/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Charizard/i)).toHaveAttribute("src", cardProps.image);
    expect(screen.getByText(/Fire/i)).toHaveClass(mockTypeColors.Fire);
  });

  it("calls onCardClick with correct arguments when clicked", () => {
    render(<Card {...cardProps} />);

    fireEvent.click(screen.getByText(/Charizard/i)); // Simula o clique no card
    expect(mockOnCardClick).toHaveBeenCalledWith(cardProps.id, cardProps.name);
  });
});
