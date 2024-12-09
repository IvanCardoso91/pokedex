import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../test/i18nForTests";
import DetailModal from "../DetailModal";

describe("DetailModal Component", () => {
  const mockOnClose = vi.fn();

  const attackProps = {
    name: "Fire Spin",
    cost: ["Fire", "Fire"],
    damage: "110",
    description: "A powerful fire attack.",
  };

  it("renders correctly when open", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <DetailModal isOpen={true} onClose={mockOnClose} attack={attackProps} />
      </I18nextProvider>
    );

    // Corrigir os textos esperados
    expect(screen.getByText(/Fire Spin/i)).toBeInTheDocument();
    expect(screen.getByText(/Custo de mana/i)).toBeInTheDocument(); // Texto traduzido
    expect(screen.getByText(/Fire, Fire/i)).toBeInTheDocument();
    expect(screen.getByText(/Dano/i)).toBeInTheDocument(); // Texto traduzido
    expect(screen.getByText(/110/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição/i)).toBeInTheDocument(); // Texto traduzido
    expect(screen.getByText(/A powerful fire attack./i)).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <DetailModal isOpen={false} onClose={mockOnClose} attack={attackProps} />
      </I18nextProvider>
    );

    expect(screen.queryByText(/Fire Spin/i)).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <DetailModal isOpen={true} onClose={mockOnClose} attack={attackProps} />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(/Fechar/i));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
