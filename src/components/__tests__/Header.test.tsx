import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../../test/i18nForTests";
import Header from "../Header";

describe("Header Component", () => {
  it("renders the title", () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Header />
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it("calls onSearch when searching", () => {
    const mockOnSearch = vi.fn();

    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Header onSearch={mockOnSearch} />
        </I18nextProvider>
      </MemoryRouter>
    );

    // Certifique-se de usar o placeholder correto
    const input = screen.getByPlaceholderText(/Pesquisar por nome.../i);
    fireEvent.change(input, { target: { value: "Pikachu" } });
    fireEvent.submit(screen.getByText("🔍").closest("form")!);

    expect(mockOnSearch).toHaveBeenCalledWith("Pikachu");
  });
});
